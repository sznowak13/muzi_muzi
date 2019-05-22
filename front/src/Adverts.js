import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";

class Adverts extends Component {
  render() {
    const { advertData } = this.props;

    return (
      <Container>
        <Table stripped bordered hover responsive="sm" variant="warning">
          <TableHeader />
          <TableBody advertData={advertData} />
        </Table>
      </Container>
    );
  }
}

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>City</th>
        <th>Genre</th>
        <th>Profession</th>
        <th>Posted on</th>
      </tr>
    </thead>
  );
};

const TableBody = props => {
  const rows = props.advertData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.fields.title}</td>
        <td>{row.fields.first_name}</td>
        <td>{row.fields.city}</td>
        <td>{row.fields.genre}</td>
        <td>{row.fields.profession}</td>
        <td>{row.fields.posted_on}</td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default Adverts;
