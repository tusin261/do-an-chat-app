import React from 'react'
import useAuth from '../context/AuthContext';

const BoxConversation = ({con}) => {
  const {user} = useAuth();
  const getNameConversation = (user,conversation)=>{
    return conversation.member[0]._id===user._id?conversation.member[1].first_name:user.first_name;
  }
  return (
    <div className='col-lg-12 p-2'>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <img width="64" height="64" className='rounded-circle' alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" />
        <div className='w-50 overflow-hidden mh-80'>
          <p>{!con.isGroupChat?getNameConversation(user,con):con.chat_name}</p>
          <p>{con.latestMessage?con.latestMessage.content:''}</p>
        </div>
        <div className='d-flex flex-column align-items-end'>
          <div>
            <p>09:00</p>  
          </div>
          <div>
            <p>1</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxConversation