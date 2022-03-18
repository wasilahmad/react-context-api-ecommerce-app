import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CourseConsumer } from '../../context';

const Header = (props) => {
    return(
        <React.Fragment>
            <header>
                <Navbar fixed="top" bg="dark" variant="dark">
                    <div className="container">
                        <Navbar.Brand as={Link} to="/">Courses Portal</Navbar.Brand>
                        <Nav className="ml-auto">
                            <CourseConsumer>
                                {
                                    value => {
                                        return (
                                            <React.Fragment>
                                                {
                                                    !value.isUserLogin && 
                                                    <Nav.Link onClick={()=> value.openModal()}>Login</Nav.Link>
                                                }
                                                {
                                                    value.isUserLogin && 
                                                    <Nav.Link onClick={()=> value.logout()}>Logout</Nav.Link>
                                                }
                                                <Nav.Link as={Link} to="/cart" className="cart-nav">Cart { value.cart.length > 0 && <span>{value.cart.length}</span>}</Nav.Link>
                                            </React.Fragment>
                                        )
                                    }
                                }
                            </CourseConsumer>
                        </Nav>
                    </div>
                </Navbar>
            </header>
        </React.Fragment>
    )
}

export default Header;