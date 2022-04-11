import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from '../components/Message';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import useAuth from '../context/AuthContext'
import "../components/Chat.css";
import axios from 'axios';
import io from 'socket.io-client';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import VideoFileOutlinedIcon from '@mui/icons-material/VideoFileOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import DuoOutlinedIcon from '@mui/icons-material/DuoOutlined';
import InfoConversation from '../components/InfoConversation';
import { NotificationContext } from '../context/NotificationContext'
import { ChatContext } from '../context/ChatContext'
let socket;
const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const notificationContext = useContext(NotificationContext);
  const { conversationState, conversationDispatch } = useContext(ChatContext);
  const { chats } = conversationState;
  let selectedChatCompare = useRef();
  const scrollRef = useRef();
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
      console.log(data);
      socket.emit('send message', data);
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
      socket.emit('send message', data);
      setMessages(newListMess);
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessageFile = async (e) => {
    const fileSelected = e.target.files[0];
    const formData = new FormData();
    formData.append("anotherFile", fileSelected);
    formData.append("conversation_id", selectedConversation._id);
    formData.append("type", "file");
    try {
      const { data } = await axios.post("/api/messages/file", formData, config);
      const newListMess = [...messages, data];
      socket.emit('send message', data);
      setMessages(newListMess);
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessageVideo = async (e)=>{
    const fileSelected = e.target.files[0];
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization": `Bearer ${user.accessToken}`
      },
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
      },
    };
    const formData = new FormData();
    formData.append("video", fileSelected);
    formData.append("conversation_id", selectedConversation._id);
    formData.append("type", "video");
    try {
      const { data } = await axios.post("/api/messages/video", formData, config);
      const newListMess = [...messages, data];
      socket.emit('send message', data);
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

  const getList = async () => {
    conversationDispatch({ type: "GET_CHATS_START" });
    try {
      const { data } = await axios.get("/api/chats", config);
      conversationDispatch({ type: "GET_CHATS_SUCCESS", payload: data });
    } catch (error) {
      conversationDispatch({ type: "GET_CHATS_FAILURE" });
      console.log(error);
    }
  }

  const updateConversation = async (newMessage) => {
    if (newMessage.conversation_id.isGroupChat) {
      getList();
    } else {
      const receiver = newMessage.conversation_id.member.find(i => i._id !== user._id);
      try {
        const { data } = await axios.post("/api/chats", { userId: receiver._id }, config);
        getList();
      } catch (error) {
        console.log(error);
      }
    }

  }

  useEffect(() => {
    socket = io("http://localhost:5000");
  }, [])

  useEffect(() => {
    if (socket) {
      socket.emit('addUser', user);
      socket.on('getUsers', data => {
        console.log(data);
      })
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      socket.emit('join chat', selectedConversation);
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
    socket.on('new message', (newMess) => {
      if (!selectedChatCompare.current || selectedChatCompare.current._id !== newMess.conversation_id._id) {
        const dataNotification = {
          id: newMess.conversation_id._id,
          type: 'text'
        }
        notificationContext.setNotifications([...notificationContext.notifications, dataNotification]);
        updateConversation(newMess);
      } else {
        setMessages([...messages, newMess]);
      }
    })
  }, [messages])


  useEffect(() => {
    socket.on('new message group', (newMess) => {
      if (!selectedChatCompare.current || selectedChatCompare.current._id !== newMess.conversation_id._id) {
        const dataNotification = {
          id: newMess.conversation_id._id,
          type: 'text'
        }
        notificationContext.setNotifications([...notificationContext.notifications, dataNotification]);
        updateConversation(newMess);
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
        <Topbar socket={socket} />
      </div>
      <div className='row justify-content-between h-100'>
        <div className='col-lg-3 vh-100 overflow-auto border rounded'>
          <Sidebar setSelectedConversation={setSelectedConversation} messages={messages} socket={socket} />
        </div>
        <div className='col-lg-9'>
          {selectedConversation && <InfoConversation setSelectedConversation={setSelectedConversation} selectedConversation={selectedConversation} socket={socket} />}
          <div className='box-chat overflow-auto border rounded'>
            {messages.map(i => (
              <div key={i._id} ref={scrollRef}>
                <Message message={i} own={i.sender_id._id == user._id} />
              </div>
            ))}
          </div>
          {selectedConversation &&
            <div className='d-flex justify-content-between align-items-center'>
              <input type='text' className="form-control w-65"
                value={newMessage}
                onChange={handleTyping} placeholder="Nhập gì đó ...." />
              <button className='btn btn-primary' onClick={handleSendMessage}><SendOutlinedIcon /></button>
              <input type='file' id='hinhanh' className='d-none' onChange={sendMessageImage} />
              <label htmlFor='hinhanh'><ImageOutlinedIcon color="primary" sx={{ fontSize: 40 }} /></label>
              <input type='file' id='filekhac' className='d-none' onChange={sendMessageFile} />
              <label htmlFor='filekhac'><AttachFileOutlinedIcon color="primary" sx={{ fontSize: 40 }} /></label>
              <span data-bs-toggle="dropdown"><MoreHorizOutlinedIcon color="primary" sx={{ fontSize: 40 }} /></span>
              <div className="dropdown-menu">
                <input type='file' id='video' className='d-none' onChange={sendMessageVideo}/>
                <span className="dropdown-item" ><label htmlFor='video'><VideoFileOutlinedIcon /> Gui video</label></span>
                <span className="dropdown-item" ><LocalPhoneOutlinedIcon /> Goi dien</span>
                <span className="dropdown-item"><DuoOutlinedIcon /> Goi video</span>
              </div>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Chat