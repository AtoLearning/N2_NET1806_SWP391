import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../styles/dashboard.css';

const URL = 'https://6666c4dca2f8516ff7a4d335.mockapi.io/staff';

const Dashboard = () => {

    const [staffs, setStaffs] = useState([]);

    const getListStaff = async () => {
        const res = await axios.get(`${URL}`);
        if (res.status === 200) {
            setStaffs(res.data);
        }
    }

    useEffect(() => {
        getListStaff();
    }, []);

    const [open, setOpen] = React.useState(false);
    const [delStaff, setDelStaff] = React.useState();

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure that you want to delete a staff with ID: ${id}`)) {
            const res = await axios.delete(`${URL}/${id}`);
            console.log(res.status);
            if (res.status === 200) {
                getListStaff();
                toast.success("Deleted Successfully ~");
            } else {
                toast.error("Delete: Error!");
            }
        }
    }

    const handleClickOpen = (id) => {
        setOpen(true);
        setDelStaff(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="staff-table">
            <div className="btn-add">
                <Link to={'/add/'}>
                    <button className='add-staff-btn'>ADD NEW STAFF</button>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Avatar</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {staffs && staffs.map((staff) => (
                        <tr key={staff.id}>
                            <td>{staff.id}</td>
                            <td>{staff.name}</td>
                            <td><img src={staff.avatar} alt={staff.id} /></td>
                            <td>{staff.age}</td>
                            <td>{staff.address}</td>
                            <td>{new Date(staff.createdAt * 1000).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/update/${staff.id}`}><button>Edit</button></Link>
                                <button onClick={() => handleClickOpen(staff.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to delete Staff?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you want to delete a staff with ID: {delStaff}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDelete(delStaff)} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
};

export default Dashboard;