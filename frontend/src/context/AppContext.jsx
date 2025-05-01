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
    const [BookDetails, setBookDetails] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
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
      
    useEffect(() => {
      const fetchBookDetails = async () => {
        try {
          setLoading(true);
          
          // Fetch books
          const bDetails = await api.get(`/books/${bookId}`);

          setBookDetails(bDetails.data);
          
          setLoading(false);
          
        } catch (err) {
          if (err.response?.status === 404) {
            setError("No book details found");
          } else {
            console.error("Fetch failed:", err);
          }
          setLoading(false);
        }
      };
      
      fetchBookDetails(); // Call inside useEffect
    }, [bookId]);
      
    //get reviews for specific book
   

      useEffect (() => {
        const fetchBookReviews = async () => {
          try {
            setLoading(true);

            const bookReviews = await api.get(`/ByBook/${bookId}`);

            setReviews(bookReviews.data);

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
      }, [bookId]);
  

    //fetching genres
    useEffect(() => {
      const fetchGenre = async () => {
        try {
          setLoading(true);
          
          // Fetch books
          const genres = await api.get('/genres');

          setGenres(genres.data);
          
          setLoading(false);
          
        } catch (err) {
          if (err.response?.status === 404) {
            setError("No Genres found");
          } else {
            console.error("Fetch failed:", err);
          }
          setLoading(false);
        }
      };
      
      fetchGenre(); // Call inside useEffect
    }, []);

    

      
        const fetchBooksByGenre = async (genreId) => {
          try {
            setLoading(true);
            setError(null);

            if (!genreId) {
              setFilteredBooks([]);; 
              setLoading(false);
              return;
            }
            else {
              const bGenres = await api.get(`/Books/ByGenre/${genreId}`);

            setFilteredBooks(bGenres.data);

            }
            setLoading(false);
          } catch (err) {
            setFilteredBooks([]);
            if (err.response?.status === 404) {
              setError("No books found for this genre");
            } else {
              console.error("Fetch failed:", err);
            }
            setLoading(false);
          }
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
          BookDetails,
          loading,
          error,
          genres,
          reviews,
          myBooks,
          books: filteredBooks.length > 0 ? filteredBooks : books,
          fetchBooksByGenre,
          fetchBookDetails,
          bookReviews
        };
    
        return (
          <AppContext.Provider value={value}>
            {children}
          </AppContext.Provider>
        );
      };
      export const useAppContext = () => useContext(AppContext);
