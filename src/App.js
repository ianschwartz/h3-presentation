import React from 'react';
import './App.css';
import One from "./pages/one";
import Home from "./pages/home";
import NotFound from "./pages/notFound";

function router(props) {
  const { path } = props;
  switch (path) {
    case '/':
      return <Home />;
    case '/one':
      return <One />
    default:
      return <NotFound path={props.path}/>;
  }
}

function App(props) {
  return (
    <div className="App">
      <h1>Using UberH3 on the Front End</h1>
      {router(props)}
    </div>
  );
}

export default App;

// https://medium.com/@daveford/react-router-alternative-switch-acd7961f08db
