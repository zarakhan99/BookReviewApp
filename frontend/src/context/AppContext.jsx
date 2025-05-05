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
    const [bookDetails, setBookDetails] = useState([]);
    const [genresForBook, setGenresForBook]= useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [bookReviews, setBookReviews] = useState([]);
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
      
    //fetch specific books using their Ids
      const fetchBookDetails = async (bookId) => {
        try {
          setLoading(true);
          
          
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

    //get genres for a specific book

      const fetchGenresForBook = async (bookId) => {
        try {
          setLoading(true);
          
          
          const bGenres = await api.get(`Books/book-genres/${bookId}`);

          setGenresForBook(bGenres.data);
          
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

      
    //get reviews for specific book
        const fetchBookReviews = async (bookId) => {
          try {
            setLoading(true);
            setBookReviews([]);

            const bookReviews = await api.get(`Reviews/ByBook/${bookId}`);

            setBookReviews(bookReviews.data);

            setLoading(false);
          } catch (err) {
            setBookReviews([]);
            if (err.response?.status === 404) {
              setError("No reviews found for book");
            } else {
              console.error("Fetch failed:", err);
            }
            setLoading(false);
          }
        };

        const submitReview = async (userId, bookId, rating, reviewComment ) => {
          try
          {
            setLoading(true);

            const reviewInfo = {
              memberId: userId,
              bookId: bookId,
              rating: rating,
              reviewComment: reviewComment
            };

            const userReview = await api.post('/Reviews', reviewInfo, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

          console.log('Review submitted successfully:', reviewInfo.data);

          setLoading(false);

          return response.data; // Return the new review data
        } catch (err) {
          console.error("Failed to submit review:", err);
          setLoading(false);
          setError("Failed to submit review.");
          return null;
        }
      };

  

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

    //filteeing books by their genres
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

        const clearReviews = () => {
          setBookReviews([]);
        };

    const login = (userData, token) => {

      const decodedToken = jwtDecode(token)

      console.log('User JWT Token:', token);
      console.log(decodedToken)
    
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      setToken(token);
      setUserId(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
      setUserRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
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
      bookDetails,
      loading,
      error,
      genres,
      bookReviews,
      myBooks,
      books: filteredBooks.length > 0 ? filteredBooks : books,
      genresForBook,

      clearReviews,
      fetchBooksByGenre,
      fetchBookDetails,
      fetchBookReviews,
      fetchGenresForBook,
      submitReview
    };
    
        return (
          <AppContext.Provider value={value}>
            {children}
          </AppContext.Provider>
        );
      };
      export const useAppContext = () => useContext(AppContext);
