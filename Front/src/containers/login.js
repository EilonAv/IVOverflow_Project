import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


//creating the page template
const Login = function() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//making sure to allow clicking the login button only after email and password inserted
  const validateForm = function () {
    return email.length > 0 && password.length > 3;
  }
  //navigating between components instance
  const navigate = useNavigate();


//handeling the login( submit ) button
  function handleSubmit(event) {
    //preventing refresh upon bad click
    event.preventDefault();
    //contacting backend
    axios.post('http://localhost:80/login', {
    email    : email,
    password : password
    })
    //using the response object to save email and jwt on local storage for later validation 
  .then(res => {
      console.log(res);
      window.localStorage.setItem('email',email);
      window.localStorage.setItem('jwt',res.data.jwtoken.toString());
      setEmail('');
      setPassword('');
      navigate('/');
  })

  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <img src ="https://cdn.pixabay.com/photo/2019/04/03/08/24/waterworks-4099766_960_720.jpg" alt="../../logo192.png" className="loginLogo"></img>
        <h1>IVOverflow</h1>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button size="lg" className="submit_button" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;