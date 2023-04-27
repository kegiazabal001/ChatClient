import React, {useState} from 'react';
import './Chat.css';
import man1 from './img/man1.png';
import man2 from './img/man2.png';
import db from './db/db.json';

function Message({ sender, msg, time }) {
    // variable for div className
    let icon = sender ? man1 : man2;
    let className = sender ? "container darker" : "container";
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

/*
class Conversation{
    constructor(props) {
        //mezuen id-a jartzeko uuid erabiltzeko pendiente (opcional, kuriositatekoa)
        //https://www.npmjs.com/package/uuid
        this.counter = 4;
        this.state = { messages: [
            {id: 1, sender: false, msg: "Hello. How are you today?", time: "11:00"},
            {id: 2, sender: true, msg: "Hey! I'm fine. Thanks for asking!", time: "11:01"},
            {id: 3, sender: false, msg: "Sweet! So, what do you wanna do today?", time: "11:02"},
            {id: 4, sender: true, msg: "Nah, I dunno. Play soccer.. or learn more coding perhaps?", time: "11:05"}
        ]};
    }

    addMessage = (sender, message) => {
        let id = this.counter++;
        this.state.messages.push({id: { id }, sender: sender==="man1" ? true : false, msg: message, time: "11:05"});
        
       alert('A message was submitted: ' + message + ' ' + this.counter);
    }

    printMessages = () => {
        return (
            <div>
                {this.state.messages.map((message) => (
                    <li key={message.id}>
                        <Message sender={message.sender} msg={message.msg} time={message.time} />
                    </li>
                ))}
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.state.messages.map((message) => (
                    <li key={message.id}>
                        <Message sender={message.sender} msg={message.msg} time={message.time} />
                    </li>
                ))}
            </div>
        );
    }
}
*/

function Chat() {
    const [messages, setMessages] = useState([
        {id: 0, sender: false, msg: "Hello. How are you today?", time: "11:00"},
        {id: 1, sender: true, msg: "Hey! I'm fine. Thanks for asking!", time: "11:01"},
        {id: 2, sender: false, msg: "Sweet! So, what do you wanna do today?", time: "11:02"},
        {id: 3, sender: true, msg: "Nah, I dunno. Play soccer.. or learn more coding perhaps?", time: "11:05"}
    ]);
    let counter = 3;

    function addMessage(sender, message, t) {
        let id = counter++;
        let newMessage = {id: { id }, sender: sender==="man1" ? true : false, msg: message, time: t };
        setMessages([...messages, newMessage]);
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
    
        handleSubmit(event) {
            //const data = JSON.stringify(db)
            let date = new Date();
            let time = date.getHours() + ":" + date.getMinutes();
            addMessage("man1", this.state.message, time);
        }
    
        render() {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Message:
                    <input type="text" value={this.state.message} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            );
        }
    }
  
    return (
        <>
            <h1>Chat Messages</h1>
            {messages.map((message) => (
                <li key={message.id}>
                    <Message sender={message.sender} msg={message.msg} time={message.time} />
                </li>
            ))}
            < MessageForm />
        </>
    );
}

export default Chat;