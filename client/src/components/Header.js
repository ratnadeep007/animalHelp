import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { AUTH_TOKEN } from './constants';

class Header extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN);
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Animals</NavbarBrand>
                
                <Nav style={styles.spaces} className="ml-auto" navbar>
                    {/* <NavItem>
                        <Link to="/">Home</Link>
                    </NavItem> */}
                    <NavItem>
                        {authToken && (
                            <Button>
                                <Link style={styles.link} to="/create">New</Link>  
                            </Button>
                        )}
                    </NavItem>
                    <NavItem>
                        {authToken ? (
                            <Button
                                onClick={() => {
                                    localStorage.removeItem(AUTH_TOKEN)
                                    this.props.history.push('/')
                                }}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button>
                                <Link style={styles.link} to="/login">Login</Link>
                            </Button>
                        )}
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

const styles = {
    spaces: {
        flex: 1,
        justifyContent: 'space-between',
        alignItem: 'center'
    },
    link: {
        color: 'white'
    }
}

export default withRouter(Header);