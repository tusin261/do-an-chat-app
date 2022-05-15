import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from '../components/Message';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Feed from '../components/Feed';
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
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';

let socket;
const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { conversationState, conversationDispatch } = useContext(ChatContext);
  const [loading, setLoading] = useState(false);
  const [listImage, setListImage] = useState([]);
  const [listFile, setListFile] = useState([]);
  const [value, setValue] = useState(1);
  const [newMessage, setNewMessage] = useState();
  const [isSelectedInput, setIsSelectedInput] = useState(false);
  const [page, setPage] = useState(0);
  const [length, setLength] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [online, setOnline] = useState([]);
  let selectedChatCompare = useRef();
  const scrollRef = useRef();
  const inputMessageRef = useRef()
  axios.defaults.baseURL = "http://localhost:5000";
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${user.accessToken}`
    },
  };
  // const onFocus = ()=>{
  //   setIsSelectedInput(true);
  // }
  const sendMessage = async () => {
    try {
      const { data } = await axios.post("/api/messages", {
        content: inputMessageRef.current.value,
        conversation_id: selectedConversation._id,
        type: 'text'
      }, config);
      socket.emit('send message', data);
      setMessages((pre) => [data, ...pre]);
      setNewMessage(data);
      //inputMessageRef.current.focus();
      inputMessageRef.current.value = ''
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
      const newListMess = [data, ...messages];
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
      const newListMess = [data, ...messages];
      socket.emit('send message', data);
      setMessages(newListMess);
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessageVideo = async (e) => {
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
      const newListMess = [data, ...messages];
      socket.emit('send message', data);
      setMessages(newListMess);
    } catch (error) {
      console.log(error);
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputMessageRef.current.value !== '') {
      sendMessage();
    }
  }
  const handleSendMessage = () => {
    sendMessage();
  }

  const setSeenMessage = async () => {
    const lastestMessage = messages.pop();
    let readBy = [];
    if (lastestMessage) {
      const isExist = lastestMessage.readBy.filter((e) => e == user._id);
      readBy.push(user._id);
      const jsonData = {
        lastestMessage,
        readBy: JSON.stringify(readBy)
      }
      if (lastestMessage.sender_id._id != user._id && isExist.length == 0) {
        try {
          const { data } = await axios.post("/api/messages/update-message", jsonData, config);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      return;
    }
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

  useEffect(() => {
    getList()
  }, [newMessage]);

  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.on('notification new group', data => {
      console.log('assss');
      setNewMessage(data);
    })

    socket.on('new message', (newMess) => {
      if (!selectedChatCompare.current || selectedChatCompare.current._id !== newMess.conversation_id._id) {
        console.log('messssssss');
        setNewMessage(newMess);
      } else {
        setMessages((pre) => [newMess, ...pre]);
      }
    });

    socket.on('new message group', (newMess) => {
      if (!selectedChatCompare.current || selectedChatCompare.current._id !== newMess.conversation_id._id) {
        console.log('grouppppppp');
        setNewMessage(newMess);
      } else {
        setMessages((pre) => [newMess, ...pre]);
      }
    });
  }, [])

  useEffect(() => {
    if (socket) {
      socket.emit('addUser', user);
      socket.on('getUsers', data => {
        setOnline(data);
      })
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      socket.emit('join chat', selectedConversation);
      getMessage();
      selectedChatCompare.current = selectedConversation;
    }
    return () => {
      setPage(0);
      setMessages([]);
    }
  }, [selectedConversation]);

  const getMessage = async () => {
    try {
      const { data } = await axios.get(`/api/messages/${selectedConversation._id}?page=${page}`, config);
      const listMess = data.list;
      const arr = [...messages, ...listMess];
      setMessages(arr);
      if (listMess.length === 0 || listMess.length < 10) {
        setHasMore(false);
      }
      setLength(listMess.total);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      const images = messages.filter(i => i.type == 'image');
      const files = messages.filter(i => i.type == 'file');
      setListImage(images);
      setListFile(files);
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // useEffect(()=>{
  //   if(selectedConversation && messages.length > 0){
  //     setSeenMessage();
  //   }
  // },[isSelectedInput,newMessage])

  return (
    <div className='container-fluid'>
      <div className='row'>
        <Topbar socket={socket} setValue={setValue} value={value} />
      </div>
      {value == 1 ? <div className='row justify-content-between'>
        <div className='col-lg-3 overflow-auto border rounded box-sidebar'>
          <Sidebar setSelectedConversation={setSelectedConversation}
            messages={messages}
            socket={socket} online={online} />
        </div>
        <div className='col-lg-9' style={{ height: "90vh" }}>
          {selectedConversation && <InfoConversation
            setSelectedConversation={setSelectedConversation}
            selectedConversation={selectedConversation}
            socket={socket} listImage={listImage} listFile={listFile}
            setMessages={setMessages} messages={messages} />}
          <div className='box-chat border rounded d-flex flex-column-reverse' id='scrollableDiv'>
            {selectedConversation &&
              <InfiniteScroll
                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                inverse={true}
                scrollableTarget="scrollableDiv"
                dataLength={length}
                next={getMessage}
                hasMore={hasMore}>
              </InfiniteScroll>}
            {selectedConversation && messages.map((i, index, currentArr) => (
              <div className='p-2' key={i._id}>
                {currentArr.length - 1 == index ? <Message message={i} own={i.sender_id._id == user._id}
                  isLastMessage={true} /> : <Message message={i} own={i.sender_id._id == user._id}
                    isLastMessage={false}
                />}
                <div ref={scrollRef}></div>
              </div>
            ))}
          </div>

          {/* onChange={(e) => setNewMessage(e.target.value)} */}
          {/* onFocus={onFocus} onBlur={onBlur} */}
          {selectedConversation &&
            <div className='mt-1 d-flex justify-content-between align-items-center'>
              <input type='text' className="form-control w-65"
                ref={inputMessageRef}
                onKeyPress={handleKeyPress}
                placeholder="Nhập gì đó ...." />
              <button className='btn btn-primary' onClick={handleSendMessage}><SendOutlinedIcon /></button>
              <input type='file' id='hinhanh' className='d-none' onChange={sendMessageImage} />
              <label htmlFor='hinhanh'><ImageOutlinedIcon color="primary" sx={{ fontSize: 40 }} /></label>
              <input type='file' id='filekhac' className='d-none' onChange={sendMessageFile} />
              <label htmlFor='filekhac'><AttachFileOutlinedIcon color="primary" sx={{ fontSize: 40 }} /></label>
              <span data-bs-toggle="dropdown"><MoreHorizOutlinedIcon color="primary" sx={{ fontSize: 40 }} /></span>
              <div className="dropdown-menu">
                <input type='file' id='video' className='d-none' onChange={sendMessageVideo} />
                <span className="dropdown-item" ><label htmlFor='video'><VideoFileOutlinedIcon /> Gui video</label></span>
              </div>
            </div>}
        </div>
      </div> : <Feed socket={socket} />
      }

    </div >
  )
}

export default Chat