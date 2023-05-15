import React from 'react';
import './style/Login.css';



function Login({handleLogin}) { 
    class LoginForm extends React.Component {
        constructor(props) {
            super(props);
            
            this.state = {username: '', password: '', loggedIn: false};
    
            this.handleUsernameChange = this.handleUsernameChange.bind(this);
            this.handlePasswordChange = this.handlePasswordChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        handleUsernameChange = (event) => {
            this.setState({username: event.target.value});
        };
        
        handlePasswordChange = (event) => {
            this.setState({password: event.target.value});
        };
    
        async handleSubmit(event) {
            //alert('A name was submitted: ' + this.state.username + '  ' + this.state.password);
            event.preventDefault();
            const { username, password } = this.state;
            await fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
              }).then(response => response.json()).then(data => {
                if (data.message === 'ok') {
                    this.setState({loggedIn: true});
                    handleLogin(username, 0);
                } else {
                    document.querySelector('.error').innerHTML = data.message;
                }
                //this.setState({loggedIn: true});
            })
        }
        
        handleRegister = (e) => {
            e.preventDefault();
            handleLogin(1);
        };
        
    
        render() {
            return (
                <>
                    <div className="container">
                        <form onSubmit={this.handleSubmit} className='form'>
                            <label>Login</label>
                            <input type="text" id='username' value={this.state.username} onChange={this.handleUsernameChange} placeholder='Username' required/>
                            <input type="password" id='password' value={this.state.password} onChange={this.handlePasswordChange} placeholder='Password'required/>
                            <p className='error'></p>
                            <button type="submit"> Login </button>
                            <div className="form-footer">
                                Don't have an account yet? <button onClick={this.handleRegister}>Register</button>
                            </div>
                        </form>
                    </div>
                </>
            );
        }
    }
    return (
        <>
            <LoginForm />
        </>
    );
}

export default Login;