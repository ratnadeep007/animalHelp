import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AUTH_TOKEN } from './constants';

class Header extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN);
        return (
            <div>
                <div>
                    <div>Animals</div>
                    <Link to="/" >new</Link>|
                    {authToken && (
                        <div>
                            |
                            <Link to="/create">submit</Link>
                        </div>
                    )}
                </div>
                <div>
                    {authToken ? (
                        <div
                            onClick={() => {
                                localStorage.removeItem(AUTH_TOKEN)
                                this.props.history.push('/')
                            }}
                        >
                            Logout
                        </div>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(Header);