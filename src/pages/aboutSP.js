import React from 'react';
import Link from "../components/nav/link";
import MapView from "../components/map/mapView";
import * as L from 'leaflet';
import wheel from '../images/wheel.png';
import bike from '../images/bike.png';

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
    <p style={{ maxWidth: 600, margin: 'auto' }}>
      Superpedestrian is a transportation robotics company located in Cambridge, Mass. Founded out of MIT and beginning operations in 2013, Superpedestrian develops core technologies for micro-mobility.
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
  </div>)
};
export default AboutSP;
