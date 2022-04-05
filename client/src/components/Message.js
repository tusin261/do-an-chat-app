import React from 'react'
import { formatDate } from '../services/Format/FormatDateAndTime'
const Message = ({ message, own }) => {

    
    return (
        <div className='col-lg-12 px-2'>
            <div className={own ? 'row justify-content-end' : 'row'}>
                <div className={own ? 'col-lg-6 d-flex flex-row-reverse' : 'col-lg-6 d-flex'}>
                    <div className='pt-3'>
                        <img width="48" height="48" className='rounded-circle' alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" />
                    </div>
                    {own ?
                        <div className='ms-2 p-2'>
                            <h6 className='mb-0 p-1 text-end small'>{formatDate(message.createdAt)}</h6>
                            {message.type=='text' && <p className='mb-0 bg-primary p-1 rounded text-dark text-center'>{message.content}</p>}
                            {message.type=='image' && <img width="150" height="150" src={message.content} className='mb-0 p-1 img-thumbnail' />}
                            <h6 className='mb-0 p-1 text-end small'>Da xem</h6>
                        </div> :
                        <div className='ms-2 p-2'>
                            <h6 className='mb-0 p-1 text-end small'>{message.sender_id.first_name}, {formatDate(message.createdAt)}</h6>
                            {message.type=='text' && <p className='mb-0 bg-light p-1 rounded text-dark text-center'>{message.content}</p>}
                            {message.type=='image' && <img width="150" height="150" src={message.content} className='mb-0 p-1 img-thumbnail' />}
                            <h6 className='mb-0 p-1 text-start small'>Da xem</h6>
                        </div>}


                    {/* <div className='ms-2 p-2'>
                        <h6 className='mb-0 p-1 text-end small'>9:00</h6>
                        <img width="150" height="150" src="https://images.unsplash.com/photo-1644982647844-5ee1bdc5b114?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" className='mb-0 p-1 img-thumbnail' />
                        <h6 className='mb-0 p-1 text-end small'>Da xem</h6>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Message