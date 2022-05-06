import React, { useEffect, useState } from 'react'
import Post from './Post';
import axios from 'axios';
import useAuth from '../context/AuthContext';
import Status from './Status';
import CircularProgress from '@mui/material/CircularProgress';

const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  axios.defaults.baseURL = "http://localhost:5000";
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${user.accessToken}`
    },
  };
  const getListPost = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get("/api/posts", config);
      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getListPost();
    return () => {
      setPosts([]);
    }
  }, [])
  return (
    <div className='row justify-content-center mt-2'>
      <div className='col-md-7'>
        <div className='row'>
          <div className='col-md-9'>
            {/* dang bai */}
            <Status updateList={getListPost} setPosts={setPosts} />
            {isLoading &&
              <div className='row justify-content-center'>
                <div className='col-md-3'>
                  <CircularProgress />
                </div>
              </div>}
            {posts.map((e, i) => (
              <Post key={i} post={e} />
            ))}
            {/* post */}
          </div>
          <div className='col-md-3'>
            right bar
          </div>
        </div>
      </div>
    </div>

  )
}

export default Feed