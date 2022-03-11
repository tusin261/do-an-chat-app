import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Container,Button,Row,Col,Form} from 'react-bootstrap'

class SignUpForm extends Component {
    render() {
        return (
            <Container>
      <h1>Register</h1>
      <Row>
        <Col lg={8}>
          <Form>
          <Form.Group className="mb-3">
              <Form.Label>Ho</Form.Label>
              <Form.Control type="text" placeholder="Enter Ho" />              
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ten</Form.Label>
              <Form.Control type="text" placeholder="Enter ten" />              
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />              
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password lan 2</Form.Label>
              <Form.Control type="password" placeholder="Password 2" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Register
            </Button>
            <Button >
              <Link to="/" className="text-danger">Login</Link>
            </Button>
        </Form>
        </Col>
      </Row>
    </Container>
        );
    }
}

export default SignUpForm;