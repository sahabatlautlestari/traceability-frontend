import React, {Component} from 'react';

import {Navbar, Nav, Container, Form, FormControl, Button} from 'react-bootstrap'


export default class MainNavbar extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            productCode: ''
        }
    }
    
    onChangeCode(e) {
        this.setState(
            {
                productCode: e.target.value
            }
        );
    }

    onSubmit(e) {
        e.preventDefault();    
        window.location = `/tracego/${this.state.productCode}`;
      }
    
    render() {
        return (
            <Navbar bg="light" expand="lg">
            <Container fluid="md">
                <Navbar.Brand href="/tracego">TraceGO</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                </Nav>
                <Form className="d-flex" onSubmit={this.onSubmit}>
                    <FormControl
                        type="search"
                        placeholder="Product Code"
                        className="me-2"
                        aria-label="Search"
                        value={this.state.productCode}
                        onChange={this.onChangeCode}
                    />
                    <Button variant="outline-primary" onClick={this.onSubmit}>Trace</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        );
    }
}