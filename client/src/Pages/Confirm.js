import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import * as API from '../constants/ManageURL'

const Confirm = () => {
  const [user,setUser] = useState(null);
  let params = useParams();

  useEffect(()=>{
    console.log(params);
    const authEmail = async ()=>{
      try {
        const response = await axios.get(API.CONFIRM+"/"+params.userId);
        setUser(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    authEmail();
  },[])

  

  return (
    <div>{user? <p>Xác thực thành công với email {user.email}</p>:
                <p>Xác thực không thành công</p>}</div>
  )
}

export default Confirm