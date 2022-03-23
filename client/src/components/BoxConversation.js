import React from 'react'

const BoxConversation = () => {
  return (
    <div className='col-lg-12 p-2'>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <img width="64" height="64" className='rounded-circle' alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" />
        <div className='w-50 overflow-hidden mh-80'>
          <p>Name</p>
          <p>Lastestopopopoooooo</p>
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