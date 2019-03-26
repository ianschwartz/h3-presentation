import React from 'react';
import h3 from 'h3-js';
import 'leaflet.pm'
import * as L from "leaflet";
import coin from "../images/coin.png";
import invertedCoin from "../images/invertedCoin.png";
import MapView from "../components/map/mapView";
import Link from "../components/nav/link";
import {CodeLink} from "../components/codeLink";

export default class Compact extends React.Component {
  state = {
    hexes: []
  }

  afterDrawPolygon = e => {
    const latlngs = e.layer.toGeoJSON().geometry.coordinates
    const hexes = h3.compact(h3.polyfill(latlngs, 9))
    const map = e.target;
    e.layer.removeFrom(map);
    this.setState({ hexes })
  }

  render() {
    const features = this.state.hexes.map(hex => {
      return L.polygon(h3.h3ToGeoBoundary(hex, true))
    })
    return <div>
      <h3>Compact</h3>
      <MapView
        height={600}
        features={features}
        drawable
        afterDrawPolygon={this.afterDrawPolygon}
      />
      <div className='nes-container' style={{ textAlign: 'left' }}>
        Compact a set of hexagons of the same resolution into a set of hexagons across multiple levels that represents the same area.<br />
        <Link to='/the-end' className='nes-btn'>next</Link>
      </div>
      <CodeLink url="https://github.com/ianschwartz/h3-presentation/blob/master/src/pages/compact.js"/>
    </div>
  }
}
