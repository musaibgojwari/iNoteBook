import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar({isLogged,setIsLogged}) {  
  let location = useLocation()
  const { pathname }= location
  useEffect(() => {
  }, [location]);

  let history = useNavigate();


  const ctrlClick = () => {
    localStorage.removeItem('token');
    setIsLogged(false); // update the state
  }

  useEffect(() => {
    history("/login");
  }, [isLogged])
  
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${ pathname==="/home" ? "active" : "" }`} aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${ pathname==="/about" ? "active" : "" }`} to="/about">About</Link>
              </li>
            </ul>
           { !localStorage.getItem("token") ? <form className="d-flex">
              <Link className="btn btn-primary mz-2" to="/login" role="button" >Login</Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button" >Signup</Link>
            </form> :
              <Link className="btn btn-primary mx-2" to="/" role="button" onClick={ctrlClick} >Logout</Link>}
          </div>
        </div>
      </nav>
    </div>
    )
}
