import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from './TicketDisplay';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tickets/')
            .then(res => {
                setTickets(res.data);
            })
            .catch(error => console.log(error));
    }, []);

    const deleteTicket = (id) => {
        axios.delete(`http://localhost:5000/tickets/${id}`)
            .then(res => {
                console.log(res.data);
                setTickets(tickets.filter(el => el._id !== id));
            })
            .catch(error => console.log(error));
    };

    const getOpenList = () => {
        return tickets
            .filter(ticket => ticket.status !== 'Resolved')
            .map(currentTicket => (
                <Ticket 
                    ticket={currentTicket} 
                    deleteTicket={deleteTicket}
                    key={currentTicket._id}
                />
            ));
    };

    const getResolvedList = () => {
        return tickets
            .filter(ticket => ticket.status === 'Resolved')
            .map(currentTicket => (
                <Ticket 
                    ticket={currentTicket} 
                    deleteTicket={deleteTicket}
                    key={currentTicket._id}
                />
            ));
    };

    return (
        <div>
            <br />
            <h3>Open Tickets</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Project</th>
                        <th>Assigned To</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getOpenList()}
                </tbody>
            </table>
            <br />
            <h3>Resolved Tickets</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Project</th>
                        <th>Assigned To</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getResolvedList()}
                </tbody>
            </table>
        </div>
    );
};

export default TicketList;
