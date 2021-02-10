import React from "react";
import { Nav, NavLink} from 'reactstrap';
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
        <>
            <Nav>
                <NavLink href="/signup" onClick={handleOnClick}>Signup</NavLink>
            </Nav>
        </>
        );
    };
    
    export default SignupButton;