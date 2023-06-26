import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ece5dd;
`;

const Title = styled.h1`
  font-size: 26px;
  color: #444;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border-radius: 20px;
  padding: 10px;
  border: none;
  margin-bottom: 20px;
  width: 300px;
`;

const Button = styled.button`
  background-color: #128C7E;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px;
  width: 320px;
  font-size: 20px;
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: red;
`;

function EnterPhoneNumber() {
  const [recipientNumber, setNumber] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (recipientNumber.trim() === '') {
      setError('Recipient number is required!');
      return;
    }

    setError(null);
    localStorage.setItem('recipientNumber', recipientNumber);
    navigate('/chat');
  };

  return (
    <Container>
      <Title>Введите номер телефона</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={recipientNumber}
          onChange={handleNumberChange}
          placeholder="Recipient's phone number"
        />
        <Button type="submit">Создать чат</Button>
        {error && <ErrorText>{error}</ErrorText>}
      </Form>
    </Container>
  );
}

export default EnterPhoneNumber;
