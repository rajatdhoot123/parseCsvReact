import React, { Component } from "react";
import "./App.css";
import Home from "./Component/home";
import "bootstrap/dist/css/bootstrap.min.css";
import Details from "./Component/details";

class App extends Component {
  state = {
    page: "home",
    details: []
  };

  handlePageChange = page => {
    this.setState({
      page: page[1],
      details: [{ [page[1]]: page }]
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.page === "home" ? (
          <Home handlePageChange={this.handlePageChange} />
        ) : (
          <Details handlePageChange={this.handlePageChange} details={this.state.details}/>
        )}
      </div>
    );
  }
}

export default App;
