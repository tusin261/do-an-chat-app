import React from 'react'
import { formatDate } from '../services/Format/FormatDateAndTime'
import "../components/Chat.css";

const Message = ({ message, own }) => {

    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    function getFileName(file) {
        const fullFile = file.split('.net/')[1];
        const fileName = fullFile.split('-filename-')[0];
        const fileType = fullFile.split('.')[1];
        const fileSize = fullFile.split('-size-')[1];
        const size = fileSize.split('.')[0];

        const infoFile = {
            filename: fileName,
            filetype: fileType,
            filesize: bytesToSize(size)
        }
        return infoFile;
    }
    console.log(message)
    return (
        <div className='col-lg-12 px-2'>
            <div className={own ? 'row justify-content-end' : 'row'}>
                <div className={own ? 'col-lg-6 d-flex flex-row-reverse' : 'col-lg-6 d-flex'}>
                    <div className='pt-3'>
                        <img width="48" height="48" className='rounded-circle' alt="100x100" src={message.sender_id.image_url} />
                    </div>
                    {/* <div className='ms-2 p-2'>
                            <h6 className='mb-0 p-1 text-start small'>12:00 PM</h6>
                            <div className='border rounded box-file d-flex flex-column'>
                                 <h5>file ke toan cuoi namfile ke toan cuoi nam .docx</h5>
                                 <p>82.5 MB</p>
                                 <hr />
                                 <button className='btn btn-primary-outline shadow-none '><b>Download</b></button>
                            </div>
                            <h6 className='mb-0 p-1 text-start small'>Da xem</h6>
                        </div> */}
                    {/* <div className='ms-2 p-2'>
                            <h6 className='mb-0 p-1 text-end small'>12:00 PM</h6>
                            <div className='border rounded box-file d-flex flex-column'>
                                 <h5>file ke toan cuoi namfile ke toan cuoi nam .docx</h5>
                                 <p>82.5 MB</p>
                                 <hr />
                                 <button className='btn btn-primary-outline shadow-none '><b>Download</b></button>
                            </div>
                            <h6 className='mb-0 p-1 text-end small'>Da xem</h6>
                        </div> */}
                    {own ?
                        <div className='ms-2 p-2'>
                            <h6 className='mb-0 p-1 text-end small'>{formatDate(message.createdAt)}</h6>
                            {message.type == 'text' && <p className='mb-0 bg-primary p-1 rounded text-dark text-center'>{message.content}</p>}
                            {message.type == 'image' && <img width="150" height="150" src={message.content} className='mb-0 p-1 img-thumbnail' />}
                            {message.type == 'file' && <div className='border rounded box-file d-flex flex-column'>
                                <h5 className='text-break'>{getFileName(message.content).filename}.{getFileName(message.content).filetype}</h5>
                                <p>{getFileName(message.content).filesize}</p>
                                <hr />
                                <a href={message.content} target="_blank" className='btn btn-primary-outline shadow-none '><b>Download</b></a>
                            </div>}
                            {message.type == 'video' && <video width="250" height="150" controls >
                                <source src={message.content} type="video/mp4" />
                            </video>}
                            <h6 className='mb-0 p-1 text-end small'>Da xem</h6>
                        </div> :
                        <div className='ms-2 p-2'>
                            <h6 className='mb-0 p-1 text-start small'>{message.sender_id.first_name}, {formatDate(message.createdAt)}</h6>
                            {message.type == 'text' && <p className='mb-0 bg-light p-1 rounded text-dark text-center'>{message.content}</p>}
                            {message.type == 'image' && <img width="150" height="150" src={message.content} className='mb-0 p-1 img-thumbnail' />}
                            {message.type == 'file' && <div className='border rounded box-file d-flex flex-column'>
                                <h5 className='text-break'>{getFileName(message.content).filename}.{getFileName(message.content).filetype}</h5>
                                <p>{getFileName(message.content).filesize}</p>
                                <hr />
                                <a href={message.content} target="_blank" className='btn btn-primary-outline shadow-none'><b>Download</b></a>
                            </div>}
                            {message.type == 'video' && <video width="250" height="150" controls >
                                <source src={message.content} type="video/mp4" />
                            </video>}
                            <h6 className='mb-0 p-1 text-start small'>Da xem</h6>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Message