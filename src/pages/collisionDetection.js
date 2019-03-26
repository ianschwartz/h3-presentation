import React, {Component} from 'react';
import MapView from "../components/map/mapView";
import * as L from "leaflet";
import Link from "../components/nav/link";
import geojson from '../data/mass.json'
import h3 from 'h3-js';
import koopa from "../images/koopa.gif";
import {CodeLink} from "../components/codeLink";

const mass = L.geoJSON(geojson)
const hexes = h3.polyfill(geojson.features[0].geometry.coordinates, 6);

class CollisionDetection extends Component {
  state = {
    lat: -71.17,
    lon: 42.2,
    softWalls: false
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
  }

  handleRight = () => {
    const nextLat = this.state.lat + 0.05;
    const nextHex = h3.geoToH3(nextLat, this.state.lon, 6);
    if (hexes.includes(nextHex) || this.state.softWalls) {
      this.setState({
        lat: nextLat
      })
    }
  }

  handleDown = () => {
    const nextLon = this.state.lon - 0.05;
    const nextHex = h3.geoToH3(this.state.lat, nextLon, 6);
    if (hexes.includes(nextHex) || this.state.softWalls) {
      this.setState({
        lon: nextLon
      })
    }
  }

  handleLeft = () => {
    const nextLat = this.state.lat - 0.05;
    const nextHex = h3.geoToH3(nextLat, this.state.lon, 6);
    if (hexes.includes(nextHex) || this.state.softWalls) {
      this.setState({
        lat: nextLat
      })
    }
  }

  handleUp = () => {
    const nextLon = this.state.lon + 0.05;
    const nextHex = h3.geoToH3(this.state.lat, nextLon, 6);
    if (hexes.includes(nextHex) || this.state.softWalls) {
      this.setState({
        lon: nextLon
      })
    }
  }

  toggleSoftwalls = () => {
    this.setState({
      softWalls: !this.state.softWalls
    })
  }


  handleKeyPress = e => {
    if (e.code === 'ArrowUp') {
      this.handleUp();
    } else if (e.code === 'ArrowDown') {
      this.handleDown();
    } else if (e.code === 'ArrowLeft') {
      this.handleLeft()
    } else if (e.code === 'ArrowRight') {
      this.handleRight()
    } else {
      console.log(e.code)
    }
  }
  render() {
    const marker = L.marker([this.state.lon, this.state.lat], {
      icon: L.icon({
        iconUrl: koopa,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })
    });
    const myHex = h3.geoToH3(this.state.lat, this.state.lon, 6);
    const myHexPoly = L.polygon(h3.h3ToGeoBoundary(myHex, true), {
      color: hexes.includes(myHex) ? 'green' : 'red',
    });
    const hexesVisualized = h3.h3SetToMultiPolygon(hexes, true)
    const features = [marker, L.polygon(hexesVisualized), myHexPoly];

    return (<div className="nes-container" style={{
      display: 'flex',
    }}>
      <div style={{ width: '30%', overflow: 'scroll' }}>
        Hexes in the state of MA
      <small style={{ display: 'block' }}>(resolution 6)</small>
        {hexes.map(hex => {
          const style = { fontSize: 7, fontFamily: 'Arial' };
          if (hex === myHex) {
            style.color = 'red';
          }
          return <small style={style}>{hex}, </small>})
        }
      </div>
      <div style={{ width: '70%' }}>
        <MapView features={features} boundaries={mass.getBounds()} />
        <small>use arrow keys to navigate</small>
        <div className='item'>
          <label>
            <input className='nes-checkbox' type="checkbox" checked={!this.state.softWalls} onChange={this.toggleSoftwalls} />
            <span style={{ display: 'block' }}>Hard Walls</span>
            <Link to='/point-in-polygon' className="nes-btn">Next</Link>
          </label>
        </div>
      </div>
      <CodeLink url="https://github.com/ianschwartz/h3-presentation/blob/master/src/pages/collisionDetection.js"/>
    </div>)
  }
};
export default CollisionDetection;
