import { useRef, useState } from "react";
import { Link } from 'react-router-dom'
import { Container, Button, Row, Col, Form, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [password, setPassword] = useState('');
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);
  const [messageEmail, setMessageEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  let navigate = useNavigate();
  axios.defaults.baseURL = "http://localhost:5000";
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const handleClick = async () => {
    if (!email || !password) {
      setIsError(true);
      return;
    } else {
      try {
        const { data } = await axios.post(
          "/api/auth/register",
          { email, password, first_name: firstName, last_name: lastName },
          config
        );
        setOpen(true);
        let path = "/";
        navigate(path);
      } catch (error) {
        setIsError(true);
        let path = "/";
        navigate(path);
      }
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //first name
  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  }
  const checkValidFirstName = () => {
    if (firstName == '') {
      setValidFirstName(false);
    } else {
      setValidFirstName(true);
    }
  }

  //last name
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  }
  const checkValidLastName = () => {
    if (lastName == '') {
      setValidLastName(false);
    } else {
      setValidLastName(true);
    }
  }

  //email

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const checkValidEmail = () => {
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email == '' || !regexEmail.test(email)) {
      setValidEmail(false);
      setMessageEmail('Vui lòng nhập đúng định dạng email');
    } else {
      setValidEmail(true);
    }
  }

  //password
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const checkValidPassword = () => {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (password == '' || !regexPassword.test(password)) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  }

  //confirm password
  const onChangeConfirmPassword = (e)=>{
    setConfirmpassword(e.target.value);
  }
  const checkValidConfirmPassword = ()=>{
    if(confirmpassword != password){
      setValidConfirmPassword(false);
    }else{
      setValidConfirmPassword(true);
    }
  }


  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Tạo tài khoản thành công, kiểm tra email để xác thực tài khoản!
                  </Alert>
                </Snackbar>
                <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Tạo tài khoản không thành công, vui lòng thử lại!
                  </Alert>
                </Snackbar>
                <h2 className="fw-bold mb-2 text-uppercase">ĐĂNG KÝ</h2>
                <p className="text-white-50 mb-5">Điền thông tin tài khoản!</p>
                <form onSubmit={handleClick}>
                  <div className="form-outline form-white">
                    <input
                      type="text"
                      placeholder='Họ'
                      className="form-control form-control-lg"
                      value={lastName} onChange={onChangeLastName} onBlur={checkValidLastName} />
                    <span hidden={validLastName} className="my-4 text-danger text-start">Họ không được để trống</span>
                  </div>
                  <div className="form-outline form-white mt-3">
                    <input
                      type="text"
                      placeholder='Tên'
                      className="form-control form-control-lg"
                      value={firstName} onChange={onChangeFirstName} onBlur={checkValidFirstName} />
                    <span hidden={validFirstName} className="my-4 text-danger text-start">Tên không được để trống</span>
                  </div>
                  <div className="form-outline form-white mt-3">
                    <input
                      type="email"
                      placeholder='Email'
                      className="form-control form-control-lg"
                      value={email} onChange={onChangeEmail} onBlur={checkValidEmail} />
                    <span hidden={validEmail} className="my-4 text-danger text-start">{messageEmail}</span>
                  </div>
                  <div className="form-outline form-white mt-3">
                    <input
                      type="password"
                      placeholder='Password'
                      className="form-control form-control-lg"
                      value={password} onChange={onChangePassword} onBlur={checkValidPassword} />
                    <span hidden={validPassword} className="my-4 text-danger text-start">Mật khẩu ít nhất 8 kí tự, gồm số chữ và kí tự viết hoa</span>
                  </div>
                  <div className="form-outline form-white mt-3">
                    <input
                      type="password"
                      placeholder='Nhập lại password'
                      className="form-control form-control-lg"
                      value={confirmpassword} onChange={onChangeConfirmPassword} onBlur={checkValidConfirmPassword} />
                      <span hidden={validConfirmPassword} className="my-4 text-danger text-start">Không trùng với mật khẩu</span>
                  </div>
                  <input className="btn btn-outline-light btn-lg px-5 mt-3" type='submit' value='Đăng ký' />
                </form>
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