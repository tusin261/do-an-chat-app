import React, {useState ,useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import CircularProgress from '@mui/material/CircularProgress';

const ModalVideoChat = ({ showVideoCall, onHide, socket }) => {

    const videoRef = useRef();
    const [wait, setWait] = useState(true);
    useEffect(() => {
        const mediaStreamConstraints = {
            video: true,
            audio: true
        };
        navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(stream => {
            videoRef.current.srcObject = stream;
        }, err => console.log('Loi'));
    }, [videoRef])

    return (
        <Modal show={showVideoCall} onHide={onHide}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12 box-call px-0'>
                            {wait? <><CircularProgress /><p>Dang ket noi</p></> : <video className='mw-100' ref={videoRef} autoPlay></video>}
                            <div className='box-current'>
                                <video className='mw-100' ref={videoRef} autoPlay></video>
                            </div>
                        </div>
                    </div>
                </div>


            </Modal.Body>

        </Modal>
    )
}

export default ModalVideoChat