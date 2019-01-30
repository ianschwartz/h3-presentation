import React from 'react';
import maddie from '../images/maddie.jpg';
import Link from "../components/nav/link";
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
          <li>Bad jokes delivered loudly</li>
        </ul>
        <Link className="nes-btn is-primary">About Uber H3</Link>
      </div>
      <div className="nes-container with-title is-dark">
        <h3 className="title">Maddie</h3>
        <img src={maddie} alt=""/>
      </div>
    </div>
  </div>)
};
export default Aboutme;