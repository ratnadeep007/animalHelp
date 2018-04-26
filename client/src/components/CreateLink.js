import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

const animalMutation = gql`
    mutation addAnimal($name: String!, $type: String!) {
        addAnimal(name: $name, type: $type) {
            _id
            name
            type
        }
    }
`;

class CreateLink extends Component {
    state = {
        name: '',
        type: '',
        owned: false,
        owner: '',
        foundBy: ''
    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader>
                    Add new animal
                </ModalHeader>
                <ModalBody>
                    <Input
                        value = {this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                        type="text"
                        placeholder="Name?"
                    /><br/>
                    <Input
                        value = {this.state.type}
                        onChange={e => this.setState({ type: e.target.value })}
                        type="text"
                        placeholder="Type?"
                    /><br/>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => this.addAnimal()}>Submit</Button>
                    <Button>
                        <Link style={styles.link} to="/">
                            Cancel
                        </Link>
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

    addAnimal = async () => {
        const { name, type } = this.state;
        await this.props.addAnimalMutation({
            variables: {
                name,
                type
            }
        })
        // Redirect to home after mutation performed
        this.props.history.push('/')
    }
}

const styles = {
    link: {
        color: 'white'
    }
}

export default graphql(animalMutation, {
    name: 'addAnimalMutation'
})(CreateLink);