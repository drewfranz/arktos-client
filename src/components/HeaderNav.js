import React from "react";
import { Navbar } from 'reactstrap';

import { MainNav, AuthNav} from "../components";

const HeaderNav = () => {
    return (
        <Navbar
            expand="lg"
            className="navbar-light bg-light"
        >
            <div className="navbar-brand logo" />
            <MainNav />
            <AuthNav />
        </Navbar>
    );
};

export default HeaderNav;