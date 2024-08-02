import React from 'react';
import StatusChart from "./charts/StatusChart";
import PriorityChart from "./charts/PriorityChart";
import TypeChart from "./charts/TypeChart";
import TicketList from "./TicketList";

const Dashboard = () => {
    return (
        <div>
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th><h3>Tickets by Status</h3></th>
                        <th><h3>Tickets by Priority</h3></th>
                        <th><h3>Tickets by Type</h3></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><StatusChart /></td>
                        <td><PriorityChart /></td>
                        <td><TypeChart /></td>
                    </tr>
                </tbody>
            </table>
            <TicketList />
        </div>
    );
};

export default Dashboard;
