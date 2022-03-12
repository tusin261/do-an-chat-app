import { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {loginCall} from '../ApiCall';
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();
  const {isFetching,error,dispatch,user} = useContext(AuthContext);
  const handleClick = async (e) => {
    e.preventDefault();
    loginCall({email,password},dispatch)
    
        // let path = "/chat";
        // navigate(path);
    
  }
  console.log(user);

  return (
    <form className="container py-5 h-100" onSubmit={handleClick}>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">ĐĂNG NHẬP</h2>
                <p className="text-white-50 mb-5">Điền email và mật khẩu để đăng nhập !</p>
                <div className="form-outline form-white mb-4">
                  <input type="email" placeholder='Email' className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div className="form-outline form-white mb-4">
                  <input type="password" placeholder='password' className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />

                </div>
                <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Quên mật khẩu?</a></p>
                <button variant="primary" type="submit" className="btn btn-outline-light btn-lg px-5" >Đăng Nhập</button>
              </div>
              <div>
                <p className="mb-0">Chưa có tài khoản? <Link to="/register" className="text-white-50 fw-bold">Đăng Ký</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}



export default LoginForm;
