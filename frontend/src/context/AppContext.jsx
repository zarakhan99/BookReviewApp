import { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'
import api from './api';
import { loginUser, registerUser } from '../services/AuthService';


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userEmail, setUserEmail] = useState(); 

  
    const login = (userData, token) => 
      {
      
      const decodedToken = jwtDecode(token)
    
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      setToken(token);
      setUserId(decodeId);
      setUserRole(decodeRole);
    };
  
    const logout = () => {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(null);
      setToken(null);
    };
  
    return (
      <AppContext.Provider value={{ user, token, login, logout }}>
        {children}
      </AppContext.Provider>
    );
  };