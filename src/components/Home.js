import React from 'react';

const Home = () => {
    return (
        <div className="home">
           <p>Search by the country's name in English. </p>
           <p>Information about the countries are fetched from the open API <a href="https://restcountries.com/" target="_blank" rel="noreferrer"> Rest Countries</a>.</p>
           <p> Clicking a country's card will display weather information about the capital fetched from the open API <a href="https://openweathermap.org/api" target="_blank" rel="noreferrer"> OpenWeather </a>.</p>
        </div>
    );
};

export default Home;