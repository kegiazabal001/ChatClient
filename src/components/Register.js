import React, { useState } from "react";
//import { useHistory } from 'react-router';
import "./style/Login.css";

function Register({handleRegister}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  //const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, email, password };
    if (password !== password2) {
        document.querySelector(".error").innerHTML = "Passwords do not match";
        return;
    }
    fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    }).then(response => response.json()).then(data => {
        if (data.message === "ok") {
            handleRegister();
        } else {
            document.querySelector(".error").innerHTML = data.message;
        }
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <>
        <div className="container">
            <br/>
            <form onSubmit={handleSubmit} className="form">
                <h1>Register</h1>
                <p className="error"></p>
                <input
                    type="text"
                    placeholder="Enter username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Repeat password"
                    required
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <button className="form-submit" type="submit">Register</button>
                <div className="form-footer">
                    Already have an account? 
                    <button type="text" onClick={handleLogin}>Login</button>
                </div>
            </form>
            <br/>
        </div>
    </>
  );
}

export default Register;