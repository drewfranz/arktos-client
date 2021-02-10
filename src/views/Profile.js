import React from "react";
import { Row, Col, Container } from 'reactstrap';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Loading } from "../components";

const Profile = () => {
    const { user } = useAuth0();
    const { name, picture } = user;
    
    return (
        <Container className="py-5">
            <Row className="align-items-center profile-header">
                <Col md="2" className="mb-3 pb-3">
                    <img
                        src={picture}
                        alt="Profile"
                        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                    />
                </Col>
                <Col className="text-center text-md-left">
                    <h2>{name}</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <pre className="text-light bg-dark p-4">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </Col>
            </Row>
        </Container>
    );
};

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <Loading />,
});