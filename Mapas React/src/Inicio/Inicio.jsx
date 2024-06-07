import { useNavigate } from "react-router-dom";
import "./Inicio.css";

const Inicio = () => {
  const navigate = useNavigate();


  const handleAdmind = () => {
    navigate("/login")
  }
  const handleEntrarClick = () => {
    navigate("/mapas");
  };


  return (
    <div className="principal">
        <div className="imagen-fondo">    </div>
      <div className="contenedor">
        <p>Mapa del Instituto 
            <br/>Tecnológico de Oaxaca</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Instituto_Tecnologico_de_Oaxaca_-_original.svg/799px-Instituto_Tecnologico_de_Oaxaca_-_original.svg.png"></img>
        <br/>
        <button onClick={handleEntrarClick} className="entrar">Entrar</button>
        <br/>
        <button onClick={handleAdmind} className="administrador">Logearse como administrador</button>
      </div>
      </div>

  );
};

export default Inicio;

