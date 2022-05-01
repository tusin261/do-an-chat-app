import React, { useContext } from 'react'
import useAuth from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext'
import { formatDate } from '../services/Format/FormatDateAndTime'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

const BoxConversation = ({ con }) => {
  const { user } = useAuth();
  const notificationContext = useContext(NotificationContext);
  const getNameConversation = (user, conversation) => {
    return conversation.member[0]._id === user._id ? conversation.member[1].first_name : conversation.member[0].first_name;
  }
  const getImageConversation = (user, conversation) => {
    return conversation.member[0]._id === user._id ? conversation.member[1].image_url : conversation.member[0].image_url;
  }
  return (
    <div className='col-lg-12 p-2 highlight-selected rounded'>
      <div className="d-flex w-100 justify-content-between align-items-center">
        {/* <Avatar sx={{ width: 32, height: 32 }} alt="avata" src={con.isGroupChat ? con.group_image : getImageConversation(user, con)} /> */}
        <img width="32" height="32" className='rounded-circle' alt="100x100" src={con.isGroupChat ? con.group_image : getImageConversation(user, con)} />
        <div className='container-fluid px-2'>
          {/* <div className='w-50 overflow-hidden mh-60'> */}
          <div className='row'>
            <div className='col-lg-7'>
              <Box component="p" sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                mb: 0,
                px: 2
              }}>{!con.isGroupChat ? getNameConversation(user, con) : con.chat_name}</Box>
            </div>
            <div className='col-lg-5'>
              <p className='mb-0 text-end'>{con.latestMessage && formatDate(con.latestMessage.createdAt)}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-7'>
              {(con.latestMessage && con.latestMessage.type === 'text') && <Box component="p" sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                mb: 0,
                px: 2
              }}>{con.latestMessage.content}</Box>}
              {(con.latestMessage && con.latestMessage.type === 'image') && <Box component="p" sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                mb: 0,
                px: 2
              }}>Hình ảnh</Box>}
              {(con.latestMessage && con.latestMessage.type === 'file') && <Box component="p" sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                mb: 0,
                px: 2
              }}>File</Box>}
              {(con.latestMessage && con.latestMessage.type === 'video') && <Box component="p" sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                mb: 0,
                px: 2
              }}>Video</Box>}
            </div>
            <div className='col-lg-5'>
              {/* {notificationContext.notifications.filter(e => e.type == 'text').some(i => i.id === con._id) && <p className='mb-0 text-danger text-end'>1</p>} */}
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default BoxConversation