import React, { Component } from 'react';
import axios from "axios";
import './loader.css';
import '../App.css';
import CountryCard from './CountryCard';

class CountriesList extends Component {
    state = {
        data: [],
        visited: [],
        searchInput: "",
        isLoading: false
    }

    componentDidMount() {
        // https://restcountries.com/v3.1/all will fetch all data
        // but we can specify fields we are interested in:
        axios.get("https://restcountries.com/v3.1/all?fields=name,flags,languages,capital,population,currencies").then((res) => {
          this.setState({ data: res.data, isloading: true});
        //   console.log(this.state.data);
        })
    }

    searchInputHandler = (event) => {
        this.setState({
            searchInput: event.target.value,
        });
        // console.log(this.state.searchInput);
    }


    render() {
    // spinner for loading...
    if (this.state.isLoading) {
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
        // matching input with countries name in data
        let foundCountries = this.state.data.filter((countryObj) => {
                return countryObj.name.common.toLowerCase().includes(this.state.searchInput.toLowerCase());     
        });

        const countriesListing = foundCountries.map((countryObject) => (
            <CountryCard
                key={countryObject.name.common}
                name={countryObject.name.common}
                capital={countryObject.capital}
                population={countryObject.population}
                flag={countryObject.flags.svg}

                /* languages is an object. To be able to loop, make an array out of an object with Object.entries(yourObject).
                It breaks if there's no object for languages (example: Antarctica) >>> check if countryObject.language exists */
                languages={countryObject.languages ? Object.entries(countryObject.languages) : "unknown"}
                currencies={countryObject.currencies}
            />
        ))

        return (
        <>
            <div className="App-header">
                <h1>Countries of the world</h1>
                <div className="input_label">
                    <label htmlFor="search">Search by country name:</label>
                    <input 
                        type="text" 
                        name="search" 
                        onChange={this.searchInputHandler} />
                </div>
            </div>
  
            <div className="countriesList">
                {countriesListing}
            </div>
        </>
        );
    }
    }
}

export default CountriesList;