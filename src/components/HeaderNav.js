import React from "react";
import { Nav, Navbar } from 'reactstrap';

import { MainNav, AuthNav} from "../components";

const HeaderNav = () => {
    return (
        <Navbar
            expand="lg"
            className="navbar-dark bg-primary"
        >
            <div className="navbar-brand logo" />
            <MainNav />
            <AuthNav />
        </Navbar>
    );
};

export default HeaderNav;