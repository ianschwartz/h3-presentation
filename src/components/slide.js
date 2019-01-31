import React from 'react';
import MapView from "../pages/theChallenge";
import fire from "../images/fire.png";
import oldMan from "../images/old-man.png";
import Link from "./nav/link";

export const Slide = (props) => {
  const { slide, features } = props;
  return (<div className="nes-container with-title">
    <h2 className="title">{slide.title}</h2>
    <MapView width="100%" features={features} initialZoom={9}>
      <div className="old-man">
        <img src={fire} className="avatar" />
        <img src={oldMan} className="avatar" />
        <img src={fire} className="avatar" />
      </div>
      <div className="nes-container slide-text">
        {slide.body}
      </div>
      <div className="bottom-buttons space-around">
        <Link className="nes-btn is-primary">{slide.buttonText}</Link>
      </div>
    </MapView>
  </div>)
}
