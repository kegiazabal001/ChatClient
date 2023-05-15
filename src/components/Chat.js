import React, {useState, useEffect} from 'react';
import './style/Chat.css';
import man1 from './img/man1.png';
import man2 from './img/man2.png';
//import man3 from './img/man3.png';
//import woman1 from './img/woman1.png';
//import woman2 from './img/woman2.png';
import UserList from './UserList.js';

function Message({ sender, msg, time }) {
    let icon = sender ? man1 : man2;
    let className = sender ? "container2 darker" : "container2";
    let imgClass = sender ? "right" : "";
    let timeClass = sender ? "time-left" : "time-right";
  return (
    <div className={className}>
        <img src={ icon } alt="Avatar" className={imgClass}/>
        <p>{ msg }</p>
        <span className={timeClass}>{ time }</span>
    </div>
  );
}


function Chat() {

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
    
        handleSubmit(event) {
            //const data = JSON.stringify(db)
            let date = new Date();
            let time = date.getHours() + ":" + date.getMinutes();
            addMessage(true, this.state.message, time);
        }
    
        render() {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                    <input type="text" value={this.state.message} onChange={this.handleChange} placeholder='Message'/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            );
        }
    }
    const [selectedUser, setSelectedUser] = useState(null);
    //selectedUser={selectedUser}
    
    const [userList, setUserList] = useState(null);

    useEffect(() => {
        getUsers();
      }, []);
    
    const getUsers = async () => {
        try {
            const response = await fetch("/api/users");
            const jsonData = await response.json();
            setUserList(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    const [messages, setMessages] = useState([
        {id: 0, sender: false, msg: "Hello. How are you today?", time: "11:00"},
        {id: 1, sender: true, msg: "Hey! I'm fine. Thanks for asking!", time: "11:01"},
        {id: 2, sender: false, msg: "Sweet! So, what do you wanna do today?", time: "11:02"},
        {id: 3, sender: true, msg: "Nah, I dunno. Play soccer.. or learn more coding perhaps?", time: "11:05"}
    ]);
    
    let counter = 3;

    const [searchQuery, setSearchQuery] = useState('');

    function addMessage(sndr, message, t) {
        let id = counter++;
        let newMessage = {id: { id }, sender: sndr, msg: message, time: t };
        setMessages([...messages, newMessage]);
    }

    const handleUserClick = (userId) => {
        setSelectedUser(userId);
    };

    if (!userList) {
        return <div>Loading...</div>;
    } else {
        console.log(userList);

        

        return (
            <>
                <h1>Chat Messages <img src={man1} width='30px' alt='man1'></img> </h1>
                <div className="cont">
                    <main>
                        <ul>
                            {messages.map((message) => (
                                <li key={message.id}>
                                    <Message sender={message.sender} msg={message.msg} time={message.time} />
                                </li>
                            ))}
                        </ul>
                        < MessageForm />
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
*/