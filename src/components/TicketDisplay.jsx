import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MarkButton from './MarksButton';

const getPriorityStyle = (level) => {
    switch(level) {
        case 'Low': 
            return <td className="low-priority">{level}</td>;
        case 'Medium':
            return <td className="med-priority">{level}</td>;
        case 'High': 
            return <td className="high-priority">{level}</td>;
        default:
            return <td>{level}</td>;
    }
}

const Ticket = ({ ticket, deleteTicket }) => {
    const [ticketDetails, setTicketDetails] = useState({
        title: '',
        description: '',
        projectName: '',
        assignee: '',
        priority: '',
        status: '',
        type: ''
    });

    useEffect(() => {
        // Fetch ticket details when component mounts
        axios.get(`http://localhost:5000/tickets/${ticket._id}`)
            .then(res => {
                const { title, description, projectName, assignee, priority, status, type } = res.data;
                setTicketDetails({ title, description, projectName, assignee, priority, status, type });
            })
            .catch(error => console.log(error));
    }, [ticket._id]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            deleteTicket(ticket._id);
        }
    };

    return (
        <tr>
            <td>{ticketDetails.title}</td>
            <td>{ticketDetails.description}</td>
            <td>{ticketDetails.projectName}</td>
            <td>{ticketDetails.assignee}</td>
            {getPriorityStyle(ticketDetails.priority)}
            <td>{ticketDetails.status}</td>
            <td>{ticketDetails.type}</td>
            <td>
                <Link to={`/edit/${ticket._id}`} className="badge badge-info">Edit</Link>
                <br />
                <a href="#" onClick={handleDelete} className="badge badge-danger">Delete</a>
                <br />
                <MarkButton mark={ticketDetails.status} ticketID={ticket._id} />
            </td>
        </tr>
    );
};

export default Ticket;
