import React from 'react';
import {Nav, Container} from 'react-bootstrap'

function Navbar() {
    return (
        <Nav>
            <Container>
                <Nav.Item>
                    <Nav.Link href='/'>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/users'>User</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/companies'>Company</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/suppliers'>Supplier</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/buyers'>Buyer</Nav.Link>
                </Nav.Item>
            </Container>
        </Nav>
    );
}

export default Navbar;