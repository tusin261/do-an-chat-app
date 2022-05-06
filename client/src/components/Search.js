import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import useAuth from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
const Search = ({ setSelectedConversation }) => {
    const { user, dispatch } = useAuth();
    const { conversationState, conversationDispatch } = useContext(ChatContext);
    const { chats } = conversationState;

    const [listResult, setListResult] = useState([]);
    const inputSearch = useRef();
    axios.defaults.baseURL = "http://localhost:5000";
    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`
        },
    };
    const handleChange = async (e) => {
        const keyword = e.target.value;
        try {
            const rs = await axios.get("/api/users?q=" + keyword, config);
            setListResult(rs.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = async (item) => {
        const user2_id = item._id;
        try {
            console.log(chats);
            const rs = await axios.post("/api/chats", {
                userId: user2_id
            }, config);
            const newConversation = chats.find(e => e._id === rs.data._id);
            if (newConversation) {
                setSelectedConversation(newConversation);
            } else {
                conversationDispatch({ type: "ADD_CHATS", payload: rs.data });
                setSelectedConversation(rs.data)
            }
            setListResult([]);
            inputSearch.current.value = '';

        } catch (error) {
            console.log(error);
        }
    }
    const addFriend = async (e, item) => {
        e.stopPropagation();
        const json = {
            userId: item._id
        }
        try {
            const { data } = await axios.post('/api/users/addFriend', json, config);
            // dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        } catch (error) {
            console.log(error);
        }
    }

    const checkFriend = (receiver) => {
        const request = [...user.request];
        const sent_request = [...user.sent_request];
        const friends = [...user.listFriend];
        if(request.includes(receiver._id.toString())){
            return 2;//chap nhan
        }else if(sent_request.includes(receiver._id.toString())){
            return 1; // da gui kb
        }else if(friends.includes(receiver._id.toString())){
            return 3;//ban be
        }else{
            return 4;//chua la ban
        }
    }

    const acceptRequest = async (e, item) =>{
        e.stopPropagation();
        const json = {
            userId: item._id
        }
        try {
            const { data } = await axios.post('/api/users/acceptRequest', json, config);
            // dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        } catch (error) {
            console.log(error);
        }
    }
    const rejectRequest = async (e, item) =>{
        e.stopPropagation();
        const json = {
            userId: item._id
        }
        try {
            const { data } = await axios.post('/api/users/rejectRequest', json, config);
            // dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mb-3 mt-2 position-relative">
            <input type="text" className="form-control" ref={inputSearch} onChange={handleChange} placeholder='Tìm kiếm ...' />
            <div className='w-100 position-absolute'>
                <ul className="list-group">
                    {listResult.length > 0 && listResult.map((item, index) => (
                        <li className="list-group-item" key={index} onClick={() => handleClick(item)}>
                            <div className='row align-items-center'>
                                <div className='col-md-3'>
                                    <img width="40" height="40" className='rounded-circle' alt="100x100" src={item.image_url} />
                                </div>
                                <div className='col-md-9'>
                                    <div className='row mb-1'>
                                        {item.last_name} {item.first_name}
                                    </div>
                                    <div className='row mb-1'>
                                        {item.email}
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12 px-0 d-flex align-items-center'>
                                            {checkFriend(item) === 1 && <button className='btn btn-primary btn-sm' disabled><CheckIcon sx={{ fontSize: 16 }} /> Đã gửi lời mời kết bạn</button>}
                                            {checkFriend(item) === 2 && 
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                <button className='btn btn-primary btn-sm' onClick={(e) => acceptRequest(e, item)}>Đồng ý</button>
                                                </div>
                                                <div className='col-md-6'>
                                                <button className='btn btn-primary btn-sm' onClick={(e) => rejectRequest(e, item)}>Từ chối</button>
                                                </div>
                                            </div>  
                                            }
                                            {checkFriend(item) === 3 && <button className='btn btn-primary btn-sm' disabled>Bạn bè</button>}
                                            {checkFriend(item) === 4 && <button className='btn btn-primary btn-sm' onClick={(e) => addFriend(e, item)}><AddIcon sx={{ fontSize: 16 }} /> Thêm bạn</button>}
                                        {/* <button className='btn btn-primary btn-sm' onClick={(e) => addFriend(e, item)}><AddIcon sx={{ fontSize: 16 }} />Thêm bạn</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}

export default Search