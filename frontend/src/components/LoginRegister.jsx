import { useState } from 'react';
import { loginUser, registerUser } from '../services/AuthService';
import { useAppContext } from '../context/AppContext';

const LoginRegisterForm = () =>
{
    const { login } = useAppContext();
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => { 
        event.preventDefault();
        try {
            const userResponse = await loginUser(email, password);
            
            if (userResponse.token) {
                login(userResponse.userData, userResponse.token);
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

    <div className="card p-4">
        <h3>Your Account</h3>
        <form onSubmit={isLoginForm ? handleLogin : handleregistration}>
            <div className="btn-group">
            <button type="button" className="btn btn-primary" onClick={() => setIsLoginForm(true)}>Sign In</button>
            <button type="button" className="btn btn-primary" onClick={() => setIsLoginForm(false)}>Register</button>
            </div>
            <div className= "form-group">
            <label htmlFor="email" className="form-label mt-4">Email address</label>
            <input type="email" className="form-control" id="email"  placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input> 
            </div>
            <div className= "form-group">
            <label htmlFor="password" className="form-label mt-4">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></input> 
            </div>
            <button type="submit" className="btn btn-primary btn-block">
            {isLoginForm ? 'Login' : 'Create Account'}</button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
    </div>
    );
};

export default LoginRegisterForm;

