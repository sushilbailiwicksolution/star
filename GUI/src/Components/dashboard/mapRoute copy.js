/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  Polyline
} from "react-google-maps";
const CSVData = require("../../store/csvjson_route.json");
/**
 * This component is handling map actions
 * @component
 */

class Map extends Component {
  state = {
    directions: null,
    places: [],
    waypoints: [],
    origin: {},
    destination: {},
    initialCenter: { lat: CSVData[0].Latitude, lng: CSVData[0].Longitude },
    allLastLngs: CSVData,
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();
    let places_1 = [];
    CSVData.map((data) => {
      const { Latitude, Longitude } = data;
      if(Latitude && Longitude) {
        places_1.push({latitude: Latitude, longitude: Longitude})
      }
    })
    let originData = places_1.splice(0,1);
    console.log(originData);
    let destData = places_1.splice(places_1.length-1, 1);
    // const origin = { lat: originData[0].latitude, lng: originData[0].longitude };
    // const destination = { lat: destData[0].latitude, lng: destData[0].longitude };

    const origin = { lat: 24.5628, lng: 39.7048 };
    const destination = { lat: 24.5607, lng: 39.7064 };
    
    console.log('places_1', places_1, origin, destination);
    const places = [
      {latitude: 24.5628,longitude: 39.7048},
      {latitude: 24.5607,longitude: 39.7064},
      {latitude: 24.5071,longitude: 39.7177}
    ]
  const waypoints = places.map(p =>({
      location: {lat: p.latitude, lng:p.longitude},
      stopover: true,
      // icon:{icon} 
  }))

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypoints
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log('result ---', result);
          this.setState({
            directions: result,
            waypoints: waypoints,
            origin: origin,
            destination
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={this.state.initialCenter}
        defaultZoom={7}
      >
        <Polyline 
        path={this.state.directions}
        />
        {/* <DirectionsRenderer
          directions={this.state.directions}
          options={{
            suppressMarkers: true,
            // polylineOptions: {
            //   stokeColor: "#FF0000",
            //   strokeOpacity: 0.5,
            //   strokeWeight: 4
            // },
            // markerOptions: { icon: "http://maps.google.com/mapfiles/ms/micons/blue.png" },
            icon: { scale: 3 }
          }}
        /> */}
        <Marker position={this.state.origin}
        icon= {{
          path: "M10,19 L8,20.5 L8,22 L11.5,21 L15,22 L15,20.5 L13,19 L13,13.5 L21,16 L21,14 L13,9 L13,3.5 C13,2.67 12.33,2 11.5,2 C10.67,2 10,2.67 10,3.5 L10,9 L2,14 L2,16 L10,13.5 L10,19 Z",
          scale: 1.5,
          rotation: 200,
          strokeColor: "#000",
          fillColor: "#000",
          fillOpacity: 1
        }}
        label={'W'} />
        <Marker position={this.state.destination} 
        icon= {{
          path: "M10,19 L8,20.5 L8,22 L11.5,21 L15,22 L15,20.5 L13,19 L13,13.5 L21,16 L21,14 L13,9 L13,3.5 C13,2.67 12.33,2 11.5,2 C10.67,2 10,2.67 10,3.5 L10,9 L2,14 L2,16 L10,13.5 L10,19 Z",
          scale: 1.5,
          rotation: 317.198,
          strokeColor: "#000",
          fillColor: "#000",
          fillOpacity: 1
        }}
        label={'W'} />
        {this.state.waypoints.map(waypt => (
          <Marker
            position={{ lat: waypt.location.lat, lng: waypt.location.lng }}
            icon={{
              path: "M10,19 L8,20.5 L8,22 L11.5,21 L15,22 L15,20.5 L13,19 L13,13.5 L21,16 L21,14 L13,9 L13,3.5 C13,2.67 12.33,2 11.5,2 C10.67,2 10,2.67 10,3.5 L10,9 L2,14 L2,16 L10,13.5 L10,19 Z",
              scale: 1.5,
              rotation: 100,
              strokeColor: "#000",
              fillColor: "#000",
              fillOpacity: 1
            }}
            label={'W'}
          />
        ))}
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
