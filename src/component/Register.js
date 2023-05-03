import React, { useState } from "react";
import "./style/Chat.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, email, password };

    alert("A name was submitted: " + newUser.username + "  " + newUser.email + "  " + newUser.password);
    //setUsername("");
    //setEmail("");
    //setPassword("");
    history.push('/login');
  };

  return (
    <>
        <div className="container">
            <br/>
            <form onSubmit={handleSubmit} className="form">
                <h1>Register</h1>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="form-footer">
                    Already have an account? <a href="/login">Log in</a>
                </div>
                <button className="form-submit" type="submit">Register</button>
            </form>
            <br/>
        </div>
    </>
  );
}

export default Register;