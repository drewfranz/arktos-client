import React from "react";
import { Button } from "reactstrap"
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Button
            color="secondary"
            onClick={() => loginWithRedirect()}
        >
            Log In
        </Button>
        );
    };
    
    export default LoginButton;