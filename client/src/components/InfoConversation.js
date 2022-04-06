import React from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const InfoConversation = () => {
    return (
        <div className='col-lg-12 border rounded'>
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <div className='d-flex p-2'>
                    <img width="42" height="42" className='rounded-circle' alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" />
                    <div className='ms-2'>
                        <h5 className='mb-0'>Name</h5>
                        <span><FiberManualRecordIcon style={{ fontSize: 16,color:"#B6FFCE" }} /></span>
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                    <span><CallIcon style={{ fontSize: 38,color:"blue" }}/></span>
                    <span><VideocamIcon style={{ fontSize: 38,color:"blue" }}/></span>
                    <span><MoreVertIcon style={{ fontSize: 38,color:"blue" }}/></span>
                </div>
            </div>
        </div>
    )
}

export default InfoConversation