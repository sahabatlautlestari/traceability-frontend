import React from 'react';
import Map from './map.component';

const googleMapsApiKey = "AIzaSyAK71oddySEAU-lgbjFO71_62w1j8sXji0";

const TracingMap = props => {
  const {places} = props;

  const {
    loadingElement,
    containerElement,
    mapElement,
    defaultCenter,
    defaultZoom
  } = props;

  return (
    <Map
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=' +
        googleMapsApiKey +
        '&libraries=geometry,drawing,places'
      }
      markers={places}
      loadingElement={loadingElement || <div style={{height: `100%`}}/>}
      containerElement={containerElement || <div style={{height: "50vh"}}/>}
      mapElement={mapElement || <div style={{height: `100%`}}/>}
      defaultCenter={defaultCenter || {lat: -8.714428466856226, lng: 115.22037359733135}}
      defaultZoom={defaultZoom || 11}
    />
  );
};

export default TracingMap;

// const places = [
//   {latitude: 25.8103146,longitude: -80.1751609},
//   {latitude: 27.9947147,longitude: -82.5943645},
//   {latitude: 28.4813018,longitude: -81.4387899}
// ]

// render(<App defaultZoom={7} places={places} />, document.getElementById('root'));
