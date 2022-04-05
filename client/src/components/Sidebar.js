import React, { useEffect, useState } from 'react'
import BoxConversation from './BoxConversation'
import axios from 'axios'
import useAuth from '../context/AuthContext';
import Search from './Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
const Sidebar = ({setSelectedConversation}) => {
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
      <button className='btn btn-primary mt-2'>Tạo Group Chat <AddOutlinedIcon /></button>
      <Search conversation={conversation} setConversation={setConversation} setSelectedConversation={setSelectedConversation} />
      
      <div className='list-group'>
        {conversation.map(c=>(
          <div key={c._id} onClick={() =>{
            setSelectedConversation(c)
          }}>
            <BoxConversation con={c} />
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar