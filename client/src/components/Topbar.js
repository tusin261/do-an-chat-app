import React, { useState, useRef, useEffect, useContext } from 'react'
import useAuth from '../context/AuthContext';
import "../components/Chat.css";
import { BaseURL } from '../constants/path_constant';
import axios from 'axios';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { NotificationContext } from '../context/NotificationContext';
import { Badge, Menu } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Notification from './Notification';
import HomeIcon from '@mui/icons-material/Home';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
const Topbar = ({ socket, setValue, value }) => {
  const { user, dispatch } = useAuth();
  const imageURL = BaseURL.PUBLIC_FOLDER_IMAGE;
  const imageInput = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState();
  const [invisible, setInvisible] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { notification, notificationDispatch } = useContext(NotificationContext);
  const [lastName, setLastName] = useState(user.last_name);
  const [firstName, setFirstName] = useState(user.first_name);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);
  const [messageEmail, setMessageEmail] = useState('');

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  axios.defaults.baseURL = "http://localhost:5000";

  useEffect(() => {
    if (selectedImage) {
      const render = new FileReader();
      render.onloadend = () => {
        setPreview(render.result);
      }
      render.readAsDataURL(selectedImage);
    } else {
      setPreview(null);
    }
  }, [selectedImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedImage) {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          "Authorization": `Bearer ${user.accessToken}`
        },
      };
      const formData = new FormData();
      formData.append("image", selectedImage);
      try {
        const rs = await axios.post("/api/users/updateAvatar", formData, config);
        dispatch({ type: 'UPDATE_IMG', payload: rs.data.image_url });
        // localStorage.setItem("user", JSON.stringify(rs.data));
      } catch (error) {
        console.log(error);
      }
    } else {
      const json = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        new_password: newPassword
      }
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${user.accessToken}`
        },
      };
      try {
        const rs = await axios.post("/api/users/updateInfomation", json, config);
        dispatch({ type: 'UPDATE_IN4', payload: rs.data });
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleClick = () => {
    imageInput.current.click();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === 'image') {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  }
  const handleSeenNotification = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

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


  return (
    <div className='col-md-12 py-1'>
      <div className='row align-items-center'>
        <div className='col-md-2'>
          <h4 className='ms-3'>zCHAT</h4>
        </div>
        <div className='col-md-8'>
          <div className='row'>
            <div className='d-flex justify-content-center'>
              <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
                <Tab icon={<HomeIcon />} aria-label="home" />
                <Tab icon={<MailOutlineIcon />} aria-label="message" />
              </Tabs>
            </div>
          </div>
        </div>
        <div className='col-md-2'>
          <div className='row justify-content-between'>
            <div className='col-md-7 text-end'>
              <span role="button">
                <Badge color="error" variant="dot" invisible={invisible}>
                  <NotificationsNoneOutlinedIcon sx={{ fontSize: 32 }} onClick={handleSeenNotification} />
                </Badge></span>
              <Menu
                id="notification"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Notification socket={socket} setValue={setValue} value={value} />
              </Menu>
            </div>
            <div className='col-md-5'>
              <div className='row'>
                <div className='col-md-5'>

                </div>
                <div className='col-md-1'>
                  <Avatar id="imageDropdown" data-bs-toggle="dropdown" sx={{ width: 32, height: 32 }} src={user.image_url ? user.image_url : imageURL + "userDefault.png"} />
                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Thông tin cá nhân</a>
                    <a className="dropdown-item" href="#">Đăng xuất</a>
                  </div>
                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column align-items-center">
                          <img src={preview ? preview : user.image_url}
                            width="64" height="64"
                            className='mb-2 rounded-circle' alt="100x100" />
                          <input type="file" accept='image/*' ref={imageInput} style={{ display: 'none' }} onChange={handleImageChange} />
                          <button className='btn btn-primary' onClick={handleClick}>Đổi ảnh đại diện</button>
                          <div className='container'>
                            <div className='row'>
                              <div className='col-md-12'>
                                <hr />
                                <h4>Thông tin cá nhân</h4>

                                <div className="mb-3">
                                  <label className="form-label">Họ</label>
                                  <input type="text" className="form-control" value={lastName}
                                    onChange={onChangeLastName}
                                    onBlur={checkValidLastName} />
                                  <span hidden={validLastName} className="my-2 text-danger text-start">Họ không được để trống</span>
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Tên</label>
                                  <input type="text" className="form-control" value={firstName}
                                    onChange={onChangeFirstName}
                                    onBlur={checkValidFirstName} />
                                  <span hidden={validFirstName} className="my-2 text-danger text-start">Tên không được để trống</span>
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Email</label>
                                  <input type="text" className="form-control" value={email}
                                    onChange={onChangeEmail}
                                    onBlur={checkValidEmail} />
                                  <span hidden={validEmail} className="my-2 text-danger text-start">{messageEmail}</span>
                                </div>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Lưu thay đổi</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar