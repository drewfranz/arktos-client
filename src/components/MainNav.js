import { NavLink } from "react-router-dom";
import { NavItem } from 'reactstrap';

import { Nav } from 'reactstrap';

import React from "react";

const MainNav = () => (
    <Nav className="mr-auto navbar-nav">
        <NavItem>
            <NavLink
                to="/"
                exact
                className="nav-link"
                activeClassName="active"
            >
                Home
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink
                to="/tasks"
                exact
                className="nav-link"
                activeClassName="active"
            >
                Tasks
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink
                to="/profile"
                exact
                className="nav-link"
                activeClassName="active"
            >
                Profile
            </NavLink>
        </NavItem>
    </Nav>
    );
    
    export default MainNav;
    