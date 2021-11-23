import React from 'react';
import '../App.css';

const number = require('easy-number-formatter')

const CountryCard = (props) => {
    return (
        <>
            <div className="card" key={props.name}>
                {Object.entries(props.currencies).map((currency) => console.log(currency[1].name))}
                <img src={props.flag} alt="flag"/>
                {<h2>{props.name}</h2>}
                {/* <h3 key={props.code}><span>{props.name}</span></h3> */}

                <ul className="languages"> Official languages:

                {/*Inside languages array, every language has an array with language-code and language  */}
                  {props.languages.map(([code, lang]) => (
                    <li key={code}>
                        <span className="bold">{lang}</span>
                    </li>
                  ))}
                </ul>

                <p className="capital">Capital: <span className="bold">{props.capital}</span></p>
                <p>Population: <span className="bold">{number.formatNumber(props.population)}</span></p>

                <ul className="currencies">Currencies:

                {/*Inside currencies array, every currency is an object with NAME and SYMBOL. Make an array out of an object with Object.entries(yourObject)  */}
                    {Object.entries(props.currencies).map((currency) => (
                        <li key={currency[0]}>
                            <span>{currency[1].name}: </span>
                            <span className="bold">{currency[1].symbol} </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default CountryCard;