import React, { useState, useEffect } from "react";
import UserList from "./userlist";
import Header from "./header";
import "./App.css"

// Define tokens for admin and user
const adminToken = "admin-token";
const userToken = "user-token";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // On form submit, validate credentials and set token
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("token", adminToken); // Set admin token
      handleLogin("admin");
    } else if (email === "vinayaka2025@byc.com" && password === "password") {
      localStorage.setItem("token", userToken); // Set user token
      handleLogin("user");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};


const App = () => {
  const [loggedInAs, setLoggedInAs] = useState(null);

  // Check for token in localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === adminToken) {
      setLoggedInAs("admin");
    } else if (token === userToken) {
      setLoggedInAs("user");
    }
  }, []);

  const handleLogin = (role) => {
    setLoggedInAs(role);
  };

  // Function to handle logout and clear the token
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setLoggedInAs(null);
  };

  return (
    <div>
      <Header isLoggedIn={loggedInAs}/>
      {!loggedInAs ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <div className="px-3">

          {/* Render your UserList or Admin Panel based on role */}
          <UserList/>
        </div>
      )}
    </div>
  );
};

export default App;
