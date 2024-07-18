import React, { useState } from "react";
import './login.css'
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { fetchLogin } from "../../services/login.service";
import Logo from '../../assets/HeroLogo.png'

function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const signIn = useSignIn();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = await fetchLogin(email, password);
        if (token) {
            signIn({
                auth: {
                    token: token,
                    type: 'Bearer'
                },
            })
            navigate('/backoffice/dashboard');
        } else {
            alert('Email et/ou mot de passe incorrect');
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