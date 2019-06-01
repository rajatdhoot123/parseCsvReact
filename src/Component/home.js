import React, { Component } from "react";
import DropZoneS from "./dropzone";
import { Table, FormControl } from "react-bootstrap";

const heading = {
  heading: JSON.stringify([
    "Rank",
    "Name",
    "Platform",
    "Year",
    "Genre",
    "Publisher",
    "Global_Sales",
    ""
  ])
};

const formatData = data => {
  let formattedArray = [];
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      formattedArray.push({ [`heading`]: JSON.stringify(data[i]) });
      localStorage[`heading`] = JSON.stringify(data[i]);
    } else {
      formattedArray.push({ [`GAME-${data[i][1]}`]: JSON.stringify(data[i]) });
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
    searchText: ""
  };

  componentDidMount() {
    this.setState({
      data: [
        heading,
        ...Object.keys(localStorage)
          .filter(key => key.match(/^GAME/))
          .map(game => {
            let parseGame = JSON.parse(localStorage[game]);
            return { [`GAME-${parseGame[1]}`]: localStorage[game] };
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

  render() {
    const [first = {}, ...rest] =
      this.state.searchList.length > 1
        ? this.state.searchList
        : this.state.data;
    console.warn({ state: this.state });
    let heading = [];
    if (Object.keys(first).length) {
      heading = JSON.parse(first.heading);
    }
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
              <th>{heading[3]}</th>
              <th>{heading[4]}</th>
              <th>{heading[5]}</th>
              <th>{heading[6]}</th>
            </tr>
          </thead>
          <tbody>
            {rest.map(games => {
              let game = JSON.parse(Object.values(games)[0]);
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
