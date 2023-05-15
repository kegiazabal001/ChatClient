import React, { useState } from 'react';
import Login from './components/Login.js';
import Chat from './components/Chat.js';
import Register from './components/Register.js';
//import UserSearch from '../UserSearch.js';
import './App.css';

const App = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState({user: null, logged: false});
  const [choice, setChoice] = useState(0); // 0 = login, 1 = register, 2 = chat
  //localStorage session

  const handleLogin = (username, aukera) => {
    if (aukera === 0) {
      localStorage.setItem('session', username);
      setChoice(2);
    } else {
      setChoice(1);
    }
  };

  const handleLogout = (auk) => {
    localStorage.removeItem('session');
    setChoice(0);
};

  const handleRegister = () => {
    setChoice(0);
  };

  return (
    <div className="app-container">
      {
        choice === 1 ? (
          <Register handleRegister={handleRegister} />
        ) : (choice === 2 && localStorage.getItem('session') !== null) ? (
          <>
            <p>{localStorage.getItem('session')}</p>
            <Chat handleLogout={handleLogout} />
          </>
        ) : (
          <>
            {localStorage.getItem('session') !== null ? setChoice(2) : null}
            <Login handleLogin={handleLogin} />
          </>
        )
      }
    </div>
  );
};

export default App;


/*
<div className="app-container">
      {!isLoggedIn ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <div className="chat-container">
          <div className="left-container">
            <UserList recentUsers={filteredUserList} handleUserClick={handleUserClick} />
          </div>
          <div className="right-container">
            <Chat selectedUser={selectedUser} handleLogout={handleLogout} />
          </div>
        </div>
      )}
    </div>
*/