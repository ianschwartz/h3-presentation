import React from 'react';
import MapView from "../components/map/mapView";
import * as L from 'leaflet';
import koopa from '../images/koopa.gif'
import h3 from 'h3-js';

const resolutions = [
  {
    area: 4250547,
    edge: 1108,
    indices: 122,
  },
  {
    area: 607221,
    edge: 419,
    indices: 842,
  },
  {
    area: 86746,
    edge: 158,
    indices: 5882,
  },
  {
    area: 12392,
    edge: 60,
    indices: 41162,
  },
  {
    area: 1770,
    edge: 22,
    indices: 288122,
  },
  {
    area: 253,
    edge: 8.5,
    indices: 2016842,
  },
  {
    area: 36,
    edge: 3.2,
    indices: 14117882,
  },
  {
    area: 5.1,
    edge: 1.22,
    indices: 98825162,
  },
  {
    area: 0.78,
    edge: 0.46,
    indices: 691776122,
  },
  {
    area: 0.105,
    edge: 0.17,
    indices: 4842432842,
  },
  {
    area: 0.0150,
    edge: 0.0659,
    indices: 33897029882,
  },
  {
    area: 0.00214,
    edge: 0.0249,
    indices: 237279209162,
  },
  {
    area: 0.0003071,
    edge: 0.00941,
    indices: 1660954464122,
  },
  {
    area: 0.0000439,
    edge: 0.00355,
    indices: 11626681248842,
  },
  {
    area: 0.0000063,
    edge: 0.0000063,
    indices: 81386768741882,
  },
  {
    area: 0.0000009,
    edge: 0.000509,
    indices: 569707381193162,
  },
];

export default class MyHex extends React.Component {
  state = { location: null, res: 6 };
  getLocation = () => navigator.geolocation.getCurrentPosition((position) => {
    this.setState({ location: [position.coords.latitude, position.coords.longitude] })
  });
  renderFeatures = (location, hex) => {
    if (location) {
      const marker = L.marker(location, {
        icon: L.icon({
          iconUrl: koopa,
          iconSize: [50, 50],
        })
      });
      let hexGeo;
      if (hex) {
        hexGeo = L.polygon(h3.h3ToGeoBoundary(hex), {
          color: 'green'
        })
      }
      return [marker, hexGeo]
    }
    return [];
  }
  setRes = (e) => {
    this.setState({ res: e.target.value })
  };
  renderButtons = () => {
    const reses = [0,1,2,3,4,5,6,7,8,10,11,12,13,14,15];
    return reses.map(num => {
      const active = num === this.state.res;
      const className = active ? 'nes-btn is-success' : 'nes-btn';
      return <button key={num.toString()} className={className} onClick={this.setRes} value={num}>{num}</button>
    })
  };
  formatIndices = (numbers) => {
    const nums = numbers.toString();
    if (nums[1] === '.') return nums;
    return nums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  render() {
    let hex;
    if (!this.state.location) {
      this.getLocation();
    } else {
      hex = h3.geoToH3(this.state.location[0], this.state.location[1], this.state.res)
    }
    const res = resolutions[this.state.res];
    const features = this.renderFeatures(this.state.location, hex);
    const boundaries = features[1] ? features[1].getBounds() : [[42.2, -71.15], [42.3, -72]];
    return (<div>
      <MapView features={features} boundaries={boundaries}>
        <h3>{hex}</h3>
        <div>
          {this.renderButtons()}
        </div>
        <div className="nes-container is-dark" style={{ marginTop: 10 }}>
          <p>Area: {this.formatIndices(res.area)} km<sup>2</sup></p>
          <p>Edge length: {this.formatIndices(res.edge)} km<sup>2</sup></p>
          <p>Number of unique indices:<br/>
            {this.formatIndices(res.indices)}
          </p>
        </div>
      </MapView>
    </div>)
  }
}
