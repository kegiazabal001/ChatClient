import React, {useState, useEffect} from 'react';
import './style/Chat.css';
import man1 from './img/man1.png';
import man2 from './img/man2.png';
//import man3 from './img/man3.png';
//import woman1 from './img/woman1.png';
//import woman2 from './img/woman2.png';
import UserList from './UserList.js';

function Chat({handleLogout, loggedUser}) {

    const [selectedUser, setSelectedUser] = useState(null);
    //selectedUser={selectedUser}
    
    const [friendList, setFriendList] = useState(null);

    useEffect(() => {
        getUsers();
      }, []);
    
    const getUsers = async () => {
        try {
            const response = await fetch("/api/friends/" + loggedUser);
            const data = await response.json();
            if (data.message === "ok") {
                setFriendList(data.friends);
                
            } else {
                document.querySelector(".error").innerHTML = data.message;
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const getMessages = async (friendName) => {
        try {
            const response = await fetch("/api/messages/" + loggedUser + "/" + friendName);
            const data = await response.json();
            if (data.message === "ok") {
                setMessages(data.messages);
                document.querySelector(".errorM").innerHTML = "";
            } else {
                setMessages([]);
                document.querySelector(".errorM").innerHTML = data.message;
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const logout = () => {
        handleLogout();
    }
    
    const [messages, setMessages] = useState([]);

    function Message({ sender, msg, time }) {
        //let icon = sender ? man1 : man2;
        let className = sender===loggedUser ? "container2 darker" : "container2";
        //let imgClass = sender ? "right" : "";
        let timeClass = sender===loggedUser ? "time-left" : "time-right";
      return (
        <div className={className}>
            <p>{ msg }</p>
            <span className={timeClass}>{ time }</span>
        </div>
      );
      //<img src={ icon } alt="Avatar" className={imgClass}/>
    }

    class MessageForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {message: ''};
    
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        handleChange(event) {
            this.setState({message: event.target.value});
        }

        newMessage = (message) => {
            fetch('api/newMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loggedUser, selectedUser, message),
                }).then(response => response.json()).then(data => {
                    console.log(data);
                    if (data.message === "ok") {
                        document.querySelector(".errorM").innerHTML = "";
                        getMessages(selectedUser);
                    } else {
                        document.querySelector(".errorM").innerHTML = data.message;
                    }
                });

        }

        /*
        sender
            "a"
            msg
            "Hello World!"
            time
            "12:00"
        */
    
        handleSubmit(event) {
            //const data = JSON.stringify(db)
            let date = new Date();
            let time = date.getHours() + ":" + date.getMinutes();
            event.preventDefault();
            let message = { sender: loggedUser, msg: this.state.message, time: time };
            console.log(message);
            this.newMessage(message);
            //addMessage(true, this.state.message, time);
        }
    
        render() {
            return (
                <form onSubmit={this.handleSubmit} className='messageForm'>
                    <label>
                        <input type="text" value={this.state.message} onChange={this.handleChange} placeholder='Message'/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            );
        }
    }
    
    //let counter = 3;

    //const [searchQuery, setSearchQuery] = useState('');
    /*
    function addMessage(sndr, message, t) {
        let id = counter++;
        let newMessage = {id: { id }, sender: sndr, msg: message, time: t };
        setMessages([...messages, newMessage]);
    }
    */

    const handleUserClick = (userName) => {
        setSelectedUser(userName);
        getMessages(userName);
    };

    const inprimatuMezuak = () => {
        let mezuak = [];
        for (let i = 0; i < messages.length; i++) {
            mezuak.push(<li key={i}><Message sender={messages[i].sender} msg={messages[i].msg} time={messages[i].time} /></li>);
        }
        return mezuak;
    }

    if (!friendList) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <h1>Chat Messages <img src={man1} width='30px' alt='man1'></img> </h1>
                <div className="cont">
                    <nav>
                        <UserList recentUsers={friendList} handleUserClick={handleUserClick} />
                        <button onClick={logout}>Logout</button>
                        <p className="error"></p>
                    </nav>
                    <main>
                        <p className="errorM"></p>
                        <ul>
                            {inprimatuMezuak().map((message) => (message))}
                        </ul>
                        <MessageForm/>
                    </main>
                </div>
            </>
        );
    }
}

export default Chat;

/*

            const filteredUserList = userList.filter((user) =>{
                    console.log(user);
                    user.username.toLowerCase().includes(searchQuery.toLowerCase())
                }
            );

                    <nav>
                        <UserList recentUsers={filteredUserList} handleUserClick={handleUserClick} />
                    </nav>

                            {messages.map((message) => (
                                <li key={message}>
                                    <Message sender={message.sender} msg={message.msg} time={message.time} />
                                </li>
                            ))}
*/