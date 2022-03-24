import React, { useContext } from 'react'
import Message from '../components/Message';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import useAuth, { AuthContext } from '../context/AuthContext'

const Chat = () => {
  const {user} = useAuth();
  return (
    <div className='container-fluid'>
            <div className='row'>
                <Topbar />
            </div>
            <div className='row justify-content-between h-100'>
                <div className='col-lg-3 vh-100 overflow-auto border rounded'>
                    <Sidebar />
                </div>
                <div className='col-lg-9'>
                    <div className='box-chat overflow-auto border rounded'>
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <input type='text' className="form-control w-65" />
                        <button className='btn btn-primary'>Gui</button>
                        <input type='file' id='hinhanh' className='d-none' />
                        <label htmlFor='hinhanh'>hinhanh</label>
                        <input type='file' id='filekhac' className='d-none' />
                        <label htmlFor='filekhac' >file khac</label>
                        <a className=''>dropdow link ...</a>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Chat