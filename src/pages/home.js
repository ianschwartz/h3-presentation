import React from 'react';
import Link from "../components/nav/link";
import MapView from "../components/map/mapView";
import * as L from 'leaflet';

const Home = (props) => {
  const spInfo = `<div>84 Hamilton St, Cambridge, MA 02139
</div>`;
  const superpedestrian = L.marker([42.3581, -71.1085], {
    icon: L.divIcon({
      className: 'sp-icon',
      html: `<div class="sp-outer-icon"><div class="sp-inner-icon"></div></div>`,
      bgPos: [200, 300]
    })
  });
  superpedestrian.bindPopup(spInfo);
  const features = [superpedestrian]
  return(<div>
    <h2>About Superpedestrian</h2>
    <p>
      Superpedestrian is a transportation robotics company located in Cambridge, Mass. Founded out of MIT and beginning operations in 2013, Superpedestrian develops core technologies for micro-mobility.
    </p>
    <MapView
      features={features}
      initialZoom={12}
      boundaries={[[42.3623, -71.1126], [42.3568, -71.1043]]}
      autoOpen
    />
    <Link to={'/one'}>One</Link>
  </div>)
};
export default Home;
