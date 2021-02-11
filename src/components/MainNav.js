import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";

const MainNav = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <>
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
                {isAuthenticated &&
                    <>
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
                    </>
                }
            </Nav>
        </>
    );
};

export default MainNav;
    