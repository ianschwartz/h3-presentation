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
    const items = [
      "Address: 5 Wayside Rd, Burlington, MA 01803",
      "Name: Microsoft Sales & Technology Center",
      "Event: Boston Code Camp",
      "City, Stata: Boston, MA",
      "Zip Code: 01803",
      "Room: Monroe",
      "Country: USA",
      "Hemisphere: Western",
      "Planet: Earth",
      "Galaxy: Milky Way",
      "Reality: Earth-1218",
      "geojson"
    ]
    this.setState({
      listItems: [locString, ...items],
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
    if (this.state.listItems.length < 1) {
      this.getLocation();
    }
    const style = { border: '4px solid red', margin: 2, padding: 5 }
    const listItems = this.state.listItems.map(item => {
      if (item.toLowerCase() === 'geojson') {
        return <li key={item} style={style}>{this.state.geoJSON}</li>
      }
      return (<li key={item} style={style}>{formatText(item)}</li>)
    });
    return (<div className="nes-container with-title" style={{ overflow: 'auto' }}>
      <h2 className="title">Where Am I?</h2>
      <h3>How do we talk about location?</h3>
      <Link to='/why-hexes' className='nes-btn'>next</Link>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ul style={{
          listStyle: 'none',
          width: '40%',
          margin: '20px auto',
          textAlign: 'left',
        }}>
          {listItems}
        </ul>
        {this.locationLayer &&
        <div style={{ width: '50%' }}>
          <MapView
            features={[this.locationLayer]}
          />
        </div>}
      </div>
      <CodeLink url="https://github.com/ianschwartz/h3-presentation/blob/master/src/pages/whereAmI.js"/>
    </div>)
  }
};
export default WhereAmI;
