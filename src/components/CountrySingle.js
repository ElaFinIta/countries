import axios from 'axios';
import React, { Component } from 'react';

function getCountry(capital) {
    return axios.get(`https://restcountries.com/v2/capital/${capital}`);
}

function getWeather(capital) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`);
}


class CountrySingle extends Component {
    state = {
        country: {},
        weather: {}, 
        isLoading: true
    }

    componentDidMount() {
        // console.log(this.props.params.capital);

        Promise.all([
            getCountry(this.props.params.capital),
            getWeather(this.props.params.capital)])
                .then(res => {
                this.setState({
                    country: res[0].data[0],
                    weather: res[1].data,
                    isLoading: false
                });
                console.log('country:', this.state.country);
                console.log('weather:', this.state.weather);
        });
    }

    render() {
 

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

        return (

    
            <div className="singleCountry">
                <div className="singleCountryBox">
                {/* in a functional component would do: useParams but a class component use the trick of passing props */}
                {/* {this.props.params.capital} and {this.state.country.capital} are the same */}
                    <h1>{this.state.country.nativeName}</h1>
                    <p>{this.state.country.name}</p>
                    <p>{this.state.country.capital}:</p>
                    <img className="weather_img" src={`http://openweathermap.org/img/wn/${this.state.weather.weather[0].icon}@4x.png`} alt={this.state.weather.weather[0].description} />
                    <span>{Math.trunc(this.state.weather.main.temp)} °C </span>
                    <p>Feels like: <span>{Math.trunc(this.state.weather.main.feels_like)}</span>°C </p>
                    <p>{this.state.weather.weather[0].description}</p>
                </div>

                <div>
                {/* <button onClick={() => history.goBack()}>
                    Back to countries
                </button> */}
                </div>
            </div>
        );
    }
}
}

export default CountrySingle;