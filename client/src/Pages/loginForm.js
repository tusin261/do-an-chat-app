import { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { loginCall } from '../ApiCall';
import { useAuth } from "../context/hooks";
import CircularProgress from '@mui/material/CircularProgress';
import * as API from '../constants/ManageURL'
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, isLoading, isError, dispatch } = useAuth();
  const [disable, setDisable] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  let navigate = useNavigate();
  let path;
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(API.LOGIN);
    //setDisable(true);
    if (email == '' || password == '') {
      setErrorInput(true);
      return;
    }
    await loginCall({ email, password }, dispatch);
    // path = '/chat';
    // navigate(path);
    navigate('/handle-redirect');

  }


  return (

    <form className="container py-3 h-100" onSubmit={handleClick}>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4">
                <h2 className="fw-bold mb-2 text-uppercase">ĐĂNG NHẬP</h2>
                <p className="text-white-50 mb-5">Điền email và mật khẩu để đăng nhập !</p>
                <div className="form-outline form-white">
                  <input type="email" placeholder='Email' className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mt-2 mb-2">
                  {errorInput && <span className="text-danger">Vui lòng điền trường này</span>}
                  {isError && <span className="text-danger">Sai tài khoản hoặc mật khẩu</span>}
                </div>
                <div className="form-outline form-white ">
                  <input type="password" placeholder='Password' className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mt-2 mb-2">
                  {errorInput && <span className="text-danger">Vui lòng điền trường này</span>}
                </div>
                <p className="small my-3 pb-lg-2"><a className="text-white-50" href="#!">Quên mật khẩu?</a></p>
                <button variant="primary" type="submit" className="btn btn-outline-light btn-lg px-5" disabled={disable}>{isLoading ? <CircularProgress /> : 'Đăng nhập'}</button>
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
