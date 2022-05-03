import React from 'react'
import Avatar from '@mui/material/Avatar';
import { IconButton, Input, TextField, Tooltip } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
const Status = () => {
    return (
        <div className='row mb-2'>
            <div className='col-md-12 border rounded'>
                <div className='row p-2 align-items-center'>
                    <div className='col-md-1'>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </div>
                    <div className='col-md-11'>
                        <TextField
                            placeholder='Hello world' fullWidth multiline
                            maxRows={3} variant='standard' size='small'
                        />
                    </div>
                </div>

                <div className='row justify-content-end p-2'>
                    <div className='col-md-9'>
                        <Tooltip title="Ảnh">
                            <IconButton sx={{ mr: 2 }}>
                                <ImageIcon color="primary" sx={{ fontSize: 24 }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Video">
                            <IconButton>
                                <MovieIcon color="primary" sx={{ fontSize: 24 }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className='col-md-2'>
                        <button className='btn btn-primary'>Đăng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Status