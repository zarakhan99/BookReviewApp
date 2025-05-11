import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/AuthService';
import { useAppContext } from '../context/AppContext';
import "../styles/LoginRegister.css";


const LoginRegisterForm = () =>
{
    const { login } = useAppContext();
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => { 
        event.preventDefault();
        try {
            const userResponse = await loginUser(email, password);
            
            if (userResponse.token) {
                login(userResponse.userData, userResponse.token);
                navigate('/');
            } 
        } catch (error) {
            if (error.response?.status === 401) {
              setError("Invalid Email or Password"); 
            } else {
              setError("Login failed. Please try again."); // Fallback for other errors
            }
          }
        };
    
    const handleregistration = async (event) => { 
        event.preventDefault();
        try {
            const userResponse = await registerUser(email, password);
            
            if (userResponse.token) {
                login(userResponse.userData, userResponse.token);
                navigate('/');
            } 
        } catch (error) {
            if (error.response?.status === 400) {
                const errorMessage = error.response.data 
              setError(errorMessage); 
            } else {
              setError("Registration failed. Please try again."); // Fallback for other errors
            }
          }
        };

    return (

    <div className="login wrapper">
        <h3>Your Account</h3>
        <div className="login-box">
        <form onSubmit={isLoginForm ? handleLogin : handleregistration}>
            <div className="btn-group">
            <button type="button" className="sign-in-button" onClick={() => setIsLoginForm(true)}>Sign In</button>
            <button type="button" className="register-button" onClick={() => setIsLoginForm(false)}>Register</button>
            </div>
            <div className= "form-group">
            <label htmlFor="email" className="email-label">Email address</label>
            <input type="email" className="field-input" id="email"  placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input> 
            </div>
            <div className= "form-group">
            <label htmlFor="password" className="password-label">Password</label>
            <input type="password" className="field-input" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></input> 
            </div>
            <button type="submit" className="action-buttons">
            {isLoginForm ? 'Login' : 'Create Account'}</button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
        </div>
    </div>
    );
};

export default LoginRegisterForm;

