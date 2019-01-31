import React from 'react';
import Link from "../components/nav/link";
import MapView from "../components/map/mapView";
import * as L from 'leaflet';
import block from '../images/ex-block.png';
const Home = (props) => {
  const spInfo = `<div>84 Hamilton St, Cambridge, MA 02139
</div>`;
  const spIcon=  L.divIcon({
    className: 'sp-icon',
    html: `<div class="sp-outer-icon"><div class="sp-inner-icon"></div></div>`,
    bgPos: [200, 300]
  });
  const superpedestrian = L.marker([42.3581, -71.1085], {
    icon: L.icon({
      iconUrl: block,
      iconAnchor: [11, 5]
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
        boundaries={[[42.3623, -71.1126], [42.3568, -71.1043]]}
        autoOpen
      >
      <div className="flex-column">
        <Link to={'/aboutme'} className="nes-btn" type="button">About Ian Schwartz</Link>
      </div>
      </MapView>
  </div>)
};
export default Home;
