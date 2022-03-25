import React, { useEffect, useState } from 'react'
import BoxConversation from './BoxConversation'
import axios from 'axios'
import useAuth from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const [conversation, setConversation] = useState([]);
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

  return (
    <div className='col-lg-12'>
      <div className='list-group'>
        {conversation.map(c=>(
          <BoxConversation con={c} key={c._id}/>
        ))}
      </div>
    </div>
  )
}

export default Sidebar