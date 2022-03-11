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
      // <Container>
      //   <h1>Register</h1>
      //   <Row>
      //     <Col lg={8}>
      //       <Form>
      //         <Form.Group className="mb-3">
      //           <Form.Label>Ho</Form.Label>
      //           <Form.Control type="text" placeholder="Enter Ho" onChange={(e) => setLastName(e.target.value)} />
      //         </Form.Group>
      //         <Form.Group className="mb-3">
      //           <Form.Label>Ten</Form.Label>
      //           <Form.Control type="text" placeholder="Enter ten" onChange={(e) => setFirstName(e.target.value)} />
      //         </Form.Group>
      //         <Form.Group className="mb-3">
      //           <Form.Label>Email address</Form.Label>
      //           <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
      //         </Form.Group>
      //         <Form.Group className="mb-3">
      //           <Form.Label>Password</Form.Label>
      //           <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      //         </Form.Group>
      //         <Form.Group className="mb-3">
      //           <Form.Label>Password lan 2</Form.Label>
      //           <Form.Control type="password" placeholder="Password 2" onChange={(e) => setConfirmpassword(e.target.value)} />
      //         </Form.Group>
      //         <Button variant="primary" onClick={handleClick} >
      //           Register
      //         </Button>
      //         <Button >
      //           <Link to="/" className="text-danger">Login</Link>
      //         </Button>
      //       </Form>
      //     </Col>
      //   </Row>
      // </Container>
      <div className="container py-5 h-100">
     <div className="row d-flex justify-content-center align-items-center h-100">
       <div className="col-12 col-md-8 col-lg-6 col-xl-5">
         <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
           <div className="card-body p-5 text-center">
             <div className="mb-md-5 mt-md-4 pb-5">
               <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
               <p className="text-white-50 mb-5">Please enter your information!</p>
               <div className="form-outline form-white mb-4">
                 <input type="text" placeholder='Họ' className="form-control form-control-lg" />
                
               </div>
               <div className="form-outline form-white mb-4">
                 <input type="text" placeholder='Tên' className="form-control form-control-lg" />
                
               </div>
               <div className="form-outline form-white mb-4">
                 <input type="tel" placeholder='Số điện thoại' className="form-control form-control-lg"  />
                
               </div>
               <div className="form-outline form-white mb-4">
                 <input type="email" placeholder='Email' className="form-control form-control-lg"  />
                
               </div>
               <div className="form-outline form-white mb-4">
                 <input type="password" placeholder='Password' className="form-control form-control-lg"  />
                
               </div>
               <button className="btn btn-outline-light btn-lg px-5" type="submit">Sign up</button>
             </div>
             <div>
               <p className="mb-0">Have an account? <a href="#!" className="text-white-50 fw-bold">Sign in</a></p>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
    );
  
}

export default SignUpForm;