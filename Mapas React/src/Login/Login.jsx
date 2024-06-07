// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Añadido: definición de la variable de estado error
    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/login', { email, password });
            console.log(response);
            navigate('/MapaAdm');
        } catch (error) {
            console.error(error);
            setError('Error al iniciar sesión. Verifique sus credenciales.');
        }
    };
    const nuevo=(event)=>{
        event.preventDefault();
        navigate('/Register');


    };
    return (
        <form className="login-form" >
            <h2>Inicio de sesión</h2>
            <label htmlFor="email">Correo</label>		
            <input 
                type="email" 
                name="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <br />
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                name="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input onClick={handleClick} type="submit" value="Iniciar sesión" />
            <input type="submit" value="Registrarse" onClick={nuevo} />

        </form>
    );
};

export default Login;

