import React from 'react'
import BoxConversation from './BoxConversation'

const Sidebar = () => {
  return (
    <div className='col-lg-12'>
        <div className='list-group'>
            <BoxConversation />
            <BoxConversation />
            <BoxConversation />
            <BoxConversation />
            <BoxConversation />
            {/* <BoxConversation />
            <BoxConversation />
            <BoxConversation />
            <BoxConversation />
            <BoxConversation />
            <BoxConversation />
            <BoxConversation />
            <BoxConversation />             */}
        </div>
    </div>
  )
}

export default Sidebar