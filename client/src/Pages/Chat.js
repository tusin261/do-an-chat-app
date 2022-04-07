import React, { useEffect, useRef, useState } from 'react'
import Message from '../components/Message';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import useAuth from '../context/AuthContext'
import "../components/Chat.css";
import axios from 'axios';
import { io } from 'socket.io-client';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InfoConversation from '../components/InfoConversation';
const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [noti, setNoti] = useState([]);

  let selectedChatCompare = useRef();
  let socket = useRef();
  const scrollRef = useRef();
  const END_POINT = "http://localhost:5000";
  axios.defaults.baseURL = "http://localhost:5000";
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${user.accessToken}`
    },
  };

  const sendMessage = async () => {
    try {
      const { data } = await axios.post("/api/messages", {
        content: newMessage,
        conversation_id: selectedConversation._id,
        type: 'text'
      }, config);
      socket.current.emit('send message', data);
      setMessages([...messages, data]);
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessageImage = async (e) => {
    const imageSelected = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageSelected);
    formData.append("conversation_id", selectedConversation._id);
    formData.append("type", "image");


    try {
      const { data } = await axios.post("/api/messages/image", formData, config);
      const newListMess = [...messages, data];
      socket.current.emit('send message', data);
      setMessages(newListMess);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSendMessage = (e) => {
    if (e.keyCode === 13 && newMessage !== '') {
      sendMessage();
    }
    sendMessage();
  }
  const handleTyping = (e) => {
    setNewMessage(e.target.value);

  }
  useEffect(() => {
    socket.current = io(END_POINT);
  }, []);
  useEffect(() => {
    if (socket.current) {
      socket.current.emit('addUser', user);
      socket.current.on('getUsers', data => {
        console.log(data);
      })
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      socket.current.emit('join chat', selectedConversation);
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (selectedConversation) {
      const getMessage = async () => {
        try {
          const { data } = await axios.get(`/api/messages/${selectedConversation._id}`, config);
          setMessages(data);
        } catch (error) {
          console.log(error);
        }
      }
      getMessage();
      selectedChatCompare.current = selectedConversation;
    }
  }, [selectedConversation])

  useEffect(() => {
    socket.current.on('new message', (newMess) => {
      if (!selectedChatCompare.current || selectedChatCompare.current._id !== newMess.conversation_id._id) {
        setNoti((prev) => [...prev, newMess.conversation_id._id]);
      } else {
        setMessages([...messages, newMess]);
      }
    })
  }, [messages])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  return (
    <div className='container-fluid'>
      <div className='row'>
        <Topbar />
      </div>
      <div className='row justify-content-between h-100'>
        <div className='col-lg-3 vh-100 overflow-auto border rounded'>
          <Sidebar setSelectedConversation={setSelectedConversation} messages={messages} noti={noti} setNoti={setNoti} />
        </div>
        <div className='col-lg-9'>
          {selectedConversation && <InfoConversation setSelectedConversation={setSelectedConversation} selectedConversation={selectedConversation} />}
          <div className='box-chat overflow-auto border rounded'>
            {messages.map(i => (
              <div key={i._id} ref={scrollRef}>
                <Message message={i} own={i.sender_id._id == user._id} />
              </div>
            ))}
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <input type='text' className="form-control w-65"
              value={newMessage}
              onChange={handleTyping} placeholder="Nhập gì đó ...." />
            <button className='btn btn-primary' onClick={handleSendMessage}><SendOutlinedIcon /></button>
            <input type='file' id='hinhanh' className='d-none' onChange={sendMessageImage} />
            <label htmlFor='hinhanh'><ImageOutlinedIcon color="primary" sx={{ fontSize: 40 }} /></label>
            <input type='file' id='filekhac' className='d-none' />
            <label htmlFor='hinhanh'><AttachFileOutlinedIcon color="primary" sx={{ fontSize: 40 }} /></label>
            <span><MoreHorizOutlinedIcon color="primary" sx={{ fontSize: 40 }} /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat