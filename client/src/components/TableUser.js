import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Snackbar, Switch } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import useAuth from '../context/AuthContext';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ModalEditUser from './ModalEditUser';
const TableUser = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [total, setTotal] = useState(0);
    const [userByMonth, setUserByMonth] = useState(0);
    const [open, setOpen] = useState(false);
    const [userItem, setUserItem] = useState(null);
    const [successDelete, setSuccessDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState(false);
    const [rowDelete,setRowDelete] = useState();
    const [isSuccessUpdate,setIsSuccessUpdate] = useState(false);
    const [successLock, setSuccessLock] = useState(false);
    const [errorLock, setErrorLock] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();

    axios.defaults.baseURL = "http://localhost:5000";
    const config = {
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`
        },
    };

    useEffect(() => {
        getListUser();
        getUserByMonth();
    }, []);

    const getListUser = async () => {
        try {
            const { data } = await axios.get(`/api/admin`, config);
            setUsers(data);
            setTotal(data.length);
        } catch (error) {
            console.log(error);
        }
    }
    const getUserByMonth = async () => {
        try {
            const { data } = await axios.get(`/api/admin/getUsersByWeek`, config);
            setUserByMonth(data.length);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (u) => {
        updateStatusUser(u);
    };

    const updateStatusUser = async (u) => {
        const json = {
            isLock: true,
            isDelete: false,
            isChange: false,
            userId: u._id,
            verified: u.isVerified
        }
        try {
            const { data } = await axios.post(`/api/admin/updateUser`, json, config);
            const userUpdated = users.map(i => i._id == data._id ? { ...i, isVerified: data.isVerified } : i);
            setUsers(userUpdated);
            setSuccessLock(true);
            setErrorLock(false);
        } catch (error) {
            console.log(error.response.data.message);
            setErrorLock(true);
            setSuccessLock(false);
        }
    }



    const deleteUser = async () => {
        const json = {
            isLock: false,
            isDelete: true,
            isChange: false,
            userId: rowDelete._id,
        }
        try {
            const { data } = await axios.post(`/api/admin/updateUser`, json, config);
            const userUpdated = users.filter((i) => i._id != rowDelete._id);
            setUsers(userUpdated);
            setOpen(false);
            setSuccessDelete(true);
            setRowDelete(null);
            setTotal(total-1);
        } catch (error) {
            console.log(error);
            setErrorDelete(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setSuccessDelete(false);
        setErrorDelete(false);
        setIsSuccessUpdate(false);
        setErrorLock(false);
            setSuccessLock(false);
    };
    const search = async () => {
        const json = {
            first_name: nameRef.current.value,
            email: emailRef.current.value
        }
        try {
            const { data } = await axios.post(`/api/admin`, json, config);
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleCloseModal = () => {
        setShow(false);
        setUserItem(null);
    }

    const openDialog = (u) => {
        setOpen(true);
        setRowDelete(u);
    }
    const openModalEdit = (u) => {
        setUserItem(u);
    }
    useEffect(() => {
        if (!show) {
            setShow(true);
        }
    }, [userItem]);


    return (
        <div className='p-2'>
            <h4>Xin Ch??o !!!</h4>
            <div className='col-md-12 my-3'>
                <div className='row'>
                    <div className='col-md-4 border-end d-flex justify-content-center flex-column'>
                        <h4 className='text-center text-primary'>T???ng s??? ng?????i d??ng</h4>
                        <h5 className='text-center text-primary'>{total}</h5>
                    </div>
                    <div className='col-md-4 border-end border-start d-flex flex-column justify-content-center'>
                        <h4 className='text-center text-success'>Ng?????i d??ng m???i</h4>
                        <h5 className='text-center text-success'>{userByMonth}</h5>
                    </div>
                </div>
            </div>
            <h4>Danh S??ch Ng?????i D??ng</h4>
            <div className='col-md-12 my-3'>
                <div className='row align-items-center'>
                    <div className='col-md-9'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <input type='text' ref={nameRef} className='form-control' placeholder='Nh???p t??n c???n t??m ...' />
                            </div>
                            <div className='col-md-4'>
                                <input type='text' ref={emailRef} className='form-control' placeholder='Nh???p email c???n t??m ...' />
                            </div>
                            <div className='col-md-3'>
                                <button className='btn btn-primary' onClick={search}>T??m <span className='ms-2'><SearchIcon /></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-12 my-3'>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"X??a ng?????i d??ng n??y?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            D??? li???u c???a ng?????i d??ng n??y s??? kh??ng th??? kh??i ph???c n???u b???n nh???n
                            ?????ng ??.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>H???y</Button>
                        <Button onClick={deleteUser}>?????ng ??</Button>
                    </DialogActions>
                </Dialog>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="table">
                        <TableHead sx={{ backgroundColor: "orange" }}>
                            <TableRow >
                                <TableCell sx={{ color: "white", fontSize: 18 }}>H???</TableCell>
                                <TableCell sx={{ color: "white ", fontSize: 18 }} align="left">T??n</TableCell>
                                <TableCell sx={{ color: "white ", fontSize: 18 }} align="left">Gi???i T??nh</TableCell>
                                <TableCell sx={{ color: "white ", fontSize: 18 }} align="left">Email</TableCell>
                                <TableCell sx={{ color: "white ", fontSize: 18 }} align="left">Tr???ng Th??i</TableCell>
                                <TableCell sx={{ color: "white ", fontSize: 18 }} align="center">X??a</TableCell>
                                <TableCell sx={{ color: "white ", fontSize: 18 }} align="center">Ch???nh S???a</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.last_name}
                                    </TableCell>
                                    <TableCell align="left">{row.first_name}</TableCell>
                                    <TableCell align="left">{row.gender ? 'N???' : 'Nam'}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left"><Switch
                                        checked={row.isVerified}
                                        onChange={() => handleChange(row)}
                                        inputProps={{ 'aria-label': 'controlled' }} /></TableCell>

                                    <TableCell align="center">
                                        <IconButton color="error" onClick={() => openDialog(row)}>
                                            <ClearIcon />
                                        </IconButton>
                                        {/* dialog-------- */}

                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" onClick={() => openModalEdit(row)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {userItem && <ModalEditUser show={show}
                                onHide={handleCloseModal}
                                userItem={userItem} users={users}
                                setUsers={setUsers}
                                setShow={setShow} setIsSuccessUpdate={setIsSuccessUpdate} />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Snackbar open={successDelete} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    X??a ng?????i d??ng th??nh c??ng
                </Alert>
            </Snackbar>
            <Snackbar open={errorDelete} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    X??a ng?????i d??ng kh??ng th??nh c??ng
                </Alert>
            </Snackbar>
            <Snackbar open={isSuccessUpdate} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    C???p nh???t th??ng tin ng?????i d??ng th??nh c??ng
                </Alert>
            </Snackbar>
            <Snackbar open={errorLock} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Kh??a t??i kho???n kh??ng th??nh c??ng
                </Alert>
            </Snackbar>
            <Snackbar open={successLock} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Kh??a t??i kho???n th??nh c??ng
                </Alert>
            </Snackbar>
        </div>
    )
}

export default TableUser