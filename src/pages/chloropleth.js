import React from 'react';
import MapView from "../components/map/mapView";
import * as L from 'leaflet';
import h3 from 'h3-js';
import {bucketLights, getColor} from "../services/services";
import Link from "../components/nav/link";

const code = `const bucketLights = data => data.reduce((obj, item) => {
  const hex = h3.geoToH3(item.latlng[0], item.latlng[1], 8);
  if (obj[hex]) {
    obj[hex].push(item);
  } else {
    obj[hex] = [item];
  }
  return obj;
}, {});`;


export default class Chloropleth extends React.Component {
  state = {
    resolution: 6
  };

  renderHexes = (hexes) => {
    const featureGroup = L.featureGroup();
    Object.entries(hexes).forEach(([id, lights]) => {
      const poly = L.polygon(h3.h3ToGeoBoundary(id), {
        color: '#000',
        fillColor: getColor(lights.length, this.state.resolution),
        fillOpacity: 0.7,
      }).bindPopup(`<div>${lights.length}</div>`);
      poly.addTo(featureGroup);
    });
    return featureGroup;
  };

  setResolution = e => {
    this.setState({
      resolution: e.target.value,
    });
  };

  generateButtons = () => {
    const resolutions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    return resolutions.map(r => {
      return <button className='nes-btn' value={r} onClick={this.setResolution}>
        {r}
      </button>
    })
  };

  render() {
    const hexes = bucketLights(this.props.data, this.state.resolution);
    const features = [this.renderHexes(hexes)];
    return (<div>
      <MapView
        features={features}
        boundaries={features[0].getBounds()}
        attribution='Click a hex to see how many lights are in it'
      >
        <h3>Bucketing the Lights by Hex</h3>
        <pre>
          <code>
            {code}
          </code>
        </pre>
        <div style={{ width: '60%', margin: 'auto' }}>
          {this.generateButtons()}
        </div>
        <div
          className='nes-container with-title'
          style={{ marginBottom: 20 }}
        >
          <div className="title">Output</div>
          <div style={{ height: 350, width: 800, overflowY: 'scroll' }}>
            <pre>
              <code>
                {JSON.stringify(hexes, null, 2)}
              </code>
            </pre>
          </div>
        </div>
        <div
          className="bottom-buttons"
         style={{ background: 'darkgreen', color: 'white', padding: 10 }}
        >
          <Link className="nes-btn" to={'/collision-detection'}>next</Link>
        </div>
      </MapView>
    </div>)
  }
}
