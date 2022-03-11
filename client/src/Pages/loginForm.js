import React from 'react';
import {Link} from 'react-router-dom'
import {Container,Button,Row,Col,Form} from 'react-bootstrap'
const LoginForm = () => {
  return (
    <Container>
      <h1>Login</h1>
      <Row>
        <Col lg={8}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button >
              <Link to="/register" className="text-danger">Register</Link>
            </Button>
        </Form>
        </Col>
      </Row>
    </Container>
    
  )
}



export default LoginForm;

{/* <div className="form-container sign-in-container">
      <form action="#">
        <h1>Sign in</h1>
       
        <span>or use your account</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button className="ghost" id="signIn">Sign In</button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button className="ghost" >Sign Up</button>
        </div>
      </div>
    </div> */}