import React from 'react';
import Home from "./components/Home";
import CountriesList from "./components/CountriesList"

const App = (props) => {
  return (
    <div>
      <Home />
      <CountriesList />
    </div>
  );
};

export default App;
