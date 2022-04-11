import React, { useRef, useState, useEffect, useContext } from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useAuth from '../context/AuthContext';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { ChatContext } from '../context/ChatContext'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {NotificationContext} from '../context/NotificationContext'

const InfoConversation = ({ selectedConversation, setSelectedConversation,socket }) => {
    const { user } = useAuth();
    // !selectedConversation.isGroupChat ? getNameConversation(user, selectedConversation) : selectedConversation.chat_name
    const [groupChatName, setGroupChatName] = useState();
    const [listResult, setListResult] = useState([]);
    const [listMember, setListMember] = useState([]);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const inputSearch = useRef();
    const imageInput = useRef();
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState();
    const [successAddMember,setSuccessAddMember] = useState(false);
    const [errorAddMember,setErrorAddMember] = useState(false);
    const chatContext = useContext(ChatContext);
    const notificationContext = useContext(NotificationContext);


    axios.defaults.baseURL = "http://localhost:5000";
    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`
        },
    };
    const getNameConversation = (user, conversation) => {
        return conversation.member[0]._id === user._id ? conversation.member[1].first_name : user.first_name;
    }
    const handleClickItemInList = (item) => {
        const existedMember = listMember.find(i => i._id === item._id);
        const existedMemberinConversation = selectedConversation.member.find(i => i._id === item._id);
        if (existedMember || existedMemberinConversation) {
            setError(true);
            return;
        } else {
            setListMember([...listMember, item]);
            setListResult([]);
            inputSearch.current.value = '';
        }
    }

    const handleAddMember = async () => {
        const jsonData = {
            conversationId: selectedConversation._id,
            member: JSON.stringify(listMember.map((u) => u._id))
        }
        try {
            const { data } = await axios.put("/api/chats/add-group", jsonData, config);
            setSelectedConversation(data);
            setListResult([]);
            setListMember([]);
            setSuccessAddMember(true);
        } catch (error) {
            console.log(error);
            setErrorAddMember(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setError(false);
        setSuccessAddMember(false);
        setErrorAddMember(false);
    };

    const searchMember = async (e) => {
        const keyword = e.target.value;
        try {
            const { data } = await axios.get("/api/users?q=" + keyword, config);
            setListResult(data);
        } catch (error) {
            console.log(error)
        }
    }
    const removerFromGroup = (userFromGroup) => {
        const newGroup = listMember.filter(u => u._id !== userFromGroup._id);
        setListMember(newGroup);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) === 'image') {
            setSelectedImage(file);
        } else {
            setSelectedImage(null);
        }
    }
    const chooseImage = (e) => {
        imageInput.current.click();
    }

    const submitImageGroup = async () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append("image", selectedImage);
            formData.append("conversationId", selectedConversation._id);
            try {
                const { data } = await axios.put("/api/chats/update-group", formData, config);
                setSelectedConversation(data);
                setSelectedImage(null);
            } catch (error) {
                console.log(error);
            }
        }
    }
    const handleChangeName = async () => {
        if (groupChatName === selectedConversation.chat_name) {
            //set thong bao loi
            return;
        } else {
            const jsonData = {
                chat_name: groupChatName,
                conversationId: selectedConversation._id
            }
            try {
                const { data } = await axios.put("/api/chats/rename-group", jsonData, config);
                setSelectedConversation(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const openAlert = () => {
        setOpen(true);
    }


    const handleDeleteMember = async (mem) => {
        const jsonData = {
            userId: mem._id,
            conversationId: selectedConversation._id
        }
        try {
            const { data } = await axios.put("/api/chats/remove-group", jsonData, config);
            setSelectedConversation(data);
        } catch (error) {
            console.log(error);
        }
    }
    const OutGroup = async () => {
        const jsonData = {
            userId: user._id,
            conversationId: selectedConversation._id
        }
        try {
            const { data } = await axios.put("/api/chats/remove-group", jsonData, config);
            socket.emit('out group',{data,name:user.first_name});
            setSelectedConversation(null);
            const newListConversation = chatContext.conversations.filter(i => i._id !== data._id);
            chatContext.setConversations(newListConversation);
        } catch (error) {
            console.log(error);
        }
    }

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

    return (
        <div className='col-lg-12 border rounded'>
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <div className='d-flex p-2'>
                    <img width="42" height="42" className='rounded-circle' alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" />
                    <div className='ms-2'>
                        <h5 className='mb-0'>{!selectedConversation.isGroupChat ? getNameConversation(user, selectedConversation) : selectedConversation.chat_name}</h5>
                        <span><FiberManualRecordIcon style={{ fontSize: 16, color: "#B6FFCE" }} /></span>
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                    <span><CallIcon style={{ fontSize: 38, color: "blue" }} /></span>
                    <span><VideocamIcon style={{ fontSize: 38, color: "blue" }} /></span>
                    <span data-bs-toggle="modal" data-bs-target="#modalInfoConversation" role="button"><MoreVertIcon style={{ fontSize: 38, color: "blue" }} /></span>
                    <div className="modal fade" id="modalInfoConversation" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Thông tin cuộc trò chuyện</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body body-modal-info">
                                    <div className="container-fluid">
                                        <div className='row justify-content-center'>
                                            <div className='col-lg-10 d-flex flex-column align-items-center'>
                                                <img width="64" height="64" className='rounded-circle' alt="100x100" src={preview ? preview : selectedConversation.group_image} />
                                                {selectedConversation.isGroupChat && <input type="file" accept='image/*' ref={imageInput} style={{ display: 'none' }} onChange={handleImageChange} />}
                                                {selectedConversation.isGroupChat && <div className='d-flex'>
                                                    <button className='btn btn-primary' onClick={chooseImage}>Chọn ảnh đại diện</button>
                                                    {selectedImage && <button className='btn btn-primary' onClick={submitImageGroup}>Đổi ảnh đại diện</button>}
                                                </div>}
                                                {selectedConversation.isGroupChat && <p className='mb-0'>Nhóm được tạo bởi {selectedConversation.creator.first_name}</p>}
                                            </div>
                                        </div>
                                        {selectedConversation.isGroupChat && <>
                                            <div className='row'>
                                                <div className="mb-1 px-0">
                                                    <label className="form-label">Tên cuộc trò chuyện</label>
                                                    <input type="text" className="form-control" value={groupChatName}
                                                        onChange={(e) => setGroupChatName(e.target.value)} />
                                                    <div className="input-group-append">
                                                        <button className='btn btn-primary' onClick={handleChangeName}>Thay Đổi</button>
                                                    </div>
                                                </div>
                                                <hr></hr>
                                            </div>
                                            <div className='row'>
                                                {/* Thành viên-------------------------------------------------------------------- */}
                                                <h5>Thành viên</h5>
                                                <ul className='list-group px-0'>
                                                    {(selectedConversation.member).map((item, index) => (
                                                        <li className="list-group-item" key={index}>
                                                            <div className="d-flex w-100 align-items-center">
                                                                <img width="32" height="32" className='rounded-circle' alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" />
                                                                <div className='ms-3'>
                                                                    <p>{item.last_name} {item.first_name}</p>
                                                                    <p className='mb-0'>{item.email}</p>
                                                                </div>

                                                                {(selectedConversation.isGroupChat && selectedConversation.creator._id === user._id)
                                                                    && <button className='btn btn-danger' onClick={()=>handleDeleteMember(item)}>Xóa</button>}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            {/*Thêm Thành viên-------------------------------------------------------------------- */}
                                            <div className='row mt-1'>
                                                <h5>Thêm thành viên</h5>
                                                <div className="px-0">
                                                    <input type="text" className="form-control" ref={inputSearch} onChange={searchMember} placeholder='Nhập tên để thêm vào nhóm' />
                                                </div>
                                                <div className='mb-1 d-flex flex-wrap'>
                                                    {listMember.length > 0 && listMember.map((user, index) => (
                                                        <div key={user._id} className='col-lg-2 bg-danger d-flex text-white p-2 border rounded'>
                                                            <p className='mb-0'>{user.first_name}</p>
                                                            <span className='bg-danger ms-2' onClick={() => removerFromGroup(user)}>x</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <ul className="list-group">
                                                    {listResult.length > 0 && listResult.map((item, index) => (
                                                        <li className="list-group-item" key={index} onClick={() => handleClickItemInList(item)}>
                                                            <div className="d-flex w-100 align-items-center">
                                                                <img width="64" height="64" className='rounded-circle' alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" />
                                                                <div className='ms-3'>
                                                                    <p>{item.last_name} {item.first_name}</p>
                                                                    <p>{item.email}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button className='btn btn-primary' onClick={handleAddMember}>Thêm thành viên</button>
                                            </div>{error && <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={error} autoHideDuration={2000} onClose={handleClose}>
                                                <Alert severity="error" sx={{ width: '100%' }}>
                                                    Thành viên đã tồn tại
                                                </Alert>
                                            </Snackbar>}
                                            {successAddMember && <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={successAddMember} autoHideDuration={2000} onClose={handleClose}>
                                                <Alert severity="success" sx={{ width: '100%' }}>
                                                    Thêm thành viên thành công !!!
                                                </Alert>
                                            </Snackbar>}
                                            {errorAddMember && <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={errorAddMember} autoHideDuration={2000} onClose={handleClose}>
                                                <Alert severity="error" sx={{ width: '100%' }}>
                                                    Thêm thành viên không thành công !!!
                                                </Alert>
                                            </Snackbar>}
                                        </>}
                                        
                                        <div className='row'>
                                            <p>Ảnh đã chia sẻ</p>
                                        </div>
                                        <div className='row'>
                                            <p>File</p>
                                        </div>
                                        <div className='row'>
                                            <button className='btn btn-danger' data-bs-dismiss="modal" onClick={openAlert}>Rời khỏi nhóm</button>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-describedby="alert-dialog-description"
                                            >

                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Bạn có muốn rời nhóm này?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>Không</Button>
                                                    <Button onClick={OutGroup} autoFocus>
                                                        Có
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
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

export default InfoConversation