import React, { Component } from 'react';
import Link from './Link';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const animalQuery = gql`
    query allAnimals {
        allAnimals {
            _id
            name
            type
        }
    }
`;

class LinkList extends Component {
    render() {
        if(this.props.data && this.props.data.loading) {
            return <div>Loading</div>
        }
        if(this.props.data && this.props.data.error) {
            return <div>Error</div>
        }
        const animalsToRender = this.props.data.allAnimals;
        return (
            <div>{animalsToRender.map(animal => <Link key={animal._id} allAnimals={animal} />)}</div>
        )
    }
}

export default graphql(animalQuery)(LinkList);