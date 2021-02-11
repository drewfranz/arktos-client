import React from 'react';
import { Row, Col, Container, Nav } from 'reactstrap';
import { AuthenticationButton, AuthNav, SignupLink } from '../components';



const Home = () => {
    return (
        <section className="jumbotron text-center backgrount-white">
            <Container>
                <Row>
                    <Col sm="6">
                        <img src="iceberg.png" alt="Arktos Logo" title="Arktos" />
                    </Col>
                    <Col sm="6" className="jumbotron-copy">
                        <h2>Arktos</h2>
                        <p>Task management made simple.<br />
                        Please note that Arktos is still in Pre-Alpha development.</p>
                        <Nav className="justify-content-center">
                            <SignupLink />
                            <AuthNav />
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Home;
