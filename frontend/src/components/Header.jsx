import React, { useState } from "react";
 import { Link, useLocation, useNavigate } from "react-router-dom";
 import "../styles/Header.css";
 import { useAppContext } from "../context/AppContext"; // Updated import
 import LoginRegisterForm from './LoginRegister';
 
 const Header = () => {
   const [isMenuOpen, setMenuOpen] = useState(false);
   const { isAuthenticated, logout, userRole } = useAppContext();
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
                    onClick={closeMenu}
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
                                <li>
                                    <Link
                                    to="/search"
                                    className={location.pathname === "/search" ? "active" : ""}
                                    onClick={closeMenu}
                                    >
                                        Search
                                        </Link>
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
                                                        {!isAuthenticated && userRole === "Admin" && (
                                                          <>
                                                          <li>
                                                            <Link
                                                              to="/manage-books"
                                                              className={location.pathname === "/manage-Books" ? "active" : ""}
                                                              onClick={closeMenu}
                                                            >
                                                              Dashboard
                                                            </Link>
                                                          </li><li>
                                                              <Link
                                                                to="/manage-users"
                                                                className={location.pathname === "/manage-users" ? "active" : ""}
                                                                onClick={closeMenu}
                                                              >
                                                                Manage Users
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
                                            