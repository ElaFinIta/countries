import './App.css';
import axios from "axios";
import React, { Component } from 'react';

const number = require('easy-number-formatter')

class App extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    // https://restcountries.com/v3.1/all will fetch all data
    // but we can specify fields we are interested in:
    axios.get("https://restcountries.com/v3.1/all?fields=name,flags,languages,capital,population").then((res) => {
      this.setState({ data: res.data});
      console.log(this.state.data);
    })
  }


  render() {
    return (
      <div className="App-header">
        <h1>Countries of the world</h1>
        <div className="card_wrapper">
        {this.state.data.map((item) => (

            <div className="card" key={item.name.common}>
              <img src={item.flags.svg} alt="flag"/>
              <h2>{item.name.common}</h2>

              {/* inside item.name we may have the object nativeName with inside an object (here langObjs) */}
              {item.name.nativeName ? Object.entries(item.name.nativeName).map(([code, langsObj]) => {
                return (<h3 key={code}>{langsObj.common}</h3>)
              }) : "unknown"}

              <p className="lang_title"> Official languages: </p>
                {/* languages is an object. To be able to loop, make an array out of an object with Object.entries(yourObject).
              It breaks if there's no object for languages (example: Antarctica) >>> check if item.language exists.
              Alternatively, ise v2 where languages are in an array. You can also fetch only part of data:
              https://restcountries.com/v2/all?fields=name,capital,currencies
 */}
                {item.languages ? Object.entries(item.languages).map(([code, lang]) => {
                return (<li key={code}>{lang}</li>)
              }) : "unknown"}
              <p>Capital: {item.capital}</p>
              <p>Population: {number.formatNumber(item.population)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
