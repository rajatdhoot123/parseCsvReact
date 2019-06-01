import React, { Component } from "react";
import DropZoneS from "./dropzone";
import { Table, FormControl, Button } from "react-bootstrap";

const heading = {
  heading: [
    "Rank",
    "Name",
    "Platform",
    "Year",
    "Genre",
    "Publisher",
    "Global_Sales",
    ""
  ]
};

const sortData = (data, type) => {
  const [first, ...rest] = data;
  let remainingVales = [];
  let filteredData = rest
    .filter(game => {
      if (!isNaN(Number(Object.values(game)[0][3]))) {
        return true;
      } else {
        remainingVales = [...remainingVales, game];
      }
    })
    .sort(
      (a, b) => Number(Object.values(type == "asc" ? a : b)[0][3]) - Number(Object.values(type == "asc" ? b : a)[0][3])
    );

  return [...filteredData, ...remainingVales];
};

const formatData = data => {
  let formattedArray = [];
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      formattedArray.push({ [`heading`]: data[i] });
      localStorage[`heading`] = JSON.stringify(data[i]);
    } else {
      formattedArray.push({ [`GAME-${data[i][1]}`]: data[i] });
      localStorage[`GAME-${data[i][1]}`] = JSON.stringify(data[i]);
    }
  }
  return formattedArray;
};

const getSearchList = (text, data) => {
  let regex = new RegExp(text);
  return data.filter(game =>
    Object.keys(game)[0]
      .toLocaleUpperCase()
      .match(regex)
  );
};

export default class Home extends Component {
  state = {
    data: [heading],
    searchList: [heading],
    searchText: "",
    sortAsc: true
  };

  componentDidMount() {
    this.setState({
      data: [
        heading,
        ...Object.keys(localStorage)
          .filter(key => key.match(/^GAME/))
          .map(game => {
            let parseGame = JSON.parse(localStorage[game]);
            return { [`GAME-${parseGame[1]}`]: parseGame };
          })
      ]
    });
  }

  handleData = (data, cb) => {
    this.setState({
      data: formatData(data)
    });
  };

  handleChange = e => {
    let search = e.target.value;
    this.setState(
      {
        searchText: search
      },
      () => {
        this.setState({
          searchList: [
            heading,
            ...getSearchList(search.toLocaleUpperCase(), this.state.data)
          ]
        });
      }
    );
  };

  handleSort = text => {
    this.setState(prevState => ({
      searchList: [heading, ...sortData(this.state.data, text)],
      sortAsc: !prevState.sortAsc
    }));
  };

  render() {
    const [first = {}, ...rest] =
      this.state.searchList.length > 1
        ? this.state.searchList
        : this.state.data;
    let heading = [];
    if (Object.keys(first).length) {
      heading = first.heading;
    }
    const sortText = this.state.sortAsc ? "asc" : "desc";
    return (
      <div>
        <div style={{ padding: 20 }}>
          <FormControl
            className="p3"
            onChange={this.handleChange}
            placeholder="Search"
          />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{heading[0]}</th>
              <th>{heading[1]}</th>
              <th>{heading[2]}</th>
              <th style={{display:"flex"}}>
                {heading[3]}{" "}
                <Button
                  variant="link"
                  style={{padding: 0, marginLeft: "5px"}}
                  onClick={this.handleSort.bind(this, sortText)}
                >
                  {sortText}
                </Button>
              </th>
              <th>{heading[4]}</th>
              <th>{heading[5]}</th>
              <th>{heading[6]}</th>
            </tr>
          </thead>
          <tbody>
            {rest.map(games => {
              let game = Object.values(games)[0];
              return (
                <tr key={game[0]}>
                  <td>{game[0]}</td>
                  <td>{game[1]}</td>
                  <td>{game[2]}</td>
                  <td>{game[3]}</td>
                  <td>{game[4]}</td>
                  <td>{game[5]}</td>
                  <td>{game[6]}</td>
                  <td>{game[7]}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <DropZoneS handleData={this.handleData} />
      </div>
    );
  }
}
