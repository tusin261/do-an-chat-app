import React from 'react'
import useAuth from '../context/AuthContext';

const Topbar = () => {
  const {user} = useAuth();
  return (
    <nav className='navbar navbar-expand-lg'>
            <a href='#' className='navbar-brand'>Test</a>
            <div className='collapse navbar-collapse'>
                <ul className='navbar-nav ms-auto'>
                    <li className='nav-item'><a className='nav-link' href='#'>Logo thong bao {user.first_name}</a></li>
                    <li className='nav-item'><a className='nav-link' href='#'>Avatar and dropdow link gom link thong tin user va logout</a></li>
                </ul>
            </div>
    </nav>
  )
}

export default Topbar