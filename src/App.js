import React from 'react';
import { BrowserRouter as Router, Route  } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import components
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import CreateTicket from "./components/CreateTicket";
import CreateUser from "./components/CreateUser";
import ManageUsers from "./components/ManageUsers";
import ManageProjects from "./components/ManageProjects";
import EditTicket from "./components/EditTicket";

export default function App() {
  return (
    <Router>
        <Navbar />
        <div className="wrapper">
            <Sidebar />
            <div id="content">
                <Route path="/" exact component={Dashboard} />
                <Route path="/tickets/create" component={CreateTicket} />
                <Route path="/manage-users" component={ManageUsers} />
                <Route path="/users/create" component={CreateUser} />
                <Route path="/manage-projects" component={ManageProjects} />
                <Route path="/edit/:id" component={EditTicket} />
            </div>
        </div>
    </Router>
  );
}

