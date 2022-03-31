import React from 'react'
import {formatDate} from '../services/Format/FormatDateAndTime'
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
                            <p className='mb-0 bg-primary p-1 rounded text-dark text-center'>{message.content}</p>
                            <h6 className='mb-0 p-1 text-end small'>Da xem</h6>
                        </div> :
                        <div className='ms-2 p-2'>
                            <h6 className='mb-0 p-1 text-end small'>{message.sender_id.first_name}, {formatDate(message.createdAt)}</h6>
                            <p className='mb-0 bg-light p-1 rounded text-dark text-center'>{message.content}</p>
                            <h6 className='mb-0 p-1 text-start small'>Da xem</h6>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Message