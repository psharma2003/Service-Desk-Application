import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProject = () => {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        axios.get('http://localhost:5000/projects/')
            .then(res => {
                if (res.data.length > 0) {
                    setProjects(res.data.map(project => project.name));
                }
            })
            .catch(error => console.log('Error fetching projects:', error));
    }

    const onChangeName = (e) => {
        setName(e.target.value);
        setError('');
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            setError('Please enter a project name.');
            return;
        }

        const project = { name };

        axios.post('http://localhost:5000/projects/create', project)
            .then(res => {
                console.log('Project created:', res.data);
                setSuccessMessage('Project created successfully!');
                setName('');
                fetchProjects(); // Auto-fetch updated project list
            })
            .catch(err => console.log('Error creating project:', err));
    }

    return (
        <div>
            <h3>Create New Project</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Project: </label>
                    <input type="text"
                           className="form-control"
                           value={name}
                           onChange={onChangeName}
                    />
                </div>
                {error && <div className="text-danger">{error}</div>}
                {successMessage && <div className="text-success">{successMessage}</div>}
                <div className="form-group">
                    <input type="submit"
                           value="Create Project"
                           className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default CreateProject;
