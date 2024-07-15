import React from "react";
import { useNavigate } from 'react-router-dom';
import './login.css'
import Logo from '../../assets/HeroLogo.png'
import useLogin from "../../hooks/useLogin";

function Login () {

    const { email, setEmail, password, setPassword, handleLogin } = useLogin();
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = await handleLogin();
        if (token) {
            navigate('/backoffice/dashboard');
        } else {
            alert('Email et/ou mot de passe incorrect')
        }
    };

    return (
        <div>
            <div className="LogoContainer">
                <img className='logo' src={Logo} alt="" />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="LoginForm">
                    <input type="email" name="email" id="email" required value={email} placeholder="E-MAIL" onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input type="password" name="password" id="password" required value={password} placeholder="MOT DE PASSE" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="LoginButton">
                    <button type="submit">SE CONNECTER</button>
                </div>
            </form>
        </div>
    );
};
export default Login;