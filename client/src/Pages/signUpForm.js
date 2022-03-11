import { useState } from "react";
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate(); 
  axios.defaults.baseURL = "http://localhost:5000";
  const handleClick = async ()=>{
    if(!email || !password){
      alert('....');
    }else{
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/auth/register",
          { email, password,first_name:firstName,last_name:lastName },
          config
        );
        alert('Kiểm tra email để xác thực tài khoản');
        let path = "/"; 
        navigate(path);
      } catch (error) {
        console.log(error);
      }
    }
  }

    return (
      <Container>
        <h1>Register</h1>
        <Row>
          <Col lg={8}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Ho</Form.Label>
                <Form.Control type="text" placeholder="Enter Ho" onChange={(e) => setLastName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ten</Form.Label>
                <Form.Control type="text" placeholder="Enter ten" onChange={(e) => setFirstName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password lan 2</Form.Label>
                <Form.Control type="password" placeholder="Password 2" onChange={(e) => setConfirmpassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" onClick={handleClick} >
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

export default SignUpForm;