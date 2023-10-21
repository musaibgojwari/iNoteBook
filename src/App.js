import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Alert from './components/Alert';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './contexts/notes/NoteState';
import Signup from './components/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLogged') === 'true');

  useEffect(() => {
    if(localStorage.getItem('token')) setIsLoggedIn(true);
  }, []);

  return (
    <NoteState>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home isLogged={isLoggedIn} />} />
            <Route path="/home" element={<Home isLogged={isLoggedIn} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login isLogged={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
