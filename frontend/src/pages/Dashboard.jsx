import { useState, useEffect } from 'react';
import { useAppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';
import CreateBook from '../components/CreateBook';
import ViewBooks from '../components/ViewBooks';
import ViewReviews from '../components/ViewReviews';
import "../styles/Dashboard.css";
import ManageGenres from '../components/ManageGenres';


const Dashboard  = () => {

    const { books, genres, createBook, assignBookToGenre, error, loading, isAuthenticated = false} = useAppContext();

    const [activeView, setActiveView] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const isAuthorized = () => {
            if (!isAuthenticated)
            {
                navigate(`/account`)
            }  
        };
        isAuthorized();
    
        }, [isAuthenticated]);
        
        return (
            <div className="dashboard-container">
              <aside className="admin-sidebar">
                {/* All your sidebar content goes here */}
                <h4 className = "books-header">
                    Books 
                </h4>
                <div className = "book-button">
                <button onClick={() => setActiveView("CreateBook")} className={activeView === "CreateBook" ? "active" : ""}>
                    Create book 
                </button>
                <button onClick={() => setActiveView("ViewBooks")} className={activeView === "ViewBooks" ? "active" : ""}>
                    View books</button>
                </div>
                <h4 className = "genre-header">
                    Genre 
                </h4>
                <div className = "genre-button">
                <button onClick={() => setActiveView("ManageGenres")} className={activeView === "ManageGenres" ? "active" : ""}>
                    Manage Genres
                    </button>
                <button onClick={() => setActiveView("ManageBookGenres")} className={activeView === "ManageBookGenres" ? "active" : ""}>
                    Manage Book Genres
                    </button>
                </div>
                <h4 className = "review-header">
                    Reviews
                </h4>
                <div className = "view-review">
                <button onClick={() => setActiveView("ViewReviews")} className={activeView === "ViewReviews" ? "active" : ""}>
                    View Reviews
                    </button>
                </div>
              </aside>
          
              <main className="main-content">
                {activeView === "CreateBook" && <CreateBook/>}
                {activeView === "ViewBooks" && <ViewBooks/>}
                {activeView === "ViewReviews" && <ViewReviews/>}
                {activeView === "ManageGenres" && <ManageGenres/>}
              </main>
            </div>
          );
};
export default Dashboard;