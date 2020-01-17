import React, { Component } from 'react';

import {Container, Row, Col} from "react-bootstrap";

class Market extends Component {
    render() {
        return (
            <div>
                <h2>Market</h2>
                <Container>
                    <Row>
                        <Col sm>Random Card Pack</Col>
                        <Col sm>Empyrean Card Pack</Col>
                        <Col sm>Vosh Card Pack</Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Market;