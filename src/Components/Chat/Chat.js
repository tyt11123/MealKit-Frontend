import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from '../TextContainer/TextContainer';

import './Chat.css';


let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        // socket= io.connect('https://localhost:5000',)
        setName(name);
        setRoom(room);
      

        socket.emit('join', { name, room }, () => {
            
        });

        // return () => {
        //     socket.emit('disconnect');
        //     socket.off();
        // }
    }, [ENDPOINT, location.search]);
    
    useEffect(() => {
        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        });
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, []);
 
    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));

        }
    }
        return (
            <div className="outerContainer">
                <div className="chat-container">
                    <InfoBar room={room} />
                    <Messages messages={messages} name={name}/>
                  <Input mesage={message} setMessage={setMessage} sendMessage={sendMessage}></Input>
                </div>
                <TextContainer users={users}/>
           </div>
    )
    
}

export default Chat;