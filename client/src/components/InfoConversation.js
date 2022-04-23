import React, { useRef, useState, useEffect, useContext } from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useAuth from '../context/AuthContext';
import axios from 'axios';
import {NotificationContext} from '../context/NotificationContext'
import ModalDetailConversation from './ModalDetailConversation';
import ModalVideoChat from './ModalVideoChat';

const InfoConversation = ({ selectedConversation, setSelectedConversation,socket,listImage,listFile }) => {
    const { user } = useAuth();
    // !selectedConversation.isGroupChat ? getNameConversation(user, selectedConversation) : selectedConversation.chat_name    
    const [loading, setLoading] = useState(false);
    const [showDetailConversation, setShowDetailConversation] = useState(false);
    //video call
    const [showVideoCall,setShowVideoCall] = useState(false)

    //conversationState,conversationDispatch
    const notificationContext = useContext(NotificationContext);

    axios.defaults.baseURL = "http://localhost:5000";
    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`
        },
    };
    const callVideo = ()=>{
        
        setShowVideoCall(true);
        
    }
    const showDetailModal = ()=>{
        setShowDetailConversation(true);
    }
    const getNameConversation = (user, conversation) => {
        return conversation.member[0]._id === user._id ? conversation.member[1].first_name : conversation.member[0].first_name;
    }
    const getImageConversation = (user,conversation)=>{
        return conversation.member[0]._id===user._id?conversation.member[1].image_url:conversation.member[0].image_url;
      }
    // const handleClickItemInList = (item) => {
    //     const existedMember = listMember.find(i => i._id === item._id);
    //     const existedMemberinConversation = selectedConversation.member.find(i => i._id === item._id);
    //     if (existedMember || existedMemberinConversation) {
    //         setError(true);
    //         return;
    //     } else {
    //         setListMember([...listMember, item]);
    //         setListResult([]);
    //         inputSearch.current.value = '';
    //     }
    // }

    return (
        <div className='col-lg-12 border rounded'>
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <div className='d-flex p-2'>
                    <img width="42" height="42" className='rounded-circle' alt="100x100" src={selectedConversation.isGroupChat?selectedConversation.group_image:getImageConversation(user,selectedConversation)} />
                    <div className='ms-2'>
                        <h5 className='mb-0'>{!selectedConversation.isGroupChat ? getNameConversation(user, selectedConversation) : selectedConversation.chat_name}</h5>
                        <span><FiberManualRecordIcon style={{ fontSize: 16, color: "#B6FFCE" }} /></span>
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                    <span><CallIcon style={{ fontSize: 38, color: "blue" }} /></span>
                    <span className="btn" onClick={callVideo}><VideocamIcon style={{ fontSize: 38, color: "blue" }} /></span>
                    <span onClick={showDetailModal}  role="button"><MoreVertIcon style={{ fontSize: 38, color: "blue" }} /></span>
                    {showDetailConversation && <ModalDetailConversation 
                        showDetailConversation={showDetailConversation} 
                        onHide={() => setShowDetailConversation(false)} 
                        selectedConversation={selectedConversation} 
                        setSelectedConversation={setSelectedConversation} 
                        listImage={listImage} 
                        listFile={listFile} socket={socket} />}
                    {showVideoCall && <ModalVideoChat showVideoCall={showVideoCall} 
                                                        onHide={() => setShowVideoCall(false)}
                                                        socket={socket} />}
                </div>
            </div>
        </div>
    )
}

export default InfoConversation