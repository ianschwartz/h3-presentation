import React from 'react';
import 'leaflet';
import PropTypes from 'prop-types';
import 'leaflet.pm'
/* global L */

/*
  A note on how our Map component works:
    The MapContainer component '../../containers/Map/MapContainer.jsx'
    passes down an array of Leaflet layers as props. Map then adds the
    layers to the map componentDidMount().

  The Map also requires a mapId prop to be passed down from two levels,
    above it. This will allow multiple maps to be rendered without
    conflicts.
*/

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.allLayers = L.featureGroup();
  }

  componentDidMount() {
    this.map = L.map(this.props.mapId).setView([42.3, -71.15], this.props.initialZoom);
    const OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: this.props.attribution,
    });
    OpenStreetMap_HOT.addTo(this.map);

    this.allLayers.addTo(this.map);
    this.addLayersToMap(this.props.features);
    setTimeout(() => {
      this.fitBounds(this.props.boundaries);
    });
    if (this.props.autoOpen) {
      this.allLayers.eachLayer(layer => layer.openPopup());
    }
    if (this.props.drawable || this.props.markerDroppable) {
      this.map.pm.addControls({
        position: 'topleft',
        drawMarker: this.props.markerDroppable, // adds button to draw markers
        drawPolyline: false, // adds button to draw a polyline
        drawRectangle: false, // adds button to draw a rectangle
        drawPolygon: this.props.drawable, // adds button to draw a polygon
        drawCircle: false, // adds button to draw a cricle
        cutPolygon: false, // adds button to cut a hole in a polygon
        editMode: false, // adds button to toggle edit mode for all layers
        removalMode: false, // adds a button to remove layers      });
      });
      this.map.on('pm:create', (e) => {
        if (e.shape !== 'Marker') {
          this.props.afterDrawPolygon(e); // the name of the shape being drawn (i.e. 'Circle')
        } else {
          this.props.dropMarker(e);
        }
      });
    }

  }

  componentDidUpdate() {
    this.allLayers.clearLayers();
    this.addLayersToMap(this.props.features);
    // Apologies, but this is a hack, to get the render to recognize the change
    setTimeout(() => {
      this.fitBounds(this.props.boundaries);
    });
  }
  /*
    Typically, if we manually define boundaries, we use an array of latlngs
    But it's also possible to receive boundaries in two other forms:

    The second way is to pass in a Leaflet LatLngBounds object. This object contains an
    isValid() method https://leafletjs.com/reference-1.4.0.html#latlngbounds

    Lastly, the vehicle API serves bounding boxes as an object with a boundaries key.
    This is not valid for Leaflet, so we must first convert it to a L.geoJSON object
    and then extract a valid LatLngBounds object from the geoJson layer.
  */
  static formatBounds = (boundaries, options = { maxzoom: 15, padding: [20, 20] }) => {
    if (Array.isArray(boundaries)) {
      return [boundaries, options];
    } else if (Array.isArray(boundaries.coordinates)) {
      return [L.geoJSON(boundaries).getBounds(), options];
    } else if (boundaries.isValid && boundaries.isValid()) {
      return [boundaries, options];
    }
    return null;
  }

  fitBounds(boundaries, options) {
    const bounds = MapView.formatBounds(boundaries, options);
    if (bounds) {
      this.map.fitBounds(bounds[0], bounds[1]);
    } else {
      this.map.fitWorld();
    }
  }

  addLayersToMap = (features) => {
    if (features.length > 0) {
      features.forEach((feature) => {
        this.allLayers.addLayer(feature);
      });
    }
  };

  render() {
    const style = {
      height: this.props.height,
      border: 'none',
      width: '100%',
    };
    const className = this.props.title ? "map-view with-title" : 'map-view';
    return (<div className={className}>
      {this.props.children &&
        <div className="nes-container">{this.props.children}</div>}
          <div className="nes-container" style={{ width: this.props.width }}>
          <div id={this.props.mapId} style={style} />
        </div>
      </div>);
    }
}

MapView.propTypes = {
  boundaries: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  features: PropTypes.arrayOf(PropTypes.object),
  mapId: PropTypes.string,
  attribution: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  initialZoom: PropTypes.number,
  autoOpen: PropTypes.bool,
  title: PropTypes.string,
  drawable: PropTypes.bool,
  markerDroppable: PropTypes.bool,
  afterDrawPolygon: PropTypes.func,
  dropMarker: PropTypes.func,
};

MapView.defaultProps = {
  mapId: 'mapId',
  boundaries: [[42.36, -71.17], [42.25, -71.04]],
  features: [],
  height: 600,
  width: '100%',
  initialZoom: 11,
  autoOpen: false,
  attribution: 'Funny stuff here',
  title: null,
  drawable: null,
  markerDroppable: null,
  afterDrawPolygon: null,
  dropMarker: null
};

export default MapView;
