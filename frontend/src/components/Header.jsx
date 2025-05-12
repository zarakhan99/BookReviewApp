import React, { useState } from "react";
 import { Link, useLocation, useNavigate } from "react-router-dom";
 import "../styles/Header.css";
 import { useAppContext } from "../context/AppContext"; // Updated import
 import LoginRegisterForm from './LoginRegister';
 import { FiSearch } from "../../node_modules/react-icons/fi";
 
 const Header = () => {
  // Safe context access
  const { isAuthenticated = false, logout = () => {}, userRole = null, clearReviews, fetchBooksByGenre} = useAppContext() || {};
   const [isMenuOpen, setMenuOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const location = useLocation();
   const navigate = useNavigate();


   const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      closeMenu();
    }
  };

   return (
    <nav>
        <div className="logo">
            <Link
            to="/home"
            className={location.pathname === "/home" ? "active" : ""}
            onClick={closeMenu}
            > 
            Book<span className="bold-look">Look</span>
            </Link>
            </div>
            <ul className={`menu ${isMenuOpen ? "active" : ""}`}>
                <li>
                    <Link to="/browse" className={location.pathname === "/browse" ? "active" : ""}
                    onClick={() => {
                      clearReviews();
                      fetchBooksByGenre(null); // ← make sure this is available in context
                      closeMenu();
                    }}
                    >
                        Browse
                        </Link>
                        </li>
                        <li>
                            <Link to="/my-books"
                            className={location.pathname === "/my-books" ? "active" : ""}
                            onClick={closeMenu}
                            >
                                MyBooks
                                </Link>
                                </li>
                                <li className={location.pathname === "/search" ? "active" : ""}
                                >
                                  <form onSubmit={handleSearch} className="search-form">
                                    <input type="text" placeholder="Search Books"className="search-input" value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    />  
                                    <button type="submit" className="search-button">
                                      <FiSearch />
                                      </button>
                                      </form>
                                      </li>
                                                {/* Conditional rendering for Account/Logout/Profile */}
                                                {isAuthenticated && (
                                                  <>
                                                    <li>
                                                      <Link
                                                        to="/profile"
                                                        className={location.pathname === "/profile" ? "active" : ""}
                                                        onClick={closeMenu}
                                                      >
                                                        Profile
                                                      </Link>
                                                    </li>
                                                    <li>
                                                      <Link
                                                        to="#"
                                        
                                                        onClick={handleLogout} // Call logout and redirect to home
                                                      >
                                                        Logout
                                                      </Link>
                                                    </li>
                                                  </>
                                                )}
                                                {!isAuthenticated && (
                                                          <li>
                                                            <Link
                                                              to="/account"
                                                              className={location.pathname === "/account" ? "active" : ""}
                                                              onClick={closeMenu}
                                                            >
                                                              Account
                                                            </Link>
                                                          </li>
                                                        )}
                                                        {isAuthenticated && userRole === "Admin" && (
                                                          <>
                                                          <li>
                                                            <Link
                                                              to="/admin/dashboard"
                                                              className={location.pathname === "/admin/dashboard" ? "active" : ""}
                                                              onClick={closeMenu}
                                                            >
                                                              Dashboard
                                                            </Link>
                                                          </li>
                                                            </>
                                                        )}
                                                      </ul>
                                                      <div className="menu-icon" onClick={toggleMenu}>
                                                        &#9776;
                                                      </div>
                                                    </nav>
                                                  );
                                                };
                                                
                                                export default Header;
                                            