import React from "react";
import { Nav, NavItem } from 'reactstrap';

import AuthenticationButton from "./AuthenticationButton";

const AuthNav = () => (
  <Nav>
    <NavItem>
      <AuthenticationButton />
    </NavItem>
  </Nav>
);

export default AuthNav;