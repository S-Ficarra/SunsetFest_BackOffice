import { useState } from 'react';
import { login } from '../services/login.service';

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const token = await login(email, password);
            localStorage.setItem('jwtToken', token);
            return token;
        } catch (err) {
            setError(err);
            console.error('Erreur lors de la connexion:', err);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleLogin
    };
};

export default useLogin;