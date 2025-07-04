import { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'
import api from '../services/api';
import { loginUser, registerUser } from '../services/AuthService';


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  
  // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userEmail, setUserEmail] = useState(); 
    const [token, setToken] = useState(null);

    // App data state
    const [books, setBooks] = useState([]);
    const [bookDetails, setBookDetails] = useState([]);
    const [genresForBook, setGenresForBook]= useState([]);
    const [genres, setGenres] = useState([]);
    const [bookGenres, setBookGenres]= useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [bookReviews, setBookReviews] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const [myBooks, setMyBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    //fetching books
    useEffect(() => {
      const fetchBookData = async () => {
        try {
          setLoading(true);
          
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
      
    //Fetch specific books using their Ids

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

      //Creating a book

      const createBook = async (title, author, publishYear,bookDescription, bookImageUrl) => {
        try {
          setLoading(true);

          const bookData = {
            title: title,
            author: author,
            publishYear: Number(publishYear),
            bookDescription: bookDescription,
            imageUrl: bookImageUrl, 
          };

          const book = await api.post(`/books`, bookData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setBooks(prevBooks => [...prevBooks, book.data]);
          setLoading(false);
          return book.data; 
      } catch(err)
      {
        console.error("Failed to add book:", err);
        setLoading(false);
        setError("Failed to add book.");
        return null;
      }
      };

      //Editing a existing book 

      const editBook = async (bookId, bookData) => {
        try {
          setLoading(true);

          const editData = {
            BookId: bookId, 
            Title: bookData.title,
            Author: bookData.author,
            PublishYear: parseInt(bookData.publishYear),
            BookDescription: bookData.bookDescription,
            ImageUrl: bookData.imageUrl || null, 
          };


          const updatedBook = await api.put(`/Books/${bookId}`, editData)

          setBooks(prev => prev.map(book => 
            book.bookId === bookId ? { ...book, ...bookData } : book
          ));
          
          setLoading(false);
          return updatedBook.data; 
      } catch(err)
      {
        console.error("Failed to edit book:", err);
        setLoading(false);
        setError("Failed to edit book.");
        return null;
      }
    };
      
    //Assigning a genre to a book

      const assignBookToGenre = async (bookId, genreId) => {
        try {
          setLoading(true);

          const newBookGenre = {
            bookId: bookId,
            genreId: genreId
          };

          const bookGenre = await api.post(`/bookGenres`, newBookGenre, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setGenresForBook([...genresForBook, bookGenre.data]);
          setLoading(false);
          return bookGenre.data; 
      } catch(err)
      {
        console.error("Failed to add bookgenre:", err);
        setLoading(false);
        setError("Failed to add bookgenre.");
        return null;
      }
      };

      //Deleting a book

      const deleteBook = async (bookId) => {
        try {
          setLoading(true);
          console.log(userRole);
      
          if (userRole === 'Admin') {

            await deleteBookGenreByBook(bookId);

            await api.delete(`Books/${bookId}`);
            
            setBooks(prevBooks => prevBooks.filter(book => book.bookId !== bookId));
          } else {
            setError("Unauthorized: Not an Admin!");
          }
        } catch (err) {

          if (err.response?.status === 404) {
            // Silently ignore 404 errors

          } else if (err.response?.status === 403) {
            setError("User not authorized: Not an Admin!");

          } else {
            console.error("Deletion failed:", err);
            setError("Failed to delete book. Please try again.");
          }
        } finally {
          setLoading(false);
        }
      };
      
    //Get genres for a specific book using its ID

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


      //Fetching reviews

      const fetchReviews = async () => {
        try {
          setLoading(true);
          
          // Fetch books
          const reviews = await api.get('/Reviews');

          setAllReviews(reviews.data);
          
          setLoading(false);
          
        } catch (err) {
          if (err.response?.status === 404) {
            setError("No reviews found");
          } else {
            console.error("Fetch failed:", err);
          }
          setLoading(false);
        }
      };

    //Fetch reviews for specific book using book ID

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

        //Submit a review 

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

          console.log('Review submitted successfully:', userReview.data);

          setLoading(false);

          return userReview.data; 
        } catch (err) {
          console.error("Failed to submit review:", err);
          setLoading(false);
          setError("Failed to submit review.");
          return null;
        }
      };

      //Fetch reviews by specific user using Id

      const fetchReviewsByUser = async (userId) => {
        try {
          setLoading(true);

          const reviewsByUser = await api.get(`Reviews/ByUser/${userId}`);

          setUserReviews(reviewsByUser.data);

          setLoading(false);
        } catch (err) {
          if (err.response?.status === 404) {
            setError("No reviews found for this user");
          } else {
            console.error("Fetch failed:", err);
          }
          setLoading(false);
        }
      };

     //Delete  a review by  member Id or if youre a admin

      const deleteReview = async (reviewId, memberId) => {
        try {
          setLoading(true);
          console.log(userRole, userId);
      
          if (userRole === 'Admin' || userId === memberId) {
            await api.delete(`Reviews/${reviewId}`);
          
             // Always update allReviews if Admin
      if (userRole === 'Admin') {
        setAllReviews(prev => prev.filter(review => review.reviewId !== reviewId));
      }

      // Always update userReviews if deleting own review (for "My Books")
      if (userId === memberId) {
        fetchReviewsByUser(memberId);
      }
    } else {
      setError("Unauthorized: You can only delete your own review or be an Admin.");
    }
        }catch (err) {
          if (err.response?.status === 403) {
            setError("User not authorized: Not an Admin or owner of review!");
          } else {
            console.error("Deletion failed:", err);
          }
        } finally {
          setLoading(false);
        }
      };

      //Fetching genres

    useEffect(() => {
      const fetchGenre = async () => {
        try {
          setError(null); 
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

    //Filtering books by their genres

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

        //Create a genre

        const createGenre = async (genreName) => {
          try
          {
            setLoading(true);

            const genreInfo = {
              genreName: genreName,

            };

            const newGenre = await api.post('/Genres', genreInfo)

          console.log('Genre added successfully:', newGenre.data);
          
          setGenres(prev => [...prev, newGenre.data]);
          setLoading(false);
          return newGenre.data; // Return the new review data
        } catch (err) {
          console.error("Failed to add genre:", err);
          setLoading(false);
          setError("Failed to add genre.");
          return null;
        }
      };

      //Delete a genre and delete book genre associated with it

      const deleteGenre = async (genreId) => {
        try {
          setLoading(true);
          console.log(userRole);
      
          if (userRole === 'Admin') {

            await deleteBookGenreByGenre(genreId);

            await api.delete(`Genres/${genreId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            setGenres(prev => prev.filter(g => g.genreId !== genreId));
            setGenresForBook(prev => prev.filter(g => g.genreId !== genreId));
            
          } else {
            setError("Unauthorized: Not an Admin!");
          }
        } catch (err) {
          if (err.response?.status === 403) {
            setError("User not authorized: Not an Admin!");
          } else {
            console.error("Deletion failed:", err);
          }
        } finally {
          setLoading(false);
        }
      };

      //Fetch all book genres 

      const fetchBookGenres = async () => {
        try {
          setError(null);
          setLoading(true);

          if (userRole === 'Admin') {
          const allBookGenres = await api.get(`/BookGenres`);
          
          setBookGenres(allBookGenres.data); 
          }
          } catch (err) {
            setError("Failed to fetch genres");
            setBookGenres([]);
          } finally {
            setLoading(false);
          };
        };
        
      //Create a bookGenre

        const createBookGenre = async (bookId, genreId) => {
          try
          {
            setLoading(true);

            const bookGenreInfo = {
              bookId: bookId,
              genreId: genreId

            };

            const bookGenre = await api.post('/BookGenres', bookGenreInfo)

            setBookGenres(prev => [...prev, bookGenre.data]);

          console.log('Genre added successfully:', bookGenre.data);

          setLoading(false);

          return bookGenre.data; 
        } catch (err) {
          console.error("Failed to add book genre:", err);
          setLoading(false);
          setError("Failed to add book genre.");
          return null;
        }
      };

      // Delete a bookgenre using specific bookId
      // When you delete a book the relation ship with the genre is also deleted 

      const deleteBookGenreByBook = async (bookId) => {
        try {
          setLoading(true);
          console.log(userRole);
      
          if (userRole === 'Admin') {
            await api.delete(`BookGenre/bybook/${bookId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            setGenresForBook(prev => prev.filter(bg => bg.bookId !== bookId));
          } else {
            setError("Unauthorized: Not an Admin!");
          }
        } catch (err) {
          if (err.response?.status === 403) {
            setError("User not authorized: Not an Admin!");
          } else {
            console.error("Deletion failed:", err);
          }
        } finally {
          setLoading(false);
        }
      };

      // Delete a bookgenre using specific genre
      // When you delete a genre the relationship with the book is also deleted 

      const deleteBookGenreByGenre = async (genreId) => {
        try {
          setLoading(true);
          console.log(userRole);
      
          if (userRole === 'Admin') {
            await api.delete(`BookGenre/bygenre/${genreId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            setGenresForBook(prev => prev.filter(g => g.genreId !== genreId));
          } else {
            setError("Unauthorized: Not an Admin!");
          }
        } catch (err) {
          if (err.response?.status === 403) {
            setError("User not authorized: Not an Admin!");
          } else {
            console.error("Deletion failed:", err);
          }
        } finally {
          setLoading(false);
        }
      };

      //Delete a BookGenre

      const deleteBookGenre = async (bookGenreId) => {
        try {
          setLoading(true);
          console.log(userRole);
      
          if (userRole === 'Admin') {
            await api.delete(`BookGenres/${bookGenreId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            setBookGenres(prev => prev.filter(bg => bg.bookGenreId !== bookGenreId));
            setGenresForBook(prev => prev.filter(bg => bg.bookGenreId !== bookGenreId));
          } else {
            setError("Unauthorized: Not an Admin!");
          }
        } catch (err) {
          if (err.response?.status === 403) {
            setError("User not authorized: Not an Admin!");
          } else {
            console.error("Deletion failed:", err);
          }
        } finally {
          setLoading(false);
        }
      };


      //login 
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
  
    //logout
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
      filteredBooks,
      bookDetails,
      loading,
      error,
      genres,
      bookReviews,
      myBooks,
      books: filteredBooks.length > 0 ? filteredBooks : books,
      genresForBook,
      userReviews,
      allReviews,
      bookGenres,

      clearReviews,
      fetchBooksByGenre,
      fetchBookDetails,
      fetchBookReviews,
      fetchGenresForBook,
      submitReview,
      fetchReviewsByUser,
      fetchReviews,
      deleteReview,
      createBook,
      assignBookToGenre,
      deleteBook,
      createGenre,
      createBookGenre,
      deleteGenre,
      fetchBookGenres,
      deleteBookGenre,
      editBook,

    };
    
        return (
          <AppContext.Provider value={value}>
            {children}
          </AppContext.Provider>
        );
      };
      export const useAppContext = () => useContext(AppContext);
