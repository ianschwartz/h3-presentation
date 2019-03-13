import React from 'react';
import './App.css';
import Aboutme from "./pages/aboutme";
import AboutSP from "./pages/aboutSP";
import NotFound from "./pages/notFound";
import Link from "./components/nav/link";
import TheChallenge from "./pages/theChallenge";
import MyHex from "./pages/myHex";
import {trafficLights} from "./data/trafficLIghts";
import Chloropleth from "./pages/chloropleth";
import {Home} from "./pages/home";
import WhereAmI from "./pages/whereAmI";
import CollisionDetection from "./pages/collisionDetection";

function router(props) {
  const { path } = props;
  switch (path) {
    case '/':
      return <Home />
    case '/about-sp':
      return <AboutSP />;
    case '/aboutme':
      return <Aboutme />;
    case '/quest':
      return <TheChallenge data={trafficLights} />;
    case '/my-hex':
      return <MyHex />
    case '/chloropleth':
      return <Chloropleth  data={trafficLights} />;
    case '/where-am-i':
      return <WhereAmI />
    case '/collision-detection':
      return <CollisionDetection />
    default:
      return <NotFound path={props.path}/>;
  }
}

function App(props) {
  return (
    <div className="containers" id="root">
      <div className="nes-container with-title is-centered" style={{ height: '100%' }}>
        <Link to="/" className="title">Using UberH3 on the Front End</Link>
        {router(props)}
      </div>
    </div>
  );
}

export default App;

// https://medium.com/@daveford/react-router-alternative-switch-acd7961f08db
