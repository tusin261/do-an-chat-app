import React from 'react'
import Message from '../components/Message'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const Chit = () => {
  return (
    <div className='container'>
        <div className='row'>
            <Topbar />
        </div>
        <div className='row justify-content-around'>
            <div className='col-lg-4 vh-100 overflow-auto border rounded'>
                <Sidebar />
            </div>
            <div className='col-lg-7 vh-100 overflow-auto border rounded'>
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
        </div>
    </div>
  )
}

export default Chit