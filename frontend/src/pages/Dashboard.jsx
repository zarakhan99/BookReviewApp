import { useState, useEffect } from 'react';
import { useAppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

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
                <h3 className = "Books-header">Books </h3>
                <button onClick={() => setActiveView("createBook")} className={activeView === "createBook" ? "active" : ""}>
                    Create book 
                </button>
                <button onClick={() => setActiveView("viewBooks")} className={activeView === "viewBooks" ? "active" : ""}>
                    View books</button>
                <h3 className = "Books-header">Genre </h3>
                <button onClick={() => setActiveView("createGenre")} className={activeView === "createGenre" ? "active" : ""}>
                    Create genre
                    </button>
                <button onClick={() => setActiveView("viewGenres")} className={activeView === "viewGenres" ? "active" : ""}>
                    View genres
                    </button>
              </aside>
          
              <main className="main-content">
                {/* This is where the view will change based on activeView */}
              </main>
            </div>
          );
};
export default Dashboard;