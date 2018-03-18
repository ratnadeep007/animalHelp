import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
            <div>
                <div>
                    <input
                        value = {this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                        type="text"
                        placeholder="Name?"
                    /><br/>
                    <input
                        value = {this.state.type}
                        onChange={e => this.setState({ type: e.target.value })}
                        type="text"
                        placeholder="Type?"
                    /><br/>
                </div>
                <button onClick={() => this.addAnimal()}>Submit</button>
            </div>
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

export default graphql(animalMutation, {
    name: 'addAnimalMutation'
})(CreateLink);