import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

renderApp(window.location.pathname); //render page the first time

window.addEventListener('popstate', function (e) {
  //render page when path changes
  renderApp(window.location.pathname);
});

function renderApp(path) {
  ReactDOM.render(
    <App path={path}/>,
    document.getElementById('root')
  );
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
