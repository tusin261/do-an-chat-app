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
  const [invi, setInvi] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  axios.defaults.baseURL = "http://localhost:5000";
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      "Authorization": `Bearer ${user.accessToken}`
    },
  };
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
      const formData = new FormData();
      formData.append("image", selectedImage);
      try {
        const rs = await axios.post("/api/users/updateAvatar", formData, config);
        dispatch({ type: 'LOGIN_SUCCESS', payload: rs.data });
        localStorage.setItem("user", JSON.stringify(rs.data));
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Chua co hinh anh');
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
  return (
    <div className='col-md-12 py-1'>
      <div className='row align-items-center'>
        <div className='col-md-2'>
          <h4>Test</h4>
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
                <Badge color="error" variant="dot" invisible={invi}>
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
                                <form onSubmit={handleSubmit}>
                                  <div className="mb-3">
                                    <label className="form-label">Họ</label>
                                    <input type="text" className="form-control" placeholder={user.last_name} />
                                  </div>
                                  <div className="mb-3">
                                    <label className="form-label">Tên</label>
                                    <input type="text" className="form-control" placeholder={user.first_name} />
                                  </div>
                                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Lưu thay đổi</button>
                                </form>
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