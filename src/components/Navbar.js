import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {  
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLogged');
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            {!isLoggedIn ? (
              <div className="d-flex">
                <Link className="btn btn-primary mz-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
              </div>
            ) : (
              <button className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
