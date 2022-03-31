import React, { useContext, useEffect, useState } from 'react'
import Message from '../components/Message';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import useAuth, { AuthContext } from '../context/AuthContext'
import "../components/Chat.css";
import axios from 'axios';
const Chat = () => {
  const {user} = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedConversation,setSelectedConversation] = useState(null);
  const [newMessage,setNewMessage] = useState('');  
  axios.defaults.baseURL = "http://localhost:5000";
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${user.accessToken}`
    },
  };
  const sendMessage = async ()=>{
    try {
        const {data} = await axios.post("/api/messages",{
            content:newMessage,
            conversation_id:selectedConversation._id,
            type:'text'
        },config);
        const newListMess = [...messages,data];
        setMessages(newListMess);
    } catch (error) {
        console.log(error);
    }
  }
  console.log(messages)
  const handleSendMessage = (e)=>{
    if(e.keyCode === 13 && newMessage !=''){
        sendMessage();
    }
    sendMessage();
  }

  const handleTyping = (e)=>{
    setNewMessage(e.target.value);
  }

  return (
    <div className='container-fluid'>
            <div className='row'>
                <Topbar />
            </div>
            <div className='row justify-content-between h-100'>
                <div className='col-lg-3 vh-100 overflow-auto border rounded'>
                    <Sidebar setMess={setMessages} setSelectedConversation={setSelectedConversation}/>
                </div>
                <div className='col-lg-9'>
                    <div className='box-chat overflow-auto border rounded'>
                        {messages.map(i=>(
                            <Message key={i._id} message={i} own={i.sender_id._id == user._id}/>
                        ))}
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <input type='text' className="form-control w-65" 
                        value={newMessage} 
                        onChange={handleTyping} placeholder="Nhập gì đó ...." />
                        <button className='btn btn-primary' onClick={handleSendMessage}>Gui</button>
                        <input type='file' id='hinhanh' className='d-none' />
                        <label htmlFor='hinhanh'>hinhanh</label>
                        <input type='file' id='filekhac' className='d-none' />
                        <label htmlFor='filekhac' >file khac</label>
                        <a className=''>dropdow link ...</a>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Chat