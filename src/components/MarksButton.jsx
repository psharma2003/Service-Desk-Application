import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarkButton = (props) => {
    const [ticket, setTicket] = useState({
        title: '',
        description: '',
        projectName: '',
        assignee: '',
        priority: '',
        status: '',
        type: '',
        users: [],
        projects: [],
        isLoading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ticketRes, usersRes, projectsRes] = await Promise.all([
                    axios.get(`http://localhost:5000/tickets/${props.ticketID}`),
                    axios.get('http://localhost:5000/users/'),
                    axios.get('http://localhost:5000/projects/')
                ]);

                setTicket({
                    title: ticketRes.data.title,
                    description: ticketRes.data.description,
                    projectName: ticketRes.data.projectName,
                    assignee: ticketRes.data.assignee,
                    priority: ticketRes.data.priority,
                    status: ticketRes.data.status,
                    type: ticketRes.data.type,
                    users: usersRes.data.map(user => user.name),
                    projects: projectsRes.data.map(project => project.name),
                    isLoading: false,
                    error: null
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setTicket({
                    ...ticket,
                    isLoading: false,
                    error: 'Failed to load data'
                });
            }
        };

        fetchData();
    }, [props.ticketID]);

    const handleClick = (e) => {
        e.preventDefault();

        // Toggle status between 'Resolved' and 'Open'
        const newStatus = ticket.status !== 'Resolved' ? 'Resolved' : 'Open';

        // Update status in state
        setTicket({
            ...ticket,
            status: newStatus
        });

        // Prepare updated ticket data
        const updatedTicket = {
            title: ticket.title,
            description: ticket.description,
            projectName: ticket.projectName,
            assignee: ticket.assignee,
            priority: ticket.priority,
            status: newStatus,
            type: ticket.type
        };

        // Send update request to server
        axios.post(`http://localhost:5000/tickets/update/${props.ticketID}`, updatedTicket)
            .then(res => {
                console.log(res.data);
                alert('Successfully updated.');
            })
            .catch(error => {
                console.error('Error updating ticket:', error);
                alert('Failed to update ticket.');
            });
    };

    if (ticket.isLoading) {
        return <p>Loading...</p>; // Add a loading indicator
    }

    if (ticket.error) {
        return <p>Error: {ticket.error}</p>; // Handle error state
    }

    return (
        <a href="#" onClick={handleClick} className={ticket.status !== 'Resolved' ? "badge badge-success" : "badge badge-secondary"}>
            {ticket.status !== 'Resolved' ? 'Mark as Resolved' : 'Mark as Open'}
        </a>
    );
};

export default MarkButton;
