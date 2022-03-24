import { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { loginCall } from '../ApiCall';
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../context/hooks";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user,isLoading,isError,dispatch} = useAuth();
  let navigate = useNavigate();
  let path;
  const handleClick = async (e) => {
    e.preventDefault();
    await loginCall({ email, password }, dispatch);
    path = '/chat';
    navigate(path);
    // if (user.isAdmin) {
    //   path = '/admin';
    //   navigate(path);
    // } else {
    //   path = '/chat';
    //   navigate(path);
    // }
  }

  return (

    <form className="container py-5 h-100" onSubmit={handleClick}>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">ĐĂNG NHẬP</h2>
                <p className="text-white-50 mb-5">{isError ? "co loi" : "Điền email và mật khẩu để đăng nhập !"}</p>
                <div className="form-outline form-white mb-4">
                  <input type="email" placeholder='Email' className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-outline form-white mb-4">
                  <input type="password" placeholder='password' className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />

                </div>
                <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Quên mật khẩu?</a></p>
                <button variant="primary" type="submit" className="btn btn-outline-light btn-lg px-5" >Đăng Nhập</button>
              </div>
              <div>
                <p className="mb-0">{isLoading ? 'Dang load' : 'Chưa có tài khoản?'} <Link to="/register" className="text-white-50 fw-bold">Đăng Ký</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}



export default LoginForm;
