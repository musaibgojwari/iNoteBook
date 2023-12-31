import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ isLogged, setIsLoggedIn }) {
  const [val, setVal] = useState({ email: "", password: "" });
  const [authToken,setAuthToken] = useState(null)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(val),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('token', data.authToken);
      setAuthToken(data.authToken);
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
    {/* {console.log("triggered")} */}
    { !isLogged &&
    <form>
        <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input autoComplete="off" type="email" className="form-control" name='email' id="email" onChange={handleChange} aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name='password' id="password" onChange={handleChange} placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary my-2" onClick={handleSubmit}>Submit</button>
    </form> }
    {authToken && 
    <div className="container">
        <div>
            <p>You have successfully Logged In, Please copy the token below and paste it in request</p>
             <div className='object-fit-contain' style={{"width":"300px","wordWrap": "break-word"}}>Authentication Token : {authToken}</div>
        </div>
    </div> }
    </>
  )
}