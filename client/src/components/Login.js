import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { AUTH_TOKEN } from './constants';

const registerMutation = gql`
    mutation register($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password)
    }
`;

const loginMutation = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;



class Login extends Component {
    state = {
        login: true,
        email: '',
        password: '',
        name: ''
    }

    render() {
        return (
            <div>
                <h4>{this.state.login ? 'Login' : 'Register'}</h4>
                <div>
                    {!this.state.login && (
                        <input
                            value = {this.state.name}
                            onChange = {e => this.setState({ name: e.target.value })}
                            type = "text"
                            placeholder = "name"
                    />)}
                    <input
                        value = {this.state.email}
                        onChange = {e => this.setState({ email: e.target.value })}
                        type = "text"
                        placeholder = "Email"
                    />
                    <input
                        value = {this.state.password}
                        onChange = {e => this.setState({ password: e.target.value })}
                        type = "password"
                        placeholder = "Password"
                    />
                </div>
                <div>
                    <div onClick={() => this._confirm()}>
                        {this.state.login? 'login' : 'create account'}
                    </div>
                    <div onClick={() => this.setState({ login: !this.state.login})}>
                        {this.state.login
                            ? 'need to create an account'
                            : 'already have an account'}
                    </div>
                </div>
            </div>
        )
    }

    _confirm = async () => {
        const { name, email, password } = this.state;
        if(this.state.login) {
            const result = await this.props.loginMutation({
                variables: {
                    email,
                    password
                },
            })
            const token = result.data.login
            this._saveUserData(token)
        } else {
            const result = await this.props.registerMutation({
                variables: {
                    name,
                    email,
                    password
                },
            })
            const token = result.data.register
            this._saveUserData(token)
        }
        this.props.history.push('/')
    }
    
    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    }
}

export default compose(
    graphql(registerMutation, { name: 'registerMutation' }),
    graphql(loginMutation, { name: 'loginMutation' }),
)(Login)