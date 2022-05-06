import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Box, CardHeader, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { pink } from '@mui/material/colors';
import axios from 'axios';
import useAuth from '../context/AuthContext';
const Post = ({ post }) => {
    const { user } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [like, setLike] = useState(post.likes.length);
    axios.defaults.baseURL = "http://localhost:5000";
    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`
        },
    };

    useEffect(()=>{
        setIsLiked(post.likes.some(e=>e._id == user._id));
    },[post.likes])

    const handleLike = async () => {
        const json = {};
        try {
            const { data } = await axios.put("/api/posts/"+post._id+"/like",json, config);
        } catch (error) {
            console.log(error);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }



    return (
        <div className='row mb-2'>
            <Card sx={{ maxWidth: 1 }}>
                <div className='col-md-12'>
                    <div className='row p-2 align-items-center'>
                        <div className='col-md-1'>
                            <Avatar alt="Remy Sharp" src={post.userId.image_url} />
                        </div>
                        <div className='col-md-11'>
                            <div className='col-md-12'>{post.userId.first_name}</div>
                            <div className='col-md-12'>{post.userId.createdAt}</div>
                        </div>
                    </div>
                </div>
                <CardContent sx={{ p: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        {post.desc}
                    </Typography>
                </CardContent>
                {(post.content && post.type == 'image') &&
                    <CardMedia
                        component="img"
                        sx={{ maxHeight: 614 }}
                        image={post.content}
                        alt="green iguana"
                    />}
                {(post.content && post.type == 'video') &&
                    <CardMedia
                        component="video"
                        sx={{ maxHeight: 614 }}
                        image={post.content} controls
                    />}
                <CardActions sx={{ px: 0 }}>
                    <FavoriteIcon onClick={handleLike} sx={{ mr: 2, color: isLiked ? '#FD5D5D' : '#808080' }} />
                    <Typography variant="body2" color="text.secondary">
                        {like} lượt thích
                    </Typography>
                    {(like > 10) && <Typography component="div">
                        <b>{post.likes[0].first_name},{post.likes[1].first_name} </b>
                        và {like} người khác
                    </Typography>}
                </CardActions>
            </Card>
        </div>
    )
}

export default Post