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

    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [myBooks, setMyBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    //fetching books
    useEffect(() => {
      const fetchBookData = async () => {
        try {
          setLoading(true);
          
          // Fetch books
          const books = await api.get('/books');

          setBooks(books.data);
          
          setLoading(false);
          
        } catch (err) {
          if (err.response?.status === 404) {
            setError("No books found");
          } else {
            console.error("Fetch failed:", err);
          }
          setLoading(false);
        }
      };
      
      fetchBookData(); // Call inside useEffect
    }, []);
      
    //get reviews for specific book
    const bookReviews = ({bookId, onClose}) => {

      useEffect (() => {
        const fetchBookReviews = async () => {
          try {
            setLoading(true);

            const bReviews = await api.get(`/ByBook/${bookId}`);

            setReviews(response.data);

            setLoading(false);
          } catch (err) {
            if (err.response?.status === 404) {
              setError("No reviews found for book");
            } else {
              console.error("Fetch failed:", err);
            }
            setLoading(false);
          }
        };
        
        fetchBookReviews(); // Call inside useEffect
      }, []);
    };


  
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
  
    const value = {
          user,
          token,
          login,
          logout,
          isAuthenticated, 
          userId,
          userRole,
          userEmail,

          books,
          loading,
          error,
          genres,
          reviews,
          myBooks,

          bookReviews
        };
    
        return (
          <AppContext.Provider value={value}>
            {children}
          </AppContext.Provider>
        );
      };
      export const useAppContext = () => useContext(AppContext);
