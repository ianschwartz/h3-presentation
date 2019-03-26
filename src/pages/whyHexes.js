import React from "react";
import Link from "../components/nav/link";
import {CodeLink} from "../components/codeLink";

export class WhyHexes extends React.Component {
  render() {
    return (<div className='nes-container with-title'>
      <h2 className="title">Why Hexagons?</h2>
      <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
        <div style={{textAlign: 'left'}}>
          <h2>Distance to Neighbors</h2>
          <h3>Square Grid</h3>
          Each cell has two different types of neighbor.
          <ul>
            <li>Neighbors who share a corner</li>
            <li>Neighbors who share a side</li>
          </ul>

          <h3>Hex Grid</h3>
          Each cell has one different type of neighbor.
          <ul>
            <li>Neighbors who share a side</li>
          </ul>

          <small>images courtesy of <a href="https://catlikecoding.com/unity/tutorials/hex-map/part-1/">catlikecoding.com</a></small><br />
          <Link to='/my-hex' className='nes-btn'>next</Link>
        </div>
        <img src="https://catlikecoding.com/unity/tutorials/hex-map/part-1/about-hexagons/square-grid.png" alt="square-grid"/>
        <img src="https://catlikecoding.com/unity/tutorials/hex-map/part-1/about-hexagons/hexagon-grid.png" alt=""/>
      </div>
      <CodeLink url="https://github.com/ianschwartz/h3-presentation/blob/master/src/pages/whyHexes.js"/>
    </div>)
  }
}
