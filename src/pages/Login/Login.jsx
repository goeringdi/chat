import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ece5dd;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 20px;
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
const Title = styled.h1`
  font-size: 26px;
  color: #444;
`;

function LoginPage() {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleIdChange = (event) => {
    setIdInstance(event.target.value);
  };

  const handleTokenChange = (event) => {
    setApiTokenInstance(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (idInstance.trim() === '' || apiTokenInstance.trim() === '') {
      setError('Both fields are required!');
      return;
    }

    setError(null);
    localStorage.setItem('idInstance', idInstance);
    localStorage.setItem('apiTokenInstance', apiTokenInstance);
    navigate('/enterPhoneNumber');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Введите ваши данные</Title>
      <Label>
        Instance ID: 
        <Input type="text" value={idInstance} onChange={handleIdChange} />
      </Label>
      <Label>
        API Token: 
        <Input type="text" value={apiTokenInstance} onChange={handleTokenChange} />
      </Label>
      <Button type="submit">Войти</Button>
      {error && <ErrorText>{error}</ErrorText>}
    </Form>
  );
}

export default LoginPage;
