import React from 'react';
import './style/Login.css';

function Login() {

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
    
        handleSubmit(event) {
            //const data = JSON.stringify(db)
            alert('A name was submitted: ' + this.state.username + '  ' + this.state.password);
        }
    
        render() {
            return (
                <>
                    <div className="container">
                        <form onSubmit={this.handleSubmit} className='form'>
                            <label>Login</label>
                            <input type="text" id='username' value={this.state.username} onChange={this.handleUsernameChange} placeholder='Usename' required/>
                            <input type="password" id='password' value={this.state.password} onChange={this.handlePasswordChange} placeholder='Password'required/>
                            <button type="submit"> Login </button>
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