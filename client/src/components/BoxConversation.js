import React, { useContext } from 'react'
import useAuth from '../context/AuthContext';
import {NotificationContext} from '../context/NotificationContext'

const BoxConversation = ({con}) => {
  const {user} = useAuth();
  const notificationContext = useContext(NotificationContext);

  const getNameConversation = (user,conversation)=>{
    return conversation.member[0]._id===user._id?conversation.member[1].first_name:user.first_name;
  }
  return (
    <div className='col-lg-12 p-2'>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <img width="32" height="32" className='rounded-circle' alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" />
        <div className='w-50 overflow-hidden mh-60'>
          <p>{!con.isGroupChat?getNameConversation(user,con):con.chat_name}</p>
          {(con.latestMessage && con.latestMessage.type=='text')&&<p className='mb-0'>{con.latestMessage.content}</p>} 
          {(con.latestMessage && con.latestMessage.type=='image')&&<p className='mb-0'>Hình ảnh</p>} 
        </div>
        <div className='d-flex flex-column align-items-end'>
          <div>
            <p>09:00</p>  
          </div>
          <div>
          {notificationContext.notifications.some(i=>i === con._id) && <p className='mb-0 text-danger'>1</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxConversation