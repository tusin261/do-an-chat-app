import React, { useContext } from 'react'
import useAuth, { AuthContext } from '../context/AuthContext'

const Chat = () => {
  const {user} = useAuth();
  return (
    <div>
      <h1 className='text-primary'>Chat</h1>
      <h1>{user.first_name}</h1>
      <h1>{user.last_name}</h1>
      <h1>{user.email}</h1>
    </div>
  )
}

export default Chat