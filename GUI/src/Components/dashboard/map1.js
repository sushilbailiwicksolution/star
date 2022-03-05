import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './mapRoute';
import { withScriptjs } from "react-google-maps";
// import './style.css';

const googleMapsApiKey = "AIzaSyC9gF0NXH_KTIccE1w1a2_BpLqW0KuECb8";

export const App = props => {
  console.log(props);
  const MapLoader = withScriptjs(Map);
  const {places} = props;

  const {
    loadingElement,
    containerElement,
    mapElement,
    defaultCenter,
    defaultZoom
  } = props;

  return (
    <MapLoader
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`}
      loadingElement={<div style={{ height: `100%` }} />}
    />
    // <Map
    //   googleMapURL={
    //     'https://maps.googleapis.com/maps/api/js?key=' +
    //     googleMapsApiKey +
    //     '&libraries=geometry,drawing,places'
    //   }
    //   markers={places}
    //   loadingElement={loadingElement || <div style={{height: `100%`}}/>}
    //   containerElement={containerElement || <div style={{height: "80vh"}}/>}
    //   mapElement={mapElement || <div style={{height: `100%`}}/>}
    //   defaultCenter={defaultCenter || {lat: 25.798939, lng: -80.291409}}
    //   defaultZoom={defaultZoom || 11}
    // />
  );
};

