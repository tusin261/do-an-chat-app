import React from 'react'

const Topbar = () => {
  return (
    <nav className='navbar navbar-expand-lg'>
        <div className='container'>
            <a href='#' className='navbar-brand'>Test</a>
            <div className='collapse navbar-collapse'>
                <ul className='navbar-nav ms-auto'>
                    <li className='nav-item'><a className='nav-link' href='#'>Logo thong bao</a></li>
                    <li className='nav-item'><a className='nav-link' href='#'>Avatar and dropdow link gom link thong tin user va logout</a></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Topbar