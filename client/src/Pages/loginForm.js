import { useState } from "react";
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();
  axios.defaults.baseURL = "http://localhost:5000";
  const handleClick = async () => {
    if (!email || !password) {
      alert('....');
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/auth/login",
          { email, password },
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
    <div className="container py-5 h-100">
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
                <button variant="primary" onClick={handleClick} className="btn btn-outline-light btn-lg px-5" type="submit">Đăng Nhập</button>
              </div>
              <div>
                <p className="mb-0">Chưa có tài khoản? <Link to="/register" className="text-white-50 fw-bold">Đăng Ký</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default LoginForm;
