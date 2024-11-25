/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/




// This is the main file that will be run when you start the website
// This automatically starts at the Home.jsx file
// Note: Use React.Strict mode for intentionally running extra checks, Browser Router for routing
// You may also change the import and < /> tags to test other pages

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

/*import Home from "./Pages/Home";
ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);*/


/*import Home from "./Pages/Home";
ReactDOM.render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>,
  document.getElementById("root")
);*/

//Test
import Test from "./Test";
ReactDOM.render(
  <BrowserRouter>
    <Test />
  </BrowserRouter>,
  document.getElementById("root")
);