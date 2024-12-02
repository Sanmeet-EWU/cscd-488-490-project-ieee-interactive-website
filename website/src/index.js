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
// Note: Use React.Strict mode for intentionally running extra checks, Browser Router for routing and rendering
// You may also change the import and < /> tags to test other pages

import React from "react";
import ReactDOM from "react-dom";
//import reportWebVitals from './reportWebVitals';
//import { BrowserRouter } from "react-router-dom";

// This defaults to the Home page
import App from "./App.jsx";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

//Home Page
/*import Home from "./Pages/Home";
ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);*/


/*import Home from "./Home";
ReactDOM.render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>,
  document.getElementById("root")
);*/

//Officers Page
/*import Officers from "./Pages/Officers";
ReactDOM.render(
  <React.StrictMode>
    <Officers />
  </React.StrictMode>,
  document.getElementById("root")
);*/


/*import Officers from "./Pages/Officers";
ReactDOM.render(
  <BrowserRouter>
    <Officers />
  </BrowserRouter>,
  document.getElementById("root")
);*/

//FormerOfficers Page
/*import FormerOfficers from "./Pages/FormerOfficers";
ReactDOM.render(
  <React.StrictMode>
    <FormerOfficers />
  </React.StrictMode>,
  document.getElementById("root")
);*/


/*import FormerOfficers from "./Pages/FormerOfficers";
ReactDOM.render(
  <BrowserRouter>
    <FormerOfficers />
  </BrowserRouter>,
  document.getElementById("root")
);*/

//Contact Form Page
/*import ContactForm from "./Pages/ContactForm";
ReactDOM.render(
  <React.StrictMode>
    <ContactForm />
  </React.StrictMode>,
  document.getElementById("root")
);*/


/*import ContactForm from "./Pages/ContactForm";
ReactDOM.render(
  <BrowserRouter>
    <ContactForm />
  </BrowserRouter>,
  document.getElementById("root")
);*/

//Employment Page
/*import Employment from "./Pages/Employment";
ReactDOM.render(
  <React.StrictMode>
    <Employment />
  </React.StrictMode>,
  document.getElementById("root")
);*/


/*import Employment from "./Pages/Employment";
ReactDOM.render(
  <BrowserRouter>
    <Employment />
  </BrowserRouter>,
  document.getElementById("root")
);*/

//Events Page
/*import Employment from "./Pages/Events";
ReactDOM.render(
  <React.StrictMode>
    <Events />
  </React.StrictMode>,
  document.getElementById("root")
);*/


/*import Events from "./Pages/Events";
ReactDOM.render(
  <BrowserRouter>
    <Events />
  </BrowserRouter>,
  document.getElementById("root")
);*/

/*//Test
import Test from "./Test";
ReactDOM.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>,
  document.getElementById("root")
);*/