import React from 'react';
import './App.css';
import Aboutme from "./pages/aboutme";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import Link from "./components/nav/link";

function router(props) {
  const { path } = props;
  switch (path) {
    case '/':
      return <Home />;
    case '/aboutme':
      return <Aboutme />;
    default:
      return <NotFound path={props.path}/>;
  }
}

function App(props) {
  return (
    <div className="containers">
      <div className="nes-container with-title is-centered">
        <Link to="/" className="title">Using UberH3 on the Front End</Link>
        {router(props)}
      </div>
    </div>
  );
}

export default App;

// https://medium.com/@daveford/react-router-alternative-switch-acd7961f08db
