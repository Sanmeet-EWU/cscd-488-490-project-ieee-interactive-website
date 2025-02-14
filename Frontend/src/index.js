import React from "react";
import ReactDOM from "react-dom/client";
//import ReactDom from 'react-dom';
import reportWebVitals from "./reportWebVitals";
//import { BrowserRouter } from 'react-router-dom';
import App from "./App";

// This is the main file that will be run when you start the website
// This automatically starts at the App.jsx file that defaults to home page (home.jsx)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Note: Use React.Strict mode for intentionally running extra checks, Browser Router for routing and rendering
// Note: Going to specified file will not render the components folder, it will only render the jsx and css file of the specified folder
// Comment uncomment the following 7 lines of code to render the specified page, the file pathing is done for you

/*import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";*/

//Home Page
/*import Home from "./Pages/Home/Home";
ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);*/

/*import Home from "./Pages/Home/Home";
ReactDOM.render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>,
  document.getElementById("root")
);*/

//Officers Page
/*import Officers from "./Pages/Officers/Officers";
ReactDOM.render(
  <React.StrictMode>
    <Officers />
  </React.StrictMode>,
  document.getElementById("root")
);*/

/*import Officers from "./Pages/Officers/Officers";
ReactDOM.render(
  <BrowserRouter>
    <Officers />
  </BrowserRouter>,
  document.getElementById("root")
);*/

//FormerOfficers Page
/*import FormerOfficers from "./Pages/FormerOfficers/FormerOfficers";
ReactDOM.render(
  <React.StrictMode>
    <FormerOfficers />
  </React.StrictMode>,
  document.getElementById("root")
);*/

/*import FormerOfficers from "./Pages/FormerOfficers/FormerOfficers";
ReactDOM.render(
  <BrowserRouter>
    <FormerOfficers />
  </BrowserRouter>,
  document.getElementById("root")
);*/

//Contact Form Page
/*import ContactForm from "./Pages/ContactForm/ContactForm";
ReactDOM.render(
  <React.StrictMode>
    <ContactForm />
  </React.StrictMode>,
  document.getElementById("root")
);*/

/*import ContactForm from "./Pages/ContactForm/ContactForm";
ReactDOM.render(
  <BrowserRouter>
    <ContactForm />
  </BrowserRouter>,
  document.getElementById("root")
);*/

//Employment Page
/*import Employment from "./Pages/Employment/Employment";
ReactDOM.render(
  <React.StrictMode>
    <Employment />
  </React.StrictMode>,
  document.getElementById("root")
);*/

/*import Employment from "./Pages/Employment/Employment";
ReactDOM.render(
  <BrowserRouter>
    <Employment />
  </BrowserRouter>,
  document.getElementById("root")
);*/

//Events Page
/*import Employment from "./Pages/Events/Events";
ReactDOM.render(
  <React.StrictMode>
    <Events />
  </React.StrictMode>,
  document.getElementById("root")
);*/

/*import Events from "./Pages/Events/Events";
ReactDOM.render(
  <BrowserRouter>
    <Events />
  </BrowserRouter>,
  document.getElementById("root")
);*/

//Test Officers Page
/*import OfficersGrid from "./Pages/Officers/OfficersGrid";
ReactDOM.render(
  <React.StrictMode>
    <OfficersGrid />
  </React.StrictMode>,
  document.getElementById("root")
);*/
