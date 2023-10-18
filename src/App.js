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

//   const apiData = async () => {
//     try {
//         const response = await fetch("http://localhost:5000/api/notes/fetchallnotes", {
//             method: 'GET',
//             headers: {
//                 'auth-token': process.env.AUTH_TOKEN,  // Use environment variable for security
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();  // Convert response to JSON
//         return data;

//     } catch (error) {
//         console.error("There was a problem with the fetch operation:", error.message);
//     }
// }


//   apiData()
  return (
    <>
    <NoteState>
      <Router>
          <Alert message="This is amazing React course" />
          <Navbar isLogged={isLoggedIn} setIsLogged={setisLoggedIn}/>
          <div className="container">
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
