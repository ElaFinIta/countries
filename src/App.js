import './App.css';
import axios from "axios";
import React, { Component } from 'react';
import './components/loader.css';

const number = require('easy-number-formatter')

class App extends Component {
  state = {
    data: [],
    visited: [],
    searchInput: "",
    isLoading: true
  }

  componentDidMount() {
    // https://restcountries.com/v3.1/all will fetch all data
    // but we can specify fields we are interested in:
    axios.get("https://restcountries.com/v3.1/all?fields=name,flags,languages,capital,population,currencies").then((res) => {
      this.setState({ data: res.data, isloading: false});
      console.log(this.state.data);
    })
  }

  searchInputHandler = (event) => {
    this.setState({
        searchInput: event.target.value,
    });
    // console.log(this.state.searchInput);
}


  render() {
    if (this.state.isLoading) {
      // spinner
      return (<div className="loader_wrapper">
                <div className="lds-hourglass">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <p>Loading...</p>
              </div>)

    }

    if (!this.state.isLoading) {
      return (
        <div className="App-header">
          <h1>Countries of the world</h1>
          <div className="input_label">
            <label htmlFor="search">Search by country name:</label>
            <input 
            type="text" 
            name="search" 
            onChange={this.searchInputHandler} />
          </div>

          <div className="card_wrapper">
          {this.state.data
            .filter((item) => {
              return item.name.common
                .toLowerCase()
                .includes(this.state.searchInput.toLowerCase());     
            })
          .map((item) => (
              <div className="card" key={item.name.common}>
                <img src={item.flags.svg} alt="flag"/>
                <h2>{item.name.common}</h2>

                {/* inside item.name we may have the object nativeName with inside an object (here langObjs) */}
                {item.name.nativeName ? Object.entries(item.name.nativeName).map(([code, langsObj]) => {
                return (<h3 key={code}><span>{langsObj.common}</span></h3>)
                }) : "unknown"}

               <ul className="new_title"> Official languages:
                  {/* languages is an object. To be able to loop, make an array out of an object with Object.entries(yourObject).
                  It breaks if there's no object for languages (example: Antarctica) >>> check if item.language exists.
                  Alternatively, ise v2 where languages are in an array. You can also fetch only part of data:
                  https://restcountries.com/v2/all?fields=name,capital,currencies
                  */}
                  {item.languages ? Object.entries(item.languages).map(([code, lang]) => {
                  return (<li key={code}><span className="bold">{lang}</span></li>)
                }) : "unknown"}
                </ul>


                <p className="new_title">Capital: {item.capital}</p>
                <p>Population: <span className="bold">{number.formatNumber(item.population)}</span></p>

                <ul className="currency">Currencies:
                {item.currencies ? Object.entries(item.currencies).map(([code, currencyObj]) => {
                  return (<li key={code}><span>{currencyObj.name}: </span><span className="bold">{currencyObj.symbol} </span></li>)
                }) : "unknown"}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default App;
