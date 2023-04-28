import React, {useState} from 'react';
import './Chat.css';
import man1 from './img/man1.png';
import man2 from './img/man2.png';

function Message({ sender, msg, time }) {
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
                    <input type="text" value={this.state.message} onChange={this.handleChange} placeholder='Message'/>
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