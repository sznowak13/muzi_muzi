import React, { Component } from "react";

class Table extends Component {
  render() {
    const { advertData } = this.props;

    return (
      <table>
        <TableHeader />
        <TableBody advertData={advertData} />
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
  const rows = props.advertData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.fields.first_name}</td>
        <td>{row.fields.city}</td>
        <td>{row.fields.title}</td>
        <td>{row.fields.posted_on}</td>
        <td>{row.fields.band_name}</td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default Table;
