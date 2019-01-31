import React, {Component} from 'react';
import MapView from "../components/map/mapView";
import oldMan from '../images/old-man.png';
import fire from '../images/fire.png';
import coin from '../images/coin.png';
import chlMap from '../images/example-chloropleth.png';
import * as L from 'leaflet';
import Link from "../components/nav/link";

const formatFeatures = (lights) => {
  return lights.map(light => {
    return L.marker(light.latlng, {
      icon: L.icon({
        iconUrl: coin,
      })
    })
  })
}

class TheChallenge extends Component {
  state = {
    oldManText: 0,
    lights: formatFeatures(this.props.data),
  };

  slide =
    {
      title: "Traffic Lights",
      body: [
        (<div>
          You see before you all the traffic lights in the city of Boston...
        </div>),
        (<div>
          Your first task is to represent them on a chloropleth map so we can see which
          parts of Boston have the most traffic lights...
        </div>),
        (<div>
          <img src={chlMap} style={{maxWidth: '90%', margin: 'auto'}}/>
        </div>),
        (<div>
          Can you do it?
        </div>)
      ],
      buttonText: "Yes I can!",
    };

  moreText = () => {
    this.setState({ oldManText: this.state.oldManText + 1 })
  };

  render() {
    const features = this.state.lights;
    return (<div className="nes-container with-title">
      <h2 className="title">{this.slide.title}</h2>
      <MapView width="100%" features={features} initialZoom={9}>
        <div className="old-man">
          <img src={fire} className="avatar" />
          <img src={oldMan} className="avatar" />
          <img src={fire} className="avatar" />
        </div>
        <div className="nes-container slide-text">
          {this.slide.body[this.state.oldManText]}<br />
          {this.state.oldManText < this.slide.body.length - 1 &&
          <button className="nes-btn is-success" onClick={this.moreText}>click to continue</button>}
        </div>
        <div className="bottom-buttons">
          <Link className="nes-btn is-primary" to="/my-hex">{this.slide.buttonText}</Link>
          <button className="nes-btn is-error">Go back</button>
        </div>
      </MapView>
    </div>)
  }
};
export default TheChallenge;
