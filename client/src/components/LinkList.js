import React, { Component } from 'react';
import Link from './Link';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Row } from 'reactstrap';
import { HashLoader, RingLoader } from 'react-spinners';

const animalQuery = gql`
    query allAnimals {
        allAnimals {
            _id
            name
            type
            foundBy
        }
    }
`;

class LinkList extends Component {
    render() {
        if(this.props.data && this.props.data.loading) {
            return (
                <div className="container">
                    <RingLoader size="100" />
                </div>
            )
        }
        if(this.props.data && this.props.data.error) {
            return <div>Error</div>
        }
        const animalsToRender = this.props.data.allAnimals;
        return (
            <Row>
                <div style={styles.container} className="container">
                    {animalsToRender.map(animal => 
                        <Link key={animal._id} allAnimals={animal} />
                    )}
                </div>
            </Row>
        )
    }
}

const styles = {
    container: {
        marginTop: 20,
    }
}

export default graphql(animalQuery)(LinkList);