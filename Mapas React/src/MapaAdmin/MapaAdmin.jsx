import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapaAdmin.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";  
import axios from "axios";

const MapaAdm = () => {
  const navigate = useNavigate();

  const salir = () => {
    navigate("/inicio");
  };

  const [location, setLocation] = useState({
    lat: 17.077913,
    lng: -96.744027,
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const [placeInfo, setPlaceInfo] = useState(null);
  const [detailMenuVisible, setDetailMenuVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [editedPlace, setEditedPlace] = useState({
    nombreArea: "",
    descripcion: "",
    horarioAbierto: "",
    horaCierre: "",
    recomendaciones: "",
  });
  const [lugares, setLugares] = useState([]);

  const [newPlaceCoords, setNewPlaceCoords] = useState(null);
  const [addingPlace, setAddingPlace] = useState(false);

  useEffect(() => {
    axios.get('/mapas')
      .then(response => {
        const lugaresConCoordenadas = response.data.map(lugar => ({
          ...lugar,
          coordenadas: { lat: lugar.latitud, lng: lugar.altitud }
        }));
        setLugares(lugaresConCoordenadas);
      })
      .catch(error => {
        console.error('Error fetching lugares:', error);
      });
  }, []); 

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    if (detailMenuVisible) {
      setDetailMenuVisible(false);
    }
  };

  const handleLocationClick = (index) => {
    setLocation(lugares[index].coordenadas);
    setPlaceInfo(lugares[index]);
    setCurrentIndex(index);
    setMenuVisible(false);
    setDetailMenuVisible(true);
  };

  const closeDetailMenu = () => {
    setDetailMenuVisible(false);
    setEditMode(false);
  };

  const handleEditPlace = (index) => {
    setEditedPlace(lugares[index]);
    setEditMode(true);
    setCurrentIndex(index);
  };

  const handleSaveEdit = () => {
    axios.put(`/mapas/${lugares[currentIndex].id}`, editedPlace)
      .then(response => {
        const updatedLugares = [...lugares];
        updatedLugares[currentIndex] = response.data;
        setLugares(updatedLugares);
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error updating place:', error);
      });
  };

  const handleDeletePlace = (index) => {
    axios.delete(`/mapas/${lugares[index].id}`)
      .then(() => {
        const updatedLugares = lugares.filter((_, i) => i !== index);
        setLugares(updatedLugares);
        if (index === currentIndex) {
          setDetailMenuVisible(false);
          setPlaceInfo(null);
        }
      })
      .catch(error => {
        console.error('Error deleting place:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPlace((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPlace = (coords) => {
    setNewPlaceCoords(coords);
    setAddingPlace(true);
  };

  const handleSaveNewPlace = () => {
    const newPlace = {
      nombreArea: editedPlace.nombreArea,
      descripcion: editedPlace.descripcion,
      horarioAbierto: editedPlace.horarioAbierto,
      horaCierre: editedPlace.horaCierre,
      recomendaciones: editedPlace.recomendaciones,
      coordenadas: newPlaceCoords,
      imagen: editedPlace.imagen,
    };

    axios.post('/mapas', newPlace)
      .then(response => {
        setLugares([...lugares, response.data]);
        setAddingPlace(false);
        setEditedPlace({
          nombreArea: "",
          descripcion: "",
          horarioAbierto: "",
          horaCierre: "",
          recomendaciones: "",
        });
      })
      .catch(error => {
        console.error('Error adding place:', error);
      });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        handleAddPlace(e.latlng);
      },
    });
    return null;
  };

  return (
    <>
      <MapContainer center={location} zoom={15} className="leaflet-container">
        <TileLayer
          url="https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=ae64d56a70fb4ee5a586adaf693ab9a0"
          attribution='&copy; <a href="https://www.thunderforest.com/maps/">Thunderforest</a> contributors'
        />
        <MapClickHandler />

        {lugares.map((lugar, index) => (
          <Marker key={index} position={lugar.coordenadas}>
            <Popup>
              <div className="texto">
                <img src={lugar.imagen} alt={lugar.nombreArea} style={{ width: "100%", height: "auto" }} />
                <h2>{lugar.nombreArea}</h2>
                <p>{lugar.descripcion}</p>
                <p>Horario: {lugar.horarioAbierto} - {lugar.horaCierre}</p>
                <button onClick={() => handleEditPlace(index)}>Editar</button>
                <button onClick={() => handleDeletePlace(index)}>Eliminar</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className={`side-menu ${menuVisible ? "visible" : ""}`}>
        <button className="menu-close" onClick={toggleMenu}>
          &times;
          <div className="palabra">
            <p>Mapa del Instituto Tecnológico</p>
          </div>
        </button>
        {lugares.map((lugar, index) => (
          <button key={index} onClick={() => handleLocationClick(index)}>
            {lugar.nombreArea}
          </button>
        ))}
      </div>
      <div className={`detail-menu ${detailMenuVisible ? "visible" : ""}`}>
        <button className="menu-close" onClick={closeDetailMenu}>
          &times;
        </button>
        <div className="detail-content">
          {placeInfo && (
            <>
              <img src={placeInfo.imagen} alt={placeInfo.nombreArea} style={{ width: "100%", height: "auto" }} />
              <h2>{placeInfo.nombreArea}</h2>
              <div className="separator"></div>
              <p>{placeInfo.descripcion}</p>
              <div className="separator"></div>
              <p>Horario: {placeInfo.horarioAbierto} - {placeInfo.horaCierre}</p>
              <div className="separator"></div>
              <p>Recomendaciones: {placeInfo.recomendaciones}</p>
            </>
          )}
        </div>
      </div>
      {editMode && (
        <div className="edit-form">
          <h2>Editar Lugar</h2>
          <label>
            Nombre del Área:
            <input
              type="text"
              name="nombreArea"
              value={editedPlace.nombreArea}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="descripcion"
              value={editedPlace.descripcion}
              onChange={handleChange}
            />
          </label>
          <label>
            Horario de Apertura:
            <input
              type="text"
              name="horarioAbierto"
              value={editedPlace.horarioAbierto}
              onChange={handleChange}
            />
          </label>
          <label>
            Horario de Cierre:
            <input
              type="text"
              name="horaCierre"
              value={editedPlace.horaCierre}
              onChange={handleChange}
            />
          </label>
          <label>
            Recomendaciones:
            <input
              type="text"
              name="recomendaciones"
              value={editedPlace.recomendaciones}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSaveEdit}>Guardar</button>
          <button onClick={() => setEditMode(false)}>Cancelar</button>
        </div>
      )}
      {addingPlace && (
        <div className="edit-form">
          <h2>Agregar Nuevo Lugar</h2>
          <label>
            Nombre del Área:
            <input
              type="text"
              name="nombreArea"
              value={editedPlace.nombreArea}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="descripcion"
              value={editedPlace.descripcion}
              onChange={handleChange}
            />
          </label>
          <label>
            Horario de Apertura:
            <input
              type="time"
              name="horarioAbierto"
              value={editedPlace.horarioAbierto}
              onChange={handleChange}
            />
          </label>
          <label>
            Horario de Cierre:
            <input
              type="time"
              name="horaCierre"
              value={editedPlace.horaCierre}
              onChange={handleChange}
            />
          </label>
          <label>
            Recomendaciones:
            <input
              type="text"
              name="recomendaciones"
              value={editedPlace.recomendaciones}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSaveNewPlace}>Guardar</button>
          <button onClick={() => setAddingPlace(false)}>Cancelar</button>
        </div>
      )}
      <button className="menu-toggle" onClick={toggleMenu}>
        Menú
      </button>
      <button className="boton-salir" onClick={salir}>
        Salir
      </button>
    </>
  );
};

export default MapaAdm;
