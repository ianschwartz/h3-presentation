import React from 'react';
import maddie from '../images/maddie.jpg';
import Link from "../components/nav/link";
import {CodeLink} from "../components/codeLink";
const Aboutme = (props) => {
  return(<div className="nes-container with-title is-dark">
    <h2 className="title">About Ian Schwartz</h2>
    <div className="space-around">
      <div className="lists flex-column" style={{ textAlign: 'left' }}>
        <ul className='is-list'>
          <li>Self-taught JavaScript developer</li>
          <li>Framework of choice: ReactJS</li>
          <li>Proud parent and dog owner</li>
          <li>Terrible at skateboarding</li>
          <li>Bad takes delivered loudly</li>
        </ul>
        <div>
          Twitter: @ianschwartz<br />
          Website: https://schwartz.world<br />
          Email: ian@schwartz.world
        </div>
        <div><Link to="/quest" className="nes-btn is-primary">Working with Geospatial Data</Link></div>
      </div>
      <div className="nes-container with-title is-dark">
        <h3 className="title">Maddie</h3>
        <img src={maddie} alt=""/>
      </div>
    </div>
    <CodeLink url="https://github.com/ianschwartz/h3-presentation/blob/master/src/pages/aboutme.js"/>
  </div>)
};
export default Aboutme;
