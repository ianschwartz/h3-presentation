import React from 'react';
import h3 from 'h3-js';
import 'leaflet.pm'
import * as L from "leaflet";
import MapView from "../components/map/mapView";
import Link from "../components/nav/link";

export default class H3Line extends React.Component {
  state = {
    location: null,
    resolution: 9,
  }

  getLocation = () => navigator.geolocation.getCurrentPosition((position) => {
    this.setState({ location: [position.coords.latitude, position.coords.longitude] })
  });

  dropMarker = e => {
    const map = e.target;
    e.layer.removeFrom(map);
    const coords = e.layer.toGeoJSON().geometry.coordinates;
    this.setState({
      targetHex: h3.geoToH3(coords[1], coords[0], 9)
    })
  }

  render() {
    if (!this.state.location) {
      this.getLocation();
      return <div>Please give location access</div>
    }
    const features = [
      L.marker(this.state.location),
    ]
    const myHex = h3.geoToH3(this.state.location[0], this.state.location[1], 9);
    if (this.state.targetHex) {
      const line = h3.h3SetToMultiPolygon(h3.h3Line(myHex, this.state.targetHex));
      features.push(L.polygon(line))
      features.push(L.marker(h3.h3ToGeo(this.state.targetHex)))
    }
    return <div className='nes-container with-title'>
      <h3 className="title">H3Line</h3>
      <MapView
        height={600}
        features={features}
        markerDroppable
        dropMarker={this.dropMarker}
      />
      {this.state.location[0]}, {this.state.location[1]}<br />
      {myHex}<br />
      Given two H3 indexes, return the line of indexes between them (inclusive)
      <Link className="nes-btn" to="/compact">next</Link>
    </div>
  }
}
