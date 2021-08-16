import React from 'react';

import './Input.css';

const Input = ({ message,setMessage, sendMessage }) => (
    <form className="form">
        <input className="input" type="text" placeholder="type a message"
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
        >
        </input>
        <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
    </form>


)

export default Input;