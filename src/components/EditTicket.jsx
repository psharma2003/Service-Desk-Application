import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Open', 'In Progress', 'Resolved'];
const types = ['Bug/Error', 'Feature Request', 'Security', 'Other'];

const EditTicket = () => {
    const { id } = useParams();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [projectName, setProjectName] = useState('');
    const [assignee, setAssignee] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tickets/' + id)
            .then(res => {
                setTitle(res.data.title);
                setDescription(res.data.description);
                setProjectName(res.data.projectName);
                setAssignee(res.data.assignee);
                setPriority(res.data.priority);
                setStatus(res.data.status);
                setType(res.data.type);
            })
            .catch(error => console.log(error));

        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0) {
                    setUsers(res.data.map(user => user.name));
                }
            })
            .catch(error => console.log(error));

        axios.get('http://localhost:5000/projects/')
            .then(res => {
                if (res.data.length > 0) {
                    setProjects(res.data.map(project => project.name));
                }
            })
            .catch(error => console.log(error));
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();

        const ticket = {
            title,
            description,
            projectName,
            assignee,
            priority,
            status,
            type
        };

        axios.post('http://localhost:5000/tickets/update/' + id, ticket)
            .then(res => {
                console.log(res.data);
                alert('Successfully updated.');
                history.push('/');
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h3>Edit Ticket</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title: </label>
                    <input type="text"
                           required
                           className="form-control"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                           required
                           className="form-control"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Project: </label>
                    <select required
                          className="form-control"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}>
                          {
                            projects.map((project) => {
                            return <option key={project}
                                           value={project}>{project}
                                   </option>;
                            })
                          }
                    </select>
                </div>
                <div className="form-group">
                    <label>Assignee: </label>
                    <select required
                          className="form-control"
                          value={assignee}
                          onChange={(e) => setAssignee(e.target.value)}>
                          {
                            users.map((user) => {
                            return <option key={user}
                                           value={user}>{user}
                                   </option>;
                            })
                          }
                  </select>
                </div>
                <div className="form-group">
                    <label>Priority: </label>
                    <select required
                          className="form-control"
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}>
                          {
                              priorities.map((priority) => {
                              return <option key={priority}
                                             value={priority}>{priority}
                                     </option>;
                              })
                          }
                  </select>
                </div>
                <div className="form-group">
                    <label>Status: </label>
                    <select required
                          className="form-control"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}>
                          {
                              statuses.map((status) => {
                              return <option key={status}
                                             value={status}>{status}
                                     </option>;
                              })
                          }
                  </select>
                </div>
                <div className="form-group">
                    <label>Type: </label>
                    <select required
                          className="form-control"
                          value={type}
                          onChange={(e) => setType(e.target.value)}>
                          {
                              types.map((type) => {
                              return <option key={type}
                                             value={type}>{type}
                                     </option>;
                              })
                          }
                  </select>
                </div>
                <div className="form-group">
                    <input type="submit" value="Update Ticket" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default EditTicket;
