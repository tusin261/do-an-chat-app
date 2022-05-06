import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { pink } from '@mui/material/colors';

const Post = ({post}) => {
    const [isLiked,setIsLiked] = useState(false);
    const handleLike = ()=>{
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
                            <div className='col-md-12'>Shrimp and Chorizo Paella</div>
                            <div className='col-md-12'>September 14, 2016</div>
                        </div>
                    </div>
                </div>
                <CardContent sx={{ p: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ maxHeight: 614 }}
                    image="/assets/images/saxon-white-55XWhd2uGBM-unsplash.jpg"
                    alt="green iguana"
                />
                <CardActions sx={{ px: 0 }}>
                    <FavoriteIcon onClick={handleLike}  sx={{ mr: 2,color:isLiked ? '#FD5D5D':'#808080' }}/>
                    <Typography variant="body2" color="text.secondary">
                        900 người thích
                    </Typography>
                </CardActions>
            </Card>
        </div>
    )
}

export default Post