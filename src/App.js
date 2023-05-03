import logo from './logo.svg';
import './App.css';
import Chat from './component/Chat';
import Login from './component/Login';
import Register from './component/Register';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router';

function App() {
  return (
    <>
      <div>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/chat">
          < Chat />
        </Route>
        <Route path="/">
          {history.push('/register')}
        </Route>
      </Switch>
    </div>
      
    </>
    
  );
}

export default App;

/*


<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <body className='App-body'>
          < Register />
          < Login />
          < Chat />
        </body>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
*/