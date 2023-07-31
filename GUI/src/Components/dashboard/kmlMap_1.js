import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, KmlLayer } from "react-google-maps"
/**
 * This component is handling position which will be shown when google map is initiated.
 * @component
 */

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 50.5010789, lng: 4.4764595 }}
  >
    <KmlLayer 
        url='https://stardev-38337.web.app/KML_Samples.kml'
        options={{ preserveViewport : false}}
    />
    {props.isMarkerShown && <Marker position={{ lat: 50.5010789, lng: 4.4764595 }} />}
  </GoogleMap>
))


export default class GoogleMaps extends Component {
    render(){
        return( 
            <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2HahvLvDI0KcditUKBizQtAyvwm2lhAY"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}