import React, {Component} from 'react';
import MapView from "../components/map/mapView";
import * as L from "leaflet";
import Link from "../components/nav/link";
import geojson from '../data/mass.json'
import h3 from 'h3-js';
import koopa from "../images/koopa.gif";

const mass = L.geoJSON(geojson)
const hexes = h3.polyfill(geojson.features[0].geometry.coordinates, 6);

class CollisionDetection extends Component {
  state = {
    lat: -71.17,
    lon: 42.2,
    softWalls: true
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

    return (<div className="nes-container">
      <MapView features={features} boundaries={mass.getBounds()} />
      <div className='item'>
        <label>
          <input className='nes-checkbox' type="checkbox" checked={!this.state.softWalls} onChange={this.toggleSoftwalls} />
          <span>Hard Walls</span>
        </label>
      </div>
    </div>)
  }
};
export default CollisionDetection;
