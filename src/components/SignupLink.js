import React from "react";
import { Nav, NavItem, NavLink} from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = () => {
    const { loginWithRedirect } = useAuth0();
    const handleOnClick = e => {
        e.PreventDefault();
        loginWithRedirect({
            screen_hint: "signup",
        });
    }
    return (
        <NavItem>
            <NavLink href="/tasks" onClick={handleOnClick}>Signup</NavLink>
        </NavItem>
        );
    };
    
    export default SignupButton;