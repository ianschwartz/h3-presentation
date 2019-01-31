import React, {Component} from 'react';
import MapView from "../components/map/mapView";
import {trafficLights} from "../data/trafficLIghts";
import * as L from 'leaflet';

const formatFeatures = (lights) => {
  return lights.map(light => {
    return L.marker(light.latlng)
  })
}

class AboutH3 extends Component {
  state = {
    activeSlide: 0,
  };

  slides = [
    {
      title: "Hexagons",
      body: (<div className='slide-text'>
        <p>something</p>
      </div>),
      buttonText: "Next slide"
    },
  ];

  render() {
    const slide = this.slides[this.state.activeSlide];
    const features = formatFeatures(trafficLights);
    console.log(trafficLights);
    return (<div className="nes-container with-title">
      <h2 className="title">{slide.title}</h2>
      <MapView width="100%" features={features} initialZoom={9}>
        {slide.body}
        <div className="bottom-buttons">
          <button className="nes-btn is-primary">{slide.buttonText}</button>
        </div>
      </MapView>
    </div>)
  }
};
export default AboutH3;
