import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #ece5dd;
  min-height: 100vh;
  box-sizing: border-box;
`;


const MessageBubble = styled.div`
  max-width: 60%;
  background: ${props => props.sender ? '#DCF8C6' : '#FFFFFF'};
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  align-self: ${props => props.sender ? 'flex-end' : 'flex-start'};
  border: ${props => props.sender ? '1px solid #DCF8C6' : '1px solid #ECECEC'};
  display: inline-block;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  border-radius: 20px;
  padding: 10px;
  border: none;
  margin-right: 10px;
  width: 600px;
`;

const MessageSendButton = styled.button`
  background-color: #128C7E;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px;
  width: 120px;
`;
const MessageForm = styled.form`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

  const idInstance = localStorage.getItem('idInstance');
  const apiTokenInstance = localStorage.getItem('apiTokenInstance');
  const recipientNumber = localStorage.getItem('recipientNumber');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (message.trim() === '') {
      return;
    }
  
    const result = await fetch(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId: `${recipientNumber}@c.us`, message })
    });
  
    if (!result.ok) {
      return;
    }
  
    const newMessage = {
      sender: "you",
      text: message,
    };
  
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage];
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  
    setMessage('');
    getMessages();
  };
  
  const getMessages = async () => {
    const result = await fetch(`https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);
    const data = await result.json();
  
    // Если data равно null, просто верните функцию
    if (!data) {
      return;
    }
  
    const receiptId = data.receiptId;
    await fetch(`https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`, {
      method: 'DELETE'
    });
  
    // Если messageData или textMessageData не существуют, просто верните функцию
    if (!data.body.messageData || !data.body.messageData.textMessageData) {
      return;
    }
  
    const newMessage = {
      sender: data.body.senderData.senderName,
      text: data.body.messageData.textMessageData.textMessage,
    };
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage];
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      return updatedMessages;
    });
    
  };
  
  
  useEffect(() => {
    getMessages();

    const intervalId = setInterval(() => {
      getMessages();
    }, 3000);  

    return () => clearInterval(intervalId);  
  }, []);
  

  return (
    <ChatContainer>
      {messages.map((message, index) => (
        <MessageBubble key={index} sender={message.sender === 'you'}>
          {message.text}
        </MessageBubble>
      ))}
      <MessageForm onSubmit={handleSubmit}>
        <MessageInput value={message} onChange={handleInputChange} placeholder="Введите сообщение" />
        <MessageSendButton type="submit">Отправить</MessageSendButton>
      </MessageForm>
    </ChatContainer>
  );
};

export default Chat;
