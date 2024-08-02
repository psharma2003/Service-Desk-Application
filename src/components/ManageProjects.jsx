import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CreateProject from "./CreateProject";

const Project = (props) => (
    <tr>
        <td>{props.project.name}</td>
        <td>
            <a href="#" onClick={() => { 
                if(window.confirm('Are you sure you want to delete this project?')) 
                    props.deleteProject(props.project._id) 
            }} 
            className="badge badge-danger">Delete</a>
        </td>
    </tr>
);

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:5000/projects/');
                setProjects(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProjects();
    }, []);


    const deleteProject = async (id) => {
        try {
            const res = await axios.delete('http://localhost:5000/projects/' + id);
            console.log(res.data);
            setProjects(projects.filter(el => el._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const getProjects = () => {
        return projects.map(currentProject => (
            <Project
                project={currentProject} 
                deleteProject={deleteProject}
                key={currentProject._id}
            />
        ));
    };

    return (
        <div>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    { getProjects() }
                </tbody>
            </table>
            <br />
            <CreateProject />
        </div>
    );
};

export default ManageProjects;
