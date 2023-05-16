import React, {useState, useEffect} from 'react';
import './style/Chat.css';
import UserList from './UserList.js';
import Follow from './Follow.js';

function Chat({handleLogout}) {
    const loggedUser = localStorage.getItem('session');
    const [selectedUser, setSelectedUser] = useState(null);
    //selectedUser={selectedUser}
    
    const [friendList, setFriendList] = useState(null);

    const [showChat, setShowChat] = useState(3);

    function kargatu() {
        if (showChat === 1) {
            const messageList = document.getElementById('messageList');
            function scrollDown() {
                messageList.scrollTop = messageList.scrollHeight;
            }
            
            scrollDown();
            messageList.addEventListener('DOMSubtreeModified', scrollDown);
        }
    }

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
        handleLogout(0);
    }
    
    const [messages, setMessages] = useState([]);

    function Message({ sender, msg, time }) {
        //let icon = sender ? man1 : man2;
        let eskubi = sender===loggedUser;
        let className = eskubi ? "mezu darker" : "mezu lighter";
        //let imgClass = sender ? "right" : "";
      return (
        <div className='message'>
            <div className={className}>
                <p>{ msg }</p>
                <span className="time">{ time }</span>
            </div>
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
            const data = {
                username: loggedUser,
                friend: selectedUser,
                message: message
            };
            fetch('/api/newMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
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
    
        handleSubmit(event) {
            //const data = JSON.stringify(db)
            let date = new Date();
            let hours= date.getHours();
            let minutes = date.getMinutes();
            let time = (hours<10 ? "0"+hours : hours) + ":" + (minutes<10 ? "0"+minutes : minutes);
            event.preventDefault();
            let message = { sender: loggedUser, msg: this.state.message, time: time };
            this.newMessage(message);
            //addMessage(true, this.state.message, time);
        }
    
        render() {
            return (
                <form onSubmit={this.handleSubmit} className='messageForm'>
                    <label>
                        <input type="text" value={this.state.message} onChange={this.handleChange} placeholder='Message'/>
                    </label>
                    <input type="submit" value=">" />
                </form>
            );
        }
    }

    const handleUserClick = (userName) => {
        setShowChat(1);
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

    const addFriend = () => {
        setShowChat(0);
    }

    useEffect(() => {
        kargatu();
    }, [showChat]);

    return (
        <>
            <div className="cont">
                <nav>
                    <UserList recentUsers={friendList? friendList : []} handleUserClick={handleUserClick} />
                    <button onClick={addFriend} className='addFriendButton'>+</button>
                    <p className="error"></p>
                    <button onClick={logout} className='logout'>Logout</button>
                </nav>
                <main id='main'>
                    {
                        showChat === 0 ? (
                            <Follow logged={loggedUser} friends={friendList} />
                        ): showChat === 1 ?(
                            <>
                                <div className="chat">
                                    <h1>Chat Messages</h1>
                                    <h2>{selectedUser}</h2>
                                    <div id="messageList" className='messageList'>
                                        <p className="errorM"></p>
                                        <ul>
                                            {inprimatuMezuak().map((message) => (message))}
                                        </ul>
                                    </div>
                                    <MessageForm/>
                                </div>
                            </>
                        ) : (
                            <h1>Select a friend to chat</h1>
                        )
                    }
                </main>
            </div>
        </>
    );
}

export default Chat;