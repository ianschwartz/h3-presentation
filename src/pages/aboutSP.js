import React from 'react';
import Link from "../components/nav/link";
import MapView from "../components/map/mapView";
import * as L from 'leaflet';
import wheel from '../images/wheel.png';
import bike from '../images/bike.png';
import {CodeLink} from "../components/codeLink";

const AboutSP = (props) => {
  const spInfo = `<div>84 Hamilton St, Cambridge, MA 02139
</div>`;
  const spIcon=  L.divIcon({
    className: 'sp-icon',
    html: `<div class="sp-outer-icon"><div class="sp-inner-icon"></div></div>`,
    bgPos: [200, 300]
  });
  const superpedestrian = L.marker([42.3581, -71.1085], {
    icon: L.icon({
      iconUrl: wheel,
      iconSize: [55, 50],
      iconAnchor: [27, 5]
    })
  });
  superpedestrian.bindPopup(spInfo);
  const features = [superpedestrian]
  return(<div>
    <h2>About Superpedestrian</h2>
    <p style={{ maxWidth: 800, margin: 'auto' }}>
      Originally known for the Copenhagen Wheel, a self-contained rear wheel electric bicycle system which transforms a traditional bicycle into a hybrid e-bike, Superpedestrian has shifted its focus to shared micromobility. <a
      href="https://www.superpedestrian.com/en/press">We are developing a durable scooter for ridesharing along with server-side infrastructure to support fleets of any size.</a>
    </p>
      <MapView
        features={features}
        initialZoom={12}
        boundaries={[[42.3581, -71.1105], [42.3581, -71.0905]]}
        autoOpen
      >
        <img src={bike} alt=""/>
      </MapView>
    <div className="bottom-buttons">
      <Link to={'/aboutme'} className="nes-btn" type="button">About Ian Schwartz</Link>
    </div>
    <CodeLink url="https://github.com/ianschwartz/h3-presentation/blob/master/src/pages/aboutSP.js"/>
  </div>)
};
export default AboutSP;
