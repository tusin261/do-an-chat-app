import React from 'react'
import useAuth from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import "../components/Chat.css";

const Topbar = () => {
  const { user } = useAuth();
  return (
    <nav className='navbar navbar-expand-lg'>
      <a href='#' className='navbar-brand'>Test</a>
      <div className='collapse navbar-collapse '>
        <ul className='navbar-nav ms-auto d-flex col-1 justify-content-between align-items-center'>
          <li className='nav-item'><a className='nav-link' href='#'><FontAwesomeIcon icon={['fas', 'bell']} size="xl" /></a></li>
          <li className='nav-item'>      
            <img id="imageDropdown" data-toggle="dropdown" width="32" height="32" className='rounded-circle' alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" />
              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Topbar