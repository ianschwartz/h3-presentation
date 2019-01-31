import React from 'react';
import './App.css';
import Aboutme from "./pages/aboutme";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import Link from "./components/nav/link";
import TheChallenge from "./pages/theChallenge";
import MyHex from "./pages/myHex";
import {trafficLights} from "./data/trafficLIghts";

function router(props) {
  const { path } = props;
  switch (path) {
    case '/':
      return <Home />;
    case '/aboutme':
      return <Aboutme />;
    case '/quest':
      return <TheChallenge data={trafficLights} />;
    case '/my-hex':
      return <MyHex />
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
