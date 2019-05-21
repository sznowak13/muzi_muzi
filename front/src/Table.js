import React, { Component } from "react";

class Table extends Component {
  render() {
    const { adverts } = this.props;

    return (
      <table>
        <TableHeader />
        <TableBody adverts={adverts} />
      </table>
    );
  }
}

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>First Name</th>
        <th>City</th>
        <th>Title</th>
        <th>Posted on</th>
        <th>Genre</th>
        <th>Band name</th>
      </tr>
    </thead>
  );
};

const TableBody = props => {
  const rows = props.adverts.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.first_name}</td>
        <td>{row.city}</td>
        <td>{row.title}</td>
        <td>{row.posted_on}</td>
        <td>{row.band_name}</td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default Table;
