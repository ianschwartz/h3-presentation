import React from 'react';
import h3 from 'h3-js';
import 'leaflet.pm'
import * as L from "leaflet";
import coin from "../images/coin.png";
import invertedCoin from "../images/invertedCoin.png";
import MapView from "../components/map/mapView";
import Link from "../components/nav/link";
import {CodeLink} from "../components/codeLink";

export default class PointInPolygon extends React.Component {
  state = {
    hexes: []
  }

  formatFeatures = () => {
    return this.props.data.map(light => {
      const hex = h3.geoToH3(light.latlng[1], light.latlng[0], 10)
      const hexIsSelected = this.state.hexes.includes(hex)
      const parsedIcon = hexIsSelected ? invertedCoin : coin;
      return L.marker(light.latlng, {
        icon: L.icon({
          iconUrl: parsedIcon,
          iconAnchor: [10, 10]
        })
      })
    })
  }

  afterDrawPolygon = e => {
    const latlngs = e.layer.toGeoJSON().geometry.coordinates
    const hexes = h3.polyfill(latlngs, 10)
    const map = e.target;
    e.layer.removeFrom(map);
    this.setState({ hexes })
  }

  render() {
    const features = [...this.formatFeatures()]
    return <div>
      <h3>Point in Polygon</h3>
      <MapView
        height={600}
        features={features}
        drawable
        afterDrawPolygon={this.afterDrawPolygon}
      />
      <div className='nes-container' style={{ textAlign: 'left' }}>
        <a href="https://github.com/substack/point-in-polygon" target="_blank">Point in Polygon comparisons</a> are expensive. H3 allows us to do this in a much cheaper way.<br/>
        When you draw a polygon on the map, h3.polyfill() can tell you which hexes are contained within<br />
        And since we know the hex for each coin on the map, figuring out which ones are contained in the polygon is just a string comparison. Much faster!
        <pre><code>const hexIsSelected = this.state.hexes.includes(hex)</code></pre>
        <small>polygon controls courtesy of <a href="https://github.com/codeofsumit/leaflet.pm" target='_blank'>leaflet.pm</a></small><br />
        <Link to='/routing' className='nes-btn'>next</Link>
      </div>
      <CodeLink url="https://github.com/ianschwartz/h3-presentation/blob/master/src/pages/pointInPolygon.js"/>
    </div>
  }
}
