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
          "/api/auth/register",
          { email, password, first_name: firstName, last_name: lastName },
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
  const checkEqualPassword = (e) =>{
    console.log(e.target.value);
  }

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">ĐĂNG KÝ</h2>
                <p className="text-white-50 mb-5">Điền thông tin tài khoản!</p>
                <div className="form-outline form-white mb-4">
                  <input type="text" placeholder='Họ' className="form-control form-control-lg" onChange={(e) => setLastName(e.target.value)} />

                </div>
                <div className="form-outline form-white mb-4">
                  <input type="text" placeholder='Tên' className="form-control form-control-lg" onChange={(e) => setFirstName(e.target.value)} />

                </div>
                <div className="form-outline form-white mb-4">
                  <input type="email" placeholder='Email' className="form-control form-control-lg" onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div className="form-outline form-white mb-4">
                  <input type="password" placeholder='Mật khẩu' className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-outline form-white mb-4">
                  <input type="password" placeholder='Nhập lại mật khẩu ...' className="form-control form-control-lg" onChange={checkEqualPassword} />
                </div>
                <button className="btn btn-outline-light btn-lg px-5" onClick={handleClick}>Đăng ký</button>
              </div>
              <div>
                <p className="mb-0">Đã có tài khoản? <Link to="/" className="text-white-50 fw-bold">Đăng nhập</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default SignUpForm;