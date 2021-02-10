import React from 'react';
import { Row, Col, Container } from 'reactstrap';


const Home = () => {
    return (
        <section className="jumbotron text-center backgrount-white">
            <Container>
                <Row>
                    <Col>
                        <h1>Welcome to Arktos!</h1>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Home;
