import React from 'react'
import Post from './Post';

import Status from './Status';
const Feed = () => {
  return (
    <div className='row justify-content-center mt-2'>
      <div className='col-md-7'>
        <div className='row'>
          <div className='col-md-9'>
            {/* dang bai */}
            <Status />
            <Post />
            <Post />
            <Post />
            <Post />
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