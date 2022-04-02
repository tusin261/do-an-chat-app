import axios from 'axios';
import React, { useState } from 'react'
import useAuth from '../context/AuthContext';

const Search = () => {
    const { user } = useAuth();
    const [listResult, setListResult] = useState([]);
    axios.defaults.baseURL = "http://localhost:5000";
    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`
        },
    };
    const handleChange = async (e) => {
        const keyword = e.target.value;
        try {
            const rs = await axios.get("/api/users?q=" + keyword, config);
            setListResult(rs.data);
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className="mb-3 mt-3 position-relative">
            <input type="text" className="form-control" onChange={handleChange} />
            <div className='w-100 position-absolute'>
                <ul className="list-group">
                    {listResult.length > 0 && listResult.map((item, index) => (
                        <li className="list-group-item" key={index}>
                            <div className="d-flex w-100 align-items-center">
                                <img width="64" height="64" className='rounded-circle' alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg" />
                                <div className='ms-3'>
                                    <p>{item.last_name} {item.first_name}</p>
                                    <p>{item.email}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

    )
}

export default Search