import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";

const number = require('easy-number-formatter')

// destructuring props, passing the object directly
const CountryCard = ({
    name, 
    currencies, 
    flag, 
    languages, 
    capital, 
    population
}) => {
    return (
        <>
        {/* the all card is clickable */}
        {/* capital was an object, not a string! */}
            <Link to={`${capital}`}>
            <div className="card" key={name}>
                {/* {Object.entries(currencies).map((currency) => console.log(currency[1].name))} */}
                <img src={flag} alt="flag"/>
                <h2>{name}</h2>
                {/* <h3 key={code}><span>{name}</span></h3> */}

                <ul className="languages"> Official languages:

                {/*Inside languages array, every language has an array with language-code and language  */}
                  {languages.map(([code, lang]) => (
                    <li key={code}>
                        <span className="bold">{lang}</span>
                    </li>
                  ))}
                </ul>

                <p className="capital">Capital: <span className="bold">{capital}</span></p>
                <p>Population: <span className="bold">{number.formatNumber(population)}</span></p>

                <ul className="currencies">Currencies:

                {/*Inside currencies array, every currency is an object with NAME and SYMBOL. Make an array out of an object with Object.entries(yourObject)  */}
                    {Object.entries(currencies).map((currency) => (
                        <li key={currency[0]}>
                            <span>{currency[1].name}: </span>
                            <span className="bold">{currency[1].symbol} </span>
                        </li>
                    ))}
                </ul>
            </div>
            </Link>
        </>
    );
};

export default CountryCard;