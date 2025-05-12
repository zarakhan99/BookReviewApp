import { useState} from 'react';
import CreateBook from '../components/CreateBook';
import ViewBooks from '../components/ViewBooks';
import ViewReviews from '../components/ViewReviews';
import "../styles/Dashboard.css";
import ManageGenres from '../components/ManageGenres';
import ManageBookGenres from '../components/ManageBookGenres';


const Dashboard  = () => {

    const [activeView, setActiveView] = useState(null);
        
        return (
            <div className="dashboard-container">
              <aside className="admin-sidebar">
                {/* Sidebar content*/}
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
              
              {/* main content*/}
              <main className="main-content">
                {!activeView && (
                    <div className="dashboard-welcome">
                        <h2>Welcome to the Admin Dashboard!</h2>
                        <p>The admin dashboard is where you can manage books, genres, bookgenres and reviews.</p>
                        <p>Select an option from the sidebar to get started.</p>
                    </div>
                )}
                {activeView === "CreateBook" && <CreateBook/>}
                {activeView === "ViewBooks" && <ViewBooks/>}
                {activeView === "ViewReviews" && <ViewReviews/>}
                {activeView === "ManageGenres" && <ManageGenres/>}
                {activeView === "ManageBookGenres" && <ManageBookGenres/>}
              </main>
            </div>
          );
};
export default Dashboard;