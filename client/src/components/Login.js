import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    InputGroup, 
    InputGroupText,
    InputGroupAddon, 
    Input 
} from 'reactstrap';
import FaUser from 'react-icons/lib/fa/user';
import FaKey from 'react-icons/lib/fa/key';
import FaClose from 'react-icons/lib/fa/close';
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
            <Modal isOpen={true}>
                <ModalHeader>
                    {this.state.login ? 'Login' : 'Register'}
                    <Link className="float-right" to='/'>
                        <FaClose />
                    </Link>
                </ModalHeader>
                <ModalBody>
                    {!this.state.login && (
                        <InputGroup>
                            <InputGroupAddon style={styles.input} addonType="prepend"><FaUser /></InputGroupAddon>
                            <Input
                                value = {this.state.name}
                                onChange = {e => this.setState({ name: e.target.value })}
                                type = "text"
                                placeholder = "name"
                            />
                        </InputGroup>
                    )}
                    <InputGroup>
                        <InputGroupAddon style={styles.input} addonType="prepend"><FaUser /></InputGroupAddon>
                        <Input
                            value = {this.state.email}
                            onChange = {e => this.setState({ email: e.target.value })}
                            type = "text"
                            placeholder = "Email"
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon style={styles.input} addonType="prepend"><FaKey /></InputGroupAddon>
                        <Input
                            value = {this.state.password}
                            onChange = {e => this.setState({ password: e.target.value })}
                            type = "password"
                            placeholder = "Password"
                        />
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => this._confirm()}>
                        {this.state.login? 'Login' : 'Create account'}
                    </Button>
                    <Button onClick={() => this.setState({ login: !this.state.login})}>
                        {this.state.login
                            ? 'Need to create an account. Click Here'
                            : 'Already have an account. Click Here'}
                    </Button>
                </ModalFooter>
            </Modal>
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

const styles = {
    input: {
        fontSize:25,
        alignSelf:'center',
        marginRight: 6
    }
}

export default compose(
    graphql(registerMutation, { name: 'registerMutation' }),
    graphql(loginMutation, { name: 'loginMutation' }),
)(Login)