import React, { useEffect, useState } from 'react'
import BoxConversation from './BoxConversation'
import axios from 'axios'
import useAuth from '../context/AuthContext';

const Sidebar = ({setMess,setSelectedConversation}) => {
  const { user } = useAuth();
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  axios.defaults.baseURL = "http://localhost:5000";
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${user.accessToken}`
    },
  };
  useEffect(() => {
    try {
      const getList = async () => {
        const rs = await axios.get("/api/chats", config);
        const listConversation = rs.data;
        setConversation(listConversation);
      }
      getList();
    } catch (error) {
      console.log(error);
    }
  },[]);

  useEffect(()=>{
    if(currentChat){
      try {
        const getMessage = async ()=>{
          const rs = await axios.get(`/api/messages/${currentChat._id}`, config);
          setMess(rs.data);
          setSelectedConversation(currentChat);
        }
        getMessage();
      } catch (error) {
        console.log(error);
      }
    }
  },[currentChat]);



  return (
    <div className='col-lg-12'>
      <div className='list-group'>
        {conversation.map(c=>(
          <div key={c._id} onClick={() => setCurrentChat(c)}>
            <BoxConversation con={c} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar