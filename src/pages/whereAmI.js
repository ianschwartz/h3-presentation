import React, {Component} from 'react';
import MapView from "../components/map/mapView";
import * as L from "leaflet";
import Link from "../components/nav/link";
import {CodeLink} from "../components/codeLink";

const formatText = (text = "") => {
  return text.split(',').map(line => <div>{line}</div>)
}

class WhereAmI extends Component {
  state = {
    listItems: [],
    activeItem: "",
  };

  getLocation = () => navigator.geolocation.getCurrentPosition((position) => {
    const locString = `Lat: ${position.coords.latitude},
     Lon: ${position.coords.longitude}`;
    const locLayer = L.featureGroup();
    const marker = L.marker([position.coords.latitude, position.coords.longitude]);
    marker.addTo(locLayer);
    this.locationLayer = locLayer;
    this.setState({
      location: locString,
      geoJSON: JSON.stringify(marker.toGeoJSON(), null, 2),
    })
  });

  afterChange = item => {
    console.log(item)
  }

  handleChange = e => {
    const split = e.target.value.split('\n');
    if (split.length > 1) {
      return this.setState({
        listItems: [...this.state.listItems, split[0]],
        activeItem: "",
      }, () => this.afterChange(split[0]))
    }
    this.setState({ activeItem: e.target.value })
  };

  render() {
    if (!this.state.location) {
      this.getLocation();
    }
    const style = { border: '4px solid red', margin: 2 }
    const listItems = this.state.listItems.map(item => {
      if (item.toLowerCase() === 'geojson') {
        return <li key={item} style={style}>{this.state.geoJSON}</li>
      }
      return (<li key={item} style={style}>{formatText(item)}</li>)
    });
    return (<div className="nes-container with-title" style={{ overflow: 'auto' }}>
      <h2 className="title">Where Am I?</h2>
      <h3>How do we talk about location?</h3>
      <div className="container is-dark" style={{height: 30}}>{this.state.activeItem}</div>
      <textarea onChange={this.handleChange} value={this.state.activeItem} name="input" className="nes-textarea"></textarea>
      <ul style={{ width: 500, border: '4px solid black', margin: '20px auto' }} className="nes-list is-disc">
        <li>{formatText(this.state.location)}</li>
        {listItems}
      </ul>
      <Link to='/why-hexes' className='nes-btn'>next</Link>
      {this.locationLayer &&
      <MapView
        features={[this.locationLayer]}
      />}
      <CodeLink url="https://github.com/ianschwartz/h3-presentation/blob/master/src/pages/whereAmI.js"/>
    </div>)
  }
};
export default WhereAmI;
