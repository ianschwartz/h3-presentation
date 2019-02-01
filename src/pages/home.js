import React from "react";
import logo from '../images/logo.png'
import Link from "../components/nav/link";

export class Home extends React.Component {
  render() {
    return (<div className='mountains'>
      <div>
        <img src={logo} style={{ width: '50%', height: 'auto' }}/>
      </div>
      <div>
        <Link className='nes-btn is-primary' to={'/about-sp'}>START</Link>
      </div>
    </div>)
  }
}
