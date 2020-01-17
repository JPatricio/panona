import React from 'react';

import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

import './header.css'

class Header extends React.Component{
    render() {
        const logged_out_nav = (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Panona</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="ml-auto">
                        <LinkContainer to="/login">
                            <NavItem>Login</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/register">
                            <NavItem>Signup</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

        const logged_in_nav = (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Panona</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/collection">Collection</Nav.Link>
                            <Nav.Link href="/market">Market</Nav.Link>
                            <Nav.Link href="/work">Work</Nav.Link>
                        </Nav>
                        <Nav>
                            <Navbar.Text>
                                {this.props.experience} exp, {this.props.money} $, {this.props.gems} &, <strong>{this.props.username}</strong> <em onClick={this.props.handle_logout}>logout</em>
                            </Navbar.Text>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        );

        return (
            <div>
                {this.props.logged_in ? logged_in_nav : logged_out_nav}
            </div>
        )
    }
}

export default Header;