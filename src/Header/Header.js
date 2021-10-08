import { Avatar } from '@mui/material';
import React from 'react';
import {Container,Navbar,Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';




const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="ms-auto my-2 my-lg-0 align-items-center"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <NavLink id="UserName" className="mx-3 text-light text-decoration-none" to="/home">Home</NavLink>
                <NavLink id="UserName" className="mx-3 text-light text-decoration-none" to="/user">User Name</NavLink>
                <NavLink id="UserEmail" className="mx-3 text-light text-decoration-none" to="/email">Email</NavLink>
                <NavLink className="mx-3 text-light text-decoration-none" to="/home">
                <Avatar alt="Remy Sharp" src="https://lh3.googleusercontent.com/a-/AOh14GiybxsKTuYA3NA-DWdGQocxtVBh8VdLOE1mnoRudA=s96-c" />
                </NavLink>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
};

export default Header;