import './App.css';
import axios from "axios";
import React, { Component } from 'react';

class App extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
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
              It breaks if there's no object for languages (example: Antarctica) >>> check if item.language exists */}
                {item.languages ? Object.entries(item.languages).map(([code, lang]) => {
                return (<li key={code}>{lang}</li>)
              }) : "unknown"}
              <p>Capital: {item.capital}</p>
              <p>Population: {item.population}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
