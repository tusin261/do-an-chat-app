import React, { useEffect, useState, useRef } from 'react'
import BoxConversation from './BoxConversation'
import axios from 'axios'
import useAuth from '../context/AuthContext';
import Search from './Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const Sidebar = ({ setSelectedConversation, messages,noti,setNoti }) => {
  const { user } = useAuth();
  const [conversation, setConversation] = useState([]);

  //group
  const [groupChatName, setGroupChatName] = useState('');
  const [listResult, setListResult] = useState([]);
  const [listMember, setListMember] = useState([]);


  const inputSearch = useRef();

  axios.defaults.baseURL = "http://localhost:5000";
  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${user.accessToken}`
    },
  };

  const getList = async () => {
    try {
      const rs = await axios.get("/api/chats", config);
      const listConversation = rs.data;
      setConversation(listConversation);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickConversation = (conversations)=>{
    setSelectedConversation(conversations);
    const newListNoti = noti.filter(i=>i !== conversations._id);
    setNoti(newListNoti);
  }

  const handleClickItemInList = (item) => {
    const existedMember = listMember.find(i => i._id === item._id);
    if (existedMember) {
      //do sth
      return;
    } else {
      setListMember([...listMember, item]);
      setListResult([]);
      inputSearch.current.value = '';
    }
  }

  const searchMember = async (e) => {
    const keyword = e.target.value;
    try {
      const rs = await axios.get("/api/users?q=" + keyword, config);
      setListResult(rs.data);
    } catch (error) {
      console.log(error)
    }
  }

  const removerFromGroup = (userFromGroup) => {
    const newGroup = listMember.filter(u => u._id !== userFromGroup._id);
    setListMember(newGroup);
  }

  const handleResetModal = ()=>{
    setListMember([]);
  }

  const createGroup = async ()=>{
    const jsonData = {
      chat_name:groupChatName,
      member:JSON.stringify(listMember.map((u)=>u._id))
    }
    try {
      const {data} = await axios.post("/api/chats/group",jsonData,config);
      setListMember([...listMember,data]);
      setSelectedConversation(data);
      setListMember([]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getList();
  }, [messages]);


  return (
    <div className='col-lg-12'>
      <button className='btn btn-primary mt-2' data-bs-toggle="modal" data-bs-target="#modalGroup">Tạo Group Chat <AddOutlinedIcon /></button>
      <div className="modal fade" id="modalGroup" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleResetModal}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" onChange={(e) => setGroupChatName(e.target.value)} placeholder='Nhập tên nhóm' />
                </div>
                <div className="mb-1">
                  <input type="text" className="form-control" ref={inputSearch} onChange={searchMember} placeholder='Nhập tên để thêm vào nhóm' />
                </div>
                <div className='mb-1 d-flex flex-wrap'>
                  {listMember.length > 0 && listMember.map((user, index) => (
                    <div key={user._id} className='col-lg-2 bg-danger d-flex text-white p-2 border rounded'>
                      <p className='mb-0'>{user.first_name}</p>
                      <span className='bg-danger ms-2' onClick={() => removerFromGroup(user)}>x</span>
                    </div>
                  ))}
                </div>
                <ul className="list-group">
                  {listResult.length > 0 && listResult.map((item, index) => (
                    <li className="list-group-item" key={index} onClick={() => handleClickItemInList(item)}>
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
              </form>
              <div className='d-flex justify-content-end'>
                <button className='btn btn-primary mt-1' data-bs-dismiss="modal" onClick={createGroup}>Tạo nhóm</button>
              </div>

            </div>

          </div>
        </div>
      </div>
      <Search conversation={conversation} setConversation={setConversation} setSelectedConversation={setSelectedConversation} />

      <div className='list-group'>
        {conversation.map(c => (
          <div key={c._id} onClick={() => {
            handleClickConversation(c)
          }}>
            <BoxConversation con={c} noti={noti} setNoti={setNoti} />

          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar