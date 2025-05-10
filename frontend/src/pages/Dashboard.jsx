import { useState, useEffect } from 'react';
import { useAppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';
import CreateBook from '../components/CreateBook';
import ViewBooks from '../components/ViewBooks';
import "../styles/Dashboard.css";


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
                <button onClick={() => setActiveView("createGenre")} className={activeView === "createGenre" ? "active" : ""}>
                    Create genre
                    </button>
                <button onClick={() => setActiveView("viewGenres")} className={activeView === "viewGenres" ? "active" : ""}>
                    View genres
                    </button>
                </div>
              </aside>
          
              <main className="main-content">
                {activeView === "CreateBook" && <CreateBook/>}
                {activeView === "ViewBooks" && <ViewBooks/>}
              </main>
            </div>
          );
};
export default Dashboard;