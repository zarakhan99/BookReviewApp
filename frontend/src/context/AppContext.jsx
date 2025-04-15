import { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'
import api from '../services/api';
import { loginUser, registerUser } from '../services/AuthService';


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userEmail, setUserEmail] = useState(); 
    const [token, setToken] = useState(null);

    const [books, setbooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [myBooks, setMyBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

  
    const login = (userData, token) => {

      const decodedToken = jwtDecode(token)
    
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      setToken(token);
      setUserId(decodedToken.nameid);
      setUserRole(decodedToken.role);
      setUserEmail(decodedToken.sub);

      setIsAuthenticated(true);
    };
  
    const logout = () => {
      api.defaults.headers.common['Authorization'] = null;
      setUser(null);
      setToken(null);
      setUserId(null);
      setUserRole(null);
      setUserEmail(null);

      setIsAuthenticated(false);
    };

    return (
      <AppContext.Provider value={{ user, token, login, logout }}>
        {children}
      </AppContext.Provider>
    );
  };
  export const useAppContext = () => useContext(AppContext);