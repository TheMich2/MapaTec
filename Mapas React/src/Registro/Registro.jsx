// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registro = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/register', { name, email, password });
            console.log(response);
            navigate('/MapaAdm'); // Redirigir a la página de administrador después del registro exitoso
        } catch (error) {
            console.error(error);
            setError('Error al registrar. Verifique los datos ingresados.');
        }
    };

    return (
        <form className="register-form" onSubmit={handleRegister}>
            <h2>Registro</h2>
            <label htmlFor="name">Nombre</label>
            <input 
                type="text" 
                name="name" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
            />
            <br />
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
            <label htmlFor="password">Contraseña</label>
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
            <input type="submit" value="Registrarse" />
        </form>
    );
};

export default Registro;
