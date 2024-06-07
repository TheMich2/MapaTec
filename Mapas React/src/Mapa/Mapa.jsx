import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapa.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Mapa = () => {
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
  const [lugares, setLugares] = useState([]); // Inicializamos lugares como un array vacío
  useEffect(() => {
    const fetchLugares = () => {
      axios.get('/mapas')
        .then(response => {
          const lugaresConCoordenadas = response.data.map(lugar => ({
            ...lugar,
            coordenadas: { lat: lugar.latitud, lng: lugar.altitud } // Convertimos latitud y altitud a coordenadas
          }));
          setLugares(lugaresConCoordenadas);
        })
        .catch(error => {
          console.error('Error fetching lugares:', error);
        });
    };
  
    fetchLugares();
  }, []); // Esto asegura que la solicitud se realice solo una vez al montar el componente
  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    if (detailMenuVisible) {
      setDetailMenuVisible(false);
    }
  };

  const handleLocationClick = (index) => {
    setLocation(lugares[index].coordenadas);
    setPlaceInfo(lugares[index]);
    setMenuVisible(false);
    setDetailMenuVisible(true);
  };

  const closeDetailMenu = () => {
    setDetailMenuVisible(false);
  };

  return (
    <>
      <MapContainer center={location} zoom={15} className="leaflet-container">
        <TileLayer
          url="https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=ae64d56a70fb4ee5a586adaf693ab9a0"
          attribution='&copy; <a href="https://www.thunderforest.com/maps/">Thunderforest</a> contributors'
        />

        {lugares.map((lugar, index) => (
          <Marker key={index} position={lugar.coordenadas}>
            <Popup>
              <div className="texto">
                <img src={lugar.imagen} alt={lugar.nombreArea} style={{ width: "100%", height: "auto" }} />
                <h2>{lugar.nombreArea}</h2>
                <p>{lugar.descripcion}</p>
                <p>Horario: {lugar.horarioAbierto}-{lugar.horaCierre}</p>
                {lugar.cerrado && <p>Abierto ahora</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className={`side-menu ${menuVisible ? "visible" : ""}`}>
        <button className="menu-close" onClick={toggleMenu}>
          &times;
          <div className="palabra">
            <p>Mapa del Instituto Tecnologico</p>
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
              {placeInfo.cerrado && <p>Cerrado ahora</p>}
              <p>Recomendaciones : {placeInfo.recomendaciones}</p>
            </>
          )}
        </div>
      </div>
      <div className="bar-lateral">
        <p>Yeah</p>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <button className="salir" onClick={salir}>Salir</button>
    </>
  );
};

export default Mapa;
