import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import { Link } from '../routes';


export default () => {
    return(
        <div>
            <style jsx>{`
                div {
                    font-family: 'Balsamiq Sans', cursive;
                }
                
                
                .nav-custom {
                    font-size: 1.3em;
                }
            `}
            </style>
            <title>Coinraiser</title>
            <script src="https://kit.fontawesome.com/fb313218bc.js" crossorigin="anonymous"></script>
            <span className='nav-custom'>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/"><i className="fab fa-bitcoin fa-lg"></i> Coinraiser</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <hr className='d-lg-none' />
                        <Nav className="mr-auto">
                            <Nav.Link href="#">Campaign</Nav.Link>
                        </Nav>
                        <hr className='d-lg-none' />
                        <Link route="/campaigns/create/">
                            <Button 
                                content="Create Campaign"
                                icon="add circle"
                                primary
                            />
                        </Link>
                    </Navbar.Collapse>
                </Navbar>
            </span>
        </div>
    )
};
