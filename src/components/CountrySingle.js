import axios from 'axios';
import React, { Component } from 'react';

function getCountry(capital) {
    return axios.get(`https://restcountries.com/v3.1/capital/${capital}`);
}

function getWeather(capital) {
    return axios.get('/https://api.weatherstack.com/current',
    {params: {
        access_key: process.env.REACT_APP_API_KEY,
        query: capital
    },
    });
}


class CountrySingle extends Component {
    state = {
        country: [],
        weather: []
    }

    // componentDidMount() {
    //     Promise.all([
    //         getCountry(this.state.country),
    //         getWeather(this.state.country)])
    //             .then(res => {
    //             this.setState({country: res[0].data,
    //                 weateher: res[1].data});
    //             console.log('country:', this.state.country);
    //             console.log('weather:', this.state.weather);
    //     });
    // }

    render() {
        return (
            <div className="singleCountry">
                <div className="singleCountryBox">

                </div>
                <p>The weather in {this.state.country} is: </p>

                <div>
                <div>
                {/* <button onClick={() => history.goBack()}>
                    Back to countries
                </button> */}
            </div>
                </div>
            </div>
        );
    }
}

export default CountrySingle;