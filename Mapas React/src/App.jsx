import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Mapa from './Mapa/Mapa';
import Inicio from './Inicio/Inicio';
import Login from './Login/Login';
import MapaAdmin from './MapaAdmin/MapaAdmin';
import Registro from './Registro/Registro';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/mapas" element={<Mapa />} />
        <Route path='/mapaAdm' element={<MapaAdmin/>} />
      </Routes>
    </Router>
  );
}

export default App;