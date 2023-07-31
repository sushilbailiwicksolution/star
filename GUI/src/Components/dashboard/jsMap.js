import React, { Component } from 'react';
const google = window.google;

/**
 * This component is handling the google maps.
 * @component
 */

class JSMap extends Component {
    
    componentDidMount() {
        this.initMap();
    }

     initMap = () => {
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 3,
          center: { lat: 0, lng: -180 },
          mapTypeId: "terrain",
        });
        const flightPlanCoordinates = [
          { lat: 37.772, lng: -122.214 },
          { lat: 21.291, lng: -157.821 },
          { lat: -18.142, lng: 178.431 },
          { lat: -27.467, lng: 153.027 },
        ];
        const flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
      
        flightPath.setMap(map);
      }
    render() {
        return(
            <div id="map"></div>
        )
    }

}

export default JSMap;