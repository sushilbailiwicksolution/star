/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow
} from "react-google-maps";
const CSVData = require("../../store/csvjson.json");

/**
 * This component is handling map actions
 * @component
 */

class Map extends Component {
  constructor(props) {
    super(props);
    this.googleMap = React.createRef();
    let polylineData = [];
    CSVData.forEach((data) => {
      if(data.Latitude && data.Longitude) {
        polylineData.push({lat: data.Latitude, lng: data.Longitude});
      }
    })
    this.state = {
      directions: null,
      places: [],
      waypoints: [],
      origin: {},
      destination: {},
      initialCenter: { lat: CSVData[0].Latitude, lng: CSVData[0].Longitude },
      allLastLngs: CSVData,
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      infoData: {},
      displayMarkers : <Marker position={{
        lat: CSVData[0].Latitude,
        lng: CSVData[0].Longitude
      }}
      onMouseover = {this.showInfoWindow}
      onMouseout = {this.hideInfoWindow}
      />,
      loader: true,
      polylineData: polylineData,
      zoom: 7,
      PolylineOptions: { strokeWeight: 1.5, strokeOpacity: 1, strokeColor: '#1dc1ec',geodesic: true},
      allStores:[]
    };
  }

  componentDidMount() {
    const { allLastLngs } = this.state;
    let allStores = [];
    const displayMarkers = allLastLngs.map( (store, index) => {
      const { Latitude, Longitude } = store;
      if( Latitude && Longitude ) { 
        const uniqueKey = Latitude.toString() + Longitude.toString() + index.toString();
        let replacedKey = uniqueKey.replace(/\./g, "");
        replacedKey = parseInt(replacedKey);
        allStores.push(store);
        let icon = "";
        icon = {
            path: "M4.692,10.001c0,3.174,2.583,5.756,5.759,5.756s5.758-2.582,5.758-5.756c0-3.175-2.582-5.759-5.758-5.759   S4.692,6.826,4.692,10.001z M5.698,10.001c0-2.545,2.012-4.624,4.529-4.741l-2.56,3.208v2.956l1.948-2.44v5.69   C7.393,14.277,5.698,12.336,5.698,10.001z M15.203,10.001c0,2.334-1.695,4.278-3.916,4.672v-5.69l1.947,2.44V8.468l-2.56-3.208   C13.191,5.378,15.203,7.456,15.203,10.001z",
            scale: 1.2,
            rotation: store.Heading,
            fillColor: '#2947fc',
            fillOpacity: 1,
            strokeWeight: 1,
            strokeOpacity: 1,
            anchor:{ x: 12, y: 0 },
        }
        const yVal = parseInt(store.Heading > 300) ? 0 : 10;
        icon = {
          url: `https://stardev-38337.web.app/flight_icon.svg?rotate=${store.Heading}&i=${index}`,
          anchor: { x: 5, y: 10 }
        };
        return <Marker key={uniqueKey} id={`marker_${index}`} position={{
          lat: Latitude,
          lng: Longitude
        }}
          icon={icon}
          onMouseover={this.showInfoWindow}
          onMouseout={this.hideInfoWindow}
          data = {store}
        />
      } else {
        return null;
      }
      
    })
    const iconInterval = setInterval(() => {
      // console.log('iconInterval', allStores.length);
      let i = 0;
      if(allStores.length > 0) {
        allStores.forEach((st, index) => {
          const markerUrl = `https://stardev-38337.web.app/flight_icon.svg?rotate=${st.Heading}&i=${index}`
          const marker = document.querySelector(`[src="${markerUrl}"]`)
          console.log(marker);
          if (marker) { // when it hasn't loaded, it's null
            i++;
            // console.log(st.Heading);
            // console.log('loaded')
            marker.style.transform = `rotate(${st.Heading}deg)`
            // marker.style.marginTop = "12px";
          }
          if(i === allStores.length) {
            clearInterval(iconInterval);
          }
        })
      }
      
      // console.log('i', i);
    }, 100)
    
    this.setState({
      displayMarkers: displayMarkers
    }, () => {
      setTimeout(() => {
        this.setState({
          loader: false
        })
      }, 1000)
    })
  }

  _mapLoaded(mapProps, map) {
    map.setOptions({
       mapTypeId: "terrain"
    })
 }

 _handleZoomChanged() {
  const zoomLevel = this.googleMap && this.googleMap.current && this.googleMap.current.listeners &&  this.googleMap.current.listeners.zoom_changed &&  this.googleMap.current.listeners.zoom_changed.Fb && this.googleMap.current.listeners.zoom_changed.Fb.zoom ? this.googleMap.current.listeners.zoom_changed.Fb.zoom : false;
  if (zoomLevel && zoomLevel !== this.state.zoom) {
    this.setState({zoom: zoomLevel});
  }
}

_handleCenterChanged() {
  const newLat = this.googleMap && this.googleMap.current && this.googleMap.current.map && this.googleMap.current.map.center && this.googleMap.current.map.center.lat() ? this.googleMap.current.map.center.lat() : false;
  const newLng = this.googleMap && this.googleMap.current && this.googleMap.current.map && this.googleMap.current.map.center && this.googleMap.current.map.center.lng() ? this.googleMap.current.map.center.lng() : false;
  const initialCenter = this.state.initialCenter ? this.state.initialCenter : false;
  if (newLat && newLng && initialCenter && (initialCenter.lat !== newLat || initialCenter.lng !== newLng)) {
    this.setState({
      initialCenter: { lat: newLat, lng: newLng }
    });
  }
}

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={this.state.initialCenter}
        google={this.props.google}
        zoom={this.state.zoom}
        maxZoom={12}
        minZoom={5}
        onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
        onZoomChanged={this._handleZoomChanged.bind(this)}
        ref={this.googleMap}
        onCenterChanged={this._handleCenterChanged.bind(this)}
        
      >
        <Polyline 
            path={this.state.polylineData}
            options = {this.state.PolylineOptions}
          />
          {this.state.displayMarkers}
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `700px`, width: "100%" }} />}
          mapElement={<div style={{ width: '100%', height: `700px` }} />}
        />
      </div>
    );
  }
}

export default Map;
