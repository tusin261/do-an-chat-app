import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import useAuth from '../context/AuthContext';
import axios from 'axios';

const ModalEditUser = ({ show, onHide, userItem,users,setUsers,setShow }) => {
    const [lastName, setLastName] = useState(userItem.last_name);
    const [firstName, setFirstName] = useState(userItem.first_name);
    const [email, setEmail] = useState(userItem.email);
    const { user } = useAuth();
    axios.defaults.baseURL = "http://localhost:5000";
    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`
        },
    };

    const updateUser = async () => {
        const json = {
            isLock: false,
            isDelete: false,
            isChange: true,
            userId: userItem._id,
            last_name:lastName,
            first_name:firstName,
            email:email
        }
        try {
            const { data } = await axios.post(`/api/admin/updateUser`, json, config);
            const userUpdated = users.filter((i) => i._id != userItem._id);
            userUpdated.push(data);
            setUsers(userUpdated);
            setShow(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Thông Tin Người Dùng
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10'>
                            <h5>Họ</h5>
                            <input className='form-control'
                                type='text' value={lastName} onChange={e => setLastName(e.target.value)} />
                        </div>
                        <div className='col-md-10'>
                            <h5>Tên</h5>
                            <input className='form-control'
                                type='text' value={firstName}
                                onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div className='col-md-10'>
                            <h5>Email</h5>
                            <input className='form-control'
                                type='text' value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-primary' onClick={updateUser}>Lưu Thay Đổi</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEditUser