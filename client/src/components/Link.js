import React, { Component } from 'react';
import { Card, CardSubtitle, CardImg, CardText, CardBody, CardTitle, Col } from 'reactstrap';

class Link extends Component {
  render() {
    const type = this.props.allAnimals.type;
    if(type === 'Dog' || type === 'dog' ) {
      return (
        <Col xs="auto" sm="auto">
          <Card style={styles.card}>
            <CardImg top width="100%" src="https://i.ytimg.com/vi/OjMiTGrCSaA/hqdefault.jpg" />
            <CardTitle>Name: {this.props.allAnimals.name}</CardTitle>
            <CardSubtitle>Type: {this.props.allAnimals.type}</CardSubtitle>
            <CardText>Found By: {this.props.allAnimals.foundBy}</CardText>
          </Card>
        </Col>
      )
    }
    if(type === 'Cat' || type === 'cat' ) {
      return (
        <Col xs="auto" sm="auto">
          <Card style={styles.card}>
            <CardImg top width="100%" src="https://images.pexels.com/photos/259803/pexels-photo-259803.jpeg?auto=compress&cs=tinysrgb&h=350" />
            {this.props.allAnimals.name} - {this.props.allAnimals.type}
          </Card>
        </Col>
      )
    }
  }
}

const styles = {
  card: {
    width: '30%'
  }
}

export default Link;