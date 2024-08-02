import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateUser from "./CreateUser";

const User = ({ user, deleteUser }) => (
    <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
            <a 
                href="#" 
                onClick={() => { 
                    if (window.confirm('Are you sure you want to delete this user?')) {
                        deleteUser(user._id);
                    }
                }} 
                className="badge badge-danger"
            >
                Delete
            </a>
        </td>
    </tr>
);

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        axios.get('http://localhost:5000/users/')
            .then(res => setUsers(res.data))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = (id) => {
        axios.delete('http://localhost:5000/users/' + id)
            .then(res => console.log(res.data));
        
        setUsers(users.filter(user => user._id !== id));
    };

    const getUsers = () => {
        return users.map(currentUser => (
            <User 
                user={currentUser} 
                deleteUser={deleteUser} 
                key={currentUser._id} 
            />
        ));
    };

    return (
        <div>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getUsers()}
                </tbody>
            </table>
            <br />
            <CreateUser />
        </div>
    );
};

export default ManageUsers;
