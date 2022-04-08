import axios from 'axios';
import React, { useContext, useRef, useState } from 'react'
import useAuth from '../context/AuthContext';
import {ChatContext} from '../context/ChatContext'

const Search = ({setSelectedConversation}) => {
    const { user } = useAuth();
    const chatContext = useContext(ChatContext);

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

    const handleClick = async (item)=>{
        const user2_id = item._id;
        try {
            const rs = await axios.post("/api/chats",{
                userId:user2_id
            },config);
            const newConversation = chatContext.conversations.find(e=>e._id === rs.data._id);
            if(newConversation){
                setSelectedConversation(newConversation);
            }else{
                chatContext.setConversations([...chatContext.conversations,rs.data]);
                setSelectedConversation(rs.data)
            }
            setListResult([]);
            inputSearch.current.value = '';
            
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="mb-3 mt-2 position-relative">
            <input type="text" className="form-control" ref={inputSearch} onChange={handleChange} />
            <div className='w-100 position-absolute'>
                <ul className="list-group">
                    {listResult.length > 0 && listResult.map((item, index) => (
                        <li className="list-group-item" key={index} onClick={()=>handleClick(item)}>
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
            </div>

        </div>

    )
}

export default Search