import React, { useState } from "react";
import { useNavigate  } from 'react-router-dom'
export default function Signup() {

    const [credentials,setCredentials] = useState({
        username:"",
        email:"",
        password:""
    })

    const [success,setSuccess] = useState(false)
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payLoad = {
            "name":credentials.username,
            "email":credentials.email,
            "password":credentials.password
        }
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(payLoad),
            });
            console.log("reponse=>",response)
            if(response.ok) {
                // const data = await response.json();
                setSuccess(true)
                navigate("/")
            } else {
                console.log("Please enter the correct credentials idk")
            }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        })

    }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Enter your username"
          name="username"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Submit
      </button>
    </form>
  );
}
