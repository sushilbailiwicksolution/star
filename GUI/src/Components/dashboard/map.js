import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow, Polyline } from 'google-maps-react';
const CSVData = require("../../store/csvjson.json");
const mapStyle = [
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#dceafa'
      }
    ]
  },
  ]

/**
 * This component is responsible for handling map actions.
 * @component
 */
  export class MapContainer extends Component {
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
      initialCenter: { lat: CSVData[0].Latitude, lng: CSVData[0].Longitude },
      allLastLngs: CSVData,
      showModal : false,
      dataToShow : {},
      mapDiv : "",
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
      PolylineOptions: { strokeWeight: 2, strokeOpacity: 1, strokeColor: '#1dc1ec',geodesic: true},
      allStores:[],
      polyLine: <Polyline 
        path={polylineData}
        options = {{ strokeWeight: 2, strokeOpacity: 1, strokeColor: '#1dc1ec',geodesic: true}}
      />
    }
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
        // let icon = require("../../Assets/images/marker-img.png").default;
        // require("../../Assets/images/marker-img.png").default;
        // if(index === 0) {
        //   const lastRotation = allLastLngs[allLastLngs.length - 1].Heading;
        //   console.log(-45 + store.Heading - lastRotation);
        //   icon = {
        //     path: "M3.29,6.56l1.41-1.41l9.55,2.47l3.89-3.89c0.59-0.59,1.53-0.59,2.12,0s0.59,1.53,0,2.12l-3.89,3.89l2.47,9.55l-1.41,1.41 l-4.24-7.78l-3.89,3.89l0.35,2.47L8.6,20.35l-1.77-3.18L3.65,15.4l1.06-1.06l2.47,0.35l3.89-3.89L3.29,6.56z",
        //     scale: 4,
        //     rotation: -45 + lastRotation - store.Heading 
        //   };
        // }
        // if(index === allLastLngs.length - 1) {
          // const firstHeading = allLastLngs[0].Heading;
          // const currentRotaion =  -45 + firstHeading - store.Heading;
          // const currentRotaion = this.getRotation(allLastLngs[0], store);
          // console.log('currentRotaion >>>', currentRotaion);
          // icon = {
          //   path: "M10,19 L8,20.5 L8,22 L11.5,21 L15,22 L15,20.5 L13,19 L13,13.5 L21,16 L21,14 L13,9 L13,3.5 C13,2.67 12.33,2 11.5,2 C10.67,2 10,2.67 10,3.5 L10,9 L2,14 L2,16 L10,13.5 L10,19 Z",
          //   scale: 1,
          //   rotation: store.Heading,
          //   strokeColor: "#0800ff",
          //   fill: '#0800ff',
          //   strokeWeight: 2,
          //   anchor:{ x: 13, y: 0 },
          // };
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
            url: `https://stardev-38337.web.app/up.png?rotate=${store.Heading}&i=${index}`,
            anchor: { x: 5, y: 9 }
          };
          // icon = "https://stardev-38337.web.app/flight_icon.svg?rotate="+store.Heading;
        // }
        return <Marker key={uniqueKey} id={`marker_${index}`} position={{
          lat: Latitude,
          lng: Longitude
        }}
          icon={icon}
          onMouseover={this.showInfoWindow}
          onMouseout={this.hideInfoWindow}
          data = {store}
          // onMouseover = {() => this.showModal(store)}
          // onMouseout = {() => this.hideModal()}
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
          const markerUrl = `https://stardev-38337.web.app/up.png?rotate=${st.Heading}&i=${index}`
          const marker = document.querySelector(`[src="${markerUrl}"]`)
          // console.log(marker);
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
    // const mapDiv = <Map
    //   onClick={(t, map, c) => this.addMarker(c.latLng, map)}
    //   google={this.props.google}
    //   zoom={7}
    //   style={this.state.mapStyles}
    //   initialCenter={this.state.initialCenter}
    // >
    //   {displayMarkers}
    //   <InfoWindow
    //       marker={this.state.activeMarker}
    //       visible={this.state.showingInfoWindow}
    //     >
    //       <div>
    //         <h4>Hello</h4>
    //       </div>
    //   </InfoWindow>
    // </Map>
    
    this.setState({
      // mapDiv: mapDiv,
      displayMarkers: displayMarkers
    }, () => {
      setTimeout(() => {
        this.setState({
          loader: false
        })
      }, 3000)
    })
  }

  showInfoWindow = (props, marker) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });
  }

  hideInfoWindow = () => {
    this.setState({
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false
    });
  }

  getRotation = (place1, place2) => {
    const lat1 = place1.Latitude;
    const lon1 = place1.Longitude;
    const lat2 = place2.Latitude;
    const lon2 = place2.Longitude;
    let longDiff = lon1 - lon2;
    let X = Math.cos(lat2) * Math.sin(longDiff);
    let Y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(longDiff);
    console.log(X, Y)
    let beta = Math.atan2(X, Y);
    console.log(beta)
    const angle = beta * 57.2958;
    return angle;
  }

  addMarker = (location, map) => {
    return false;
    // const newLocation = { Latitude: location.lat(), Longitude: location.lng() };
    // let oldLocations = this.state.allLastLngs;
    // oldLocations.push(newLocation);
    // this.setState({
    //   allLastLngs: oldLocations
    // }, () => {
    //   console.log(this.state.allLastLngs);
    //   // this.componentDidMount()
    // })
  }

  showModal = (store) => {
    this.setState({showModal : true, dataToShow : store})
  }

  hideModal = () => {
    this.setState({showModal: false, dataToShow: {}});
  }

  componentWillUnmount () {
    this.setState({
      mapDiv : "",
      displayMarkers : <Marker position={{
        lat: CSVData[0].Latitude,
        lng: CSVData[0].Longitude,
        zoom : 7
      }}
      onClick = {this.showInfoWindow}
      />
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
    this.setState({zoom: zoomLevel, polyLine: <Polyline 
      path={this.state.polylineData}
      options = {{ strokeWeight: 2, strokeOpacity: 1, strokeColor: '#1dc1ec',geodesic: true}}
    />});
  }
}

_handleCenterChanged() {
  const newLat = this.googleMap && this.googleMap.current && this.googleMap.current.map && this.googleMap.current.map.center && this.googleMap.current.map.center.lat() ? this.googleMap.current.map.center.lat() : false;
  const newLng = this.googleMap && this.googleMap.current && this.googleMap.current.map && this.googleMap.current.map.center && this.googleMap.current.map.center.lng() ? this.googleMap.current.map.center.lng() : false;
  const initialCenter = this.state.initialCenter ? this.state.initialCenter : false;
  if (newLat && newLng && initialCenter && (initialCenter.lat !== newLat || initialCenter.lng !== newLng)) {
    this.setState({
      initialCenter: { lat: newLat, lng: newLng },
      polyLine: <Polyline 
        path={this.state.polylineData}
        options = {{ strokeWeight: 2, strokeOpacity: 1, strokeColor: '#1dc1ec',geodesic: true}}
      />
    });
  }
}

  render() {
    // const { dataToShow } = this.state; 
    // let modalValues = [];
    // for(let key in dataToShow) {
    //   const obj = {key : key, val : dataToShow[key]};
    //   modalValues.push(obj)
    // }

    return (
      <React.Fragment>
        <div className="loading" style={{ display: this.state.loader ? 'block' : 'none' }}><img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" /></div>
        <Map
          containerStyle={{
            width: "100%",
            height: this.props.mapHeight && this.props.mapHeight > 0 ? this.props.mapHeight : "100%"
          }}
          onClick={(t, map, c) => this.addMarker(c.latLng, map)}
          google={this.props.google}
          zoom={this.state.zoom}
          maxZoom={12}
          minZoom={5}
          initialCenter={this.state.initialCenter}
          // mapTypeControlOptions={{ mapTypeIds: ["satellite", "terrain"] } }
          onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
          onZoomChanged={this._handleZoomChanged.bind(this)}
          ref={this.googleMap}
          onCenterChanged={this._handleCenterChanged.bind(this)}
        >
          {this.state.displayMarkers}
          {this.state.polyLine}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            style={{
              background: '#000000'
            }}
          >
            <div>
              <ul style={{listStyle:'none', textAlign: 'left', width: '170px', height: '58px', fontSize: '17px', padding: '0px', fontWeight: '600'}}>
                <li>Longitude : {this.state.selectedPlace.data ? this.state.selectedPlace.data['Longitude'] : ""}</li>
                <li>Latitude: {this.state.selectedPlace.data ? this.state.selectedPlace.data['Latitude'] : ""}</li>
                <li>Heading: {this.state.selectedPlace.data ? this.state.selectedPlace.data['Heading'] : ""}</li>
              </ul>
            </div>
          </InfoWindow>
        </Map>
        {/* {this.state.showModal ? (<div className="modal" tabIndex="-1" role="dialog" style={{display: "block"}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Marker Details</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {this.setState({showModal: false, dataToShow: {}})}}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                { modalValues.map((value, index) => {
                  return <p key={index}>{value.key} : {value.val}</p>
                }) }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => {this.setState({showModal: false, dataToShow: {}})}}>Close</button>
              </div>
            </div>
          </div>
        </div>) : (null)} */}
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC9gF0NXH_KTIccE1w1a2_BpLqW0KuECb8'
})(MapContainer);