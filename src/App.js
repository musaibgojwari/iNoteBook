import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home'
import About from './components/About';
import Login from './components/Login';
import { Alert } from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './contexts/notes/NoteState';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false)

  return (
    <>
    <NoteState>
      <Router>
          {/* <Alert message="This is amazing React course" /> */}
          <Navbar isLogged={isLoggedIn} setIsLogged={setisLoggedIn}/>
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home isLogged={isLoggedIn} />} />
              <Route path="/home" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/login"  element={<Login isLogged={isLoggedIn} setIsLogged={setisLoggedIn} />} />
              <Route path="/signup" element={<Signup/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
