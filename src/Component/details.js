import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

export default class DetailsComponent extends Component {
  render() {
    let detail = Object.values(this.props.details[0])[0];
    return (
      <div style={{ padding: "50px" }}>
        <Button variant="primary" style={{margin: "10px"}} onClick={this.props.handlePageChange.bind(this,["","home"])}>Go Back</Button>
        <Card>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Rank: {detail[0]}</Card.Text>
            <Card.Text>Name: {detail[1]}</Card.Text>
            <Card.Text>Platform: {detail[2]}</Card.Text>
            <Card.Text>Year: {detail[3]}</Card.Text>
            <Card.Text>Genre: {detail[4]}</Card.Text>
            <Card.Text>Publisher: {detail[5]}</Card.Text>
            <Card.Text>Global_Sales: {detail[6]}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
