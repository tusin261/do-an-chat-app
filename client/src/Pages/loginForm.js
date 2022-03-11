import { useState } from "react";
import {Link} from 'react-router-dom'
import {Container,Button,Row,Col,Form} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [email, setEmail] = useState();
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
          "/api/auth/login",
          { email, password},
          config
        );
        console.log(data);
        let path = "/chat"; 
        navigate(path);
      } catch (error) {
        console.log(error);
        alert('Sai email hoac mat khau');
      }
    }
  }

  return (
    // <Container>
    //   <h1>Login</h1>
    //   <Row>
    //     <Col lg={8}>
    //       <Form>
    //         <Form.Group className="mb-3" >
    //           <Form.Label>Email address</Form.Label>
    //           <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />              
    //         </Form.Group>
    //         <Form.Group className="mb-3" >
    //           <Form.Label>Password</Form.Label>
    //           <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
    //         </Form.Group>
            
    //         <Button variant="primary" onClick={handleClick}>
    //           Login
    //         </Button>
    //         <Button >
    //           <Link to="/register" className="text-danger">Register</Link>
    //         </Button>
    //     </Form>
    //     </Col>
    //   </Row>
    // </Container>
     <div className="container py-5 h-100">
     <div className="row d-flex justify-content-center align-items-center h-100">
       <div className="col-12 col-md-8 col-lg-6 col-xl-5">
         <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
           <div className="card-body p-5 text-center">
             <div className="mb-md-5 mt-md-4 pb-5">
               <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
               <p className="text-white-50 mb-5">Please enter your login and password!</p>
               <div className="form-outline form-white mb-4">
                 <input type="email" placeholder='Email' className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} />
                
               </div>
               <div className="form-outline form-white mb-4">
                 <input type="password" placeholder='password' className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />
                
               </div>
               <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
               <button variant="primary" onClick={handleClick} className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
             </div>
             <div>
               <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
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