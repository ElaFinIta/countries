import React from 'react';
import Home from "./components/Home";
import CountriesList from "./components/CountriesList";
import CountrySingle from "./components/CountrySingle";
import { BrowserRouter, Link, Routes, Route, useParams } from 'react-router-dom';

const RouteWrapper = (props) => {
  const params = useParams();
  return <CountrySingle params={params}{...props} />
}


const App = () => {
  return (
    <BrowserRouter>
     <nav>
       <ul>
         <li>
           {/* creating the path here: */}
           <Link to="/">Home</Link>
         </li>
         <li>
            {/* creating the path here: */}
           <Link to="/countries">Countries</Link>
         </li>
       </ul>
     </nav>

      <Routes>
        <Route index element={<Home/>} />
        <Route path="/countries" element={<CountriesList />} />
        {/* <Route path="/countries/name" element={<CountrySingle />} /> */}
        {/* it actually knows already the path because it's wrapped inside the previous so you can tell only path="name"  It's nested already, but you have to use closing tag for </Route> */}
        <Route path="/countries/:capital" element={<RouteWrapper />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
