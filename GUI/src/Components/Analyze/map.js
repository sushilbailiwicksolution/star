import React, { Component } from 'react';
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  Polyline,
} from 'google-maps-react';
const CSVData = require('../../store/csvjson_1.json');
const mapStyle = [
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#dceafa',
      },
    ],
  },
];

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.googleMap = React.createRef();
    let polylineData = [];
    CSVData.forEach((data) => {
      if (data.Latitude && data.Longitude) {
        polylineData.push({ lat: data.gps_lat, lng: data.gps_long });
      }
    });
    this.state = {
      initialCenter: { lat: CSVData[0].gps_lat, lng: CSVData[0].gps_long },
      allLastLngs: CSVData,
      showModal: false,
      dataToShow: {},
      mapDiv: '',
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      infoData: {},
      displayMarkers: '',
      loader: false,
      polylineData: polylineData,
      zoom: 3,
      PolylineOptions: {
        strokeWeight: 2,
        strokeOpacity: 1,
        strokeColor: '#1dc1ec',
        geodesic: true,
      },
      allStores: [],
      polyLine: (
        <Polyline
          path={polylineData}
          options={{
            strokeWeight: 2,
            strokeOpacity: 1,
            strokeColor: '#1dc1ec',
            geodesic: true,
          }}
        />
      ),
      selectedMarker: null,
    };
  }

  componentDidMount() {
    this.loadMapData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mapJson !== this.props.mapJson) {
      this.loadMapData();
    }
  }

  loadMapData = () => {
    // const { allLastLngs } = this.state;
    let allLastLngs = this.props.mapJson;
    console.log('allLastLngs', allLastLngs);
    if (allLastLngs.length === 0) {
      return false;
    }
    this.setState({
      loader: true,
    });
    let allStores = [];
    let polylineData = [];
    let zoomLevel = allLastLngs[0].data.length > 400 ? 6 : 3;
    let displayMarkers;

    allLastLngs.forEach((item) => {
      let flightId = item.flightId;
      displayMarkers = item.data.map((store, index) => {
        // let remainder = index % 5;
        // if(index === 0 || index === allLastLngs.length - 1 || remainder === 0) {
        // const { Latitude, Longitude } = store;
        const Latitude = parseFloat(store.gps_lat);
        const Longitude = parseFloat(store.gps_long);
        if (Latitude && Longitude) {
          const uniqueKey =
            Latitude.toString() + Longitude.toString() + index.toString();
          let replacedKey = uniqueKey.replace(/\./g, '');
          replacedKey = parseInt(replacedKey);
          allStores.push(store);
          polylineData.push({ lat: Latitude, lng: Longitude });

          let icon = this._getIcon(1.5, store.heading);
          let className = `marker_${index}`;

          let position = {
            lat: Latitude,
            lng: Longitude,
          };
          return this._getMarker(
            uniqueKey,
            flightId,
            index,
            position,
            icon,
            store,
            store.heading
          );
        } else {
          return null;
        }
        // }
      });
    });

    this.setState(
      {
        zoom: zoomLevel,
        displayMarkers: displayMarkers,
        initialCenter: {
          lat: allLastLngs[0].gps_lat,
          lng: allLastLngs[0].gps_long,
        },
        polyLine: (
          <Polyline
            path={polylineData}
            options={{
              strokeWeight: 2,
              strokeOpacity: 1,
              strokeColor: '#1dc1ec',
              geodesic: true,
            }}
          />
        ),
      },
      () => {
        setTimeout(() => {
          this.setState({
            loader: false,
          });
        }, 3000);
      }
    );
  };

  showInfoWindow = (props, marker) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });
  };

  handleMarkerClick = (props, marker) => {
    let routeId = props.id;
    this.props.onClickedMaker(props.flightId, props.markerIndex);
    let alreadySelectedMarker = this.state.selectedMarker;
    let changePreviousSelectedMarker = false;
    let previousSelectedMarker;
    let previousSelectedIndex;
    let index = this.state.displayMarkers.findIndex((item, index) => {
      if (item && item.props && item.props.id === routeId) return true;
    });
    let rotation = this.state.displayMarkers[index].props.rotation;
    let className = this.state.displayMarkers[index].props.className;
    let position = this.state.displayMarkers[index].props.position;
    let data = this.state.displayMarkers[index].props.data;
    let flightId = this.state.displayMarkers[index].props.flightId;
    let markerIndex = this.state.displayMarkers[index].props.markerIndex;
    let scaleValue = 3;

    if (alreadySelectedMarker) {
      alreadySelectedMarker = alreadySelectedMarker.props;
      console.log('alreadySelectedMarker', alreadySelectedMarker);
      if (alreadySelectedMarker.id == routeId) {
        scaleValue = alreadySelectedMarker.icon.scale == 3 ? 1.5 : 3;
      } else {
        changePreviousSelectedMarker = true;
        previousSelectedIndex = this.state.displayMarkers.findIndex(
          (item, index) => {
            if (
              item &&
              item.props &&
              item.props.id === alreadySelectedMarker.id
            )
              return true;
          }
        );
        let previousRotation = alreadySelectedMarker.rotation;
        let previousclassName = alreadySelectedMarker.className;
        let previousposition = alreadySelectedMarker.position;
        let previousdata = alreadySelectedMarker.data;
        let previousflightId = alreadySelectedMarker.flightId;
        let previousMarkerIndex = alreadySelectedMarker.markerIndex;

        let previousSelectedIcon = this._getIcon(1.5, previousRotation);

        previousSelectedMarker = this._getMarker(
          alreadySelectedMarker.id,
          previousflightId,
          previousMarkerIndex,
          previousposition,
          previousSelectedIcon,
          previousdata,
          previousRotation
        );
      }
    }

    let updatedIcon = this._getIcon(scaleValue, rotation);
    let updateMarker = this._getMarker(
      routeId,
      flightId,
      markerIndex,
      position,
      updatedIcon,
      data,
      rotation
    );

    // 1. Make a shallow copy of the items
    let displayMarkers = [...this.state.displayMarkers];
    displayMarkers[index] = updateMarker;
    if (changePreviousSelectedMarker) {
      displayMarkers[previousSelectedIndex] = previousSelectedMarker;
    }

    // 2. Set the state to our new copy
    this.setState({ displayMarkers }, () => {});
    this.setState({ selectedMarker: updateMarker }, () => {
      this.forceUpdate();
    });
    // this.forceUpdate();
  };

  hideInfoWindow = (props) => {
    let markerUrl = props.icon.url;
    let image = document.querySelector(`[src="${markerUrl}"]`);
    if (image) {
      image.style.width = '100%';
      image.style.height = '100%';
      image.style.opacity = 99999999999;
    }
    this.setState({
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
    });
  };

  getRotation = (place1, place2) => {
    const lat1 = place1.Latitude;
    const lon1 = place1.Longitude;
    const lat2 = place2.Latitude;
    const lon2 = place2.Longitude;
    let longDiff = lon1 - lon2;
    let X = Math.cos(lat2) * Math.sin(longDiff);
    let Y =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(longDiff);
    console.log(X, Y);
    let beta = Math.atan2(X, Y);
    console.log(beta);
    const angle = beta * 57.2958;
    return angle;
  };

  addMarker = (location, map) => {
    return false;
  };

  showModal = (store) => {
    this.setState({ showModal: true, dataToShow: store });
  };

  hideModal = () => {
    this.setState({ showModal: false, dataToShow: {} });
  };

  componentWillUnmount() {
    this.setState({
      mapDiv: '',
      displayMarkers: (
        <Marker
          position={{
            lat: CSVData[0].Latitude,
            lng: CSVData[0].Longitude,
            zoom: 7,
          }}
          onClick={this.showInfoWindow}
        />
      ),
    });
  }

  _mapLoaded(mapProps, map) {
    map.setOptions({
      mapTypeId: 'terrain',
    });
  }

  _handleZoomChanged(event) {
    const zoomLevel =
      this.googleMap &&
      this.googleMap.current &&
      this.googleMap.current.listeners &&
      this.googleMap.current.listeners.zoom_changed &&
      this.googleMap.current.listeners.zoom_changed.Fb &&
      this.googleMap.current.listeners.zoom_changed.Fb.zoom
        ? this.googleMap.current.listeners.zoom_changed.Fb.zoom
        : false;

    const newZoom = this.googleMap.current;
    console.log('newZoom', newZoom);

    if (zoomLevel && zoomLevel !== this.state.zoom) {
      this.setState({
        zoom: zoomLevel,
        polyLine: (
          <Polyline
            path={this.state.polylineData}
            options={{
              strokeWeight: 2,
              strokeOpacity: 1,
              strokeColor: '#1dc1ec',
              geodesic: true,
            }}
          />
        ),
      });
    }
  }

  _handleCenterChanged() {
    const newLat =
      this.googleMap &&
      this.googleMap.current &&
      this.googleMap.current.map &&
      this.googleMap.current.map.center &&
      this.googleMap.current.map.center.lat()
        ? this.googleMap.current.map.center.lat()
        : false;
    const newLng =
      this.googleMap &&
      this.googleMap.current &&
      this.googleMap.current.map &&
      this.googleMap.current.map.center &&
      this.googleMap.current.map.center.lng()
        ? this.googleMap.current.map.center.lng()
        : false;
    const initialCenter = this.state.initialCenter
      ? this.state.initialCenter
      : false;
    if (
      newLat &&
      newLng &&
      initialCenter &&
      (initialCenter.lat !== newLat || initialCenter.lng !== newLng)
    ) {
      this.setState({
        initialCenter: { lat: newLat, lng: newLng },
        polyLine: (
          <Polyline
            path={this.state.polylineData}
            options={{
              strokeWeight: 2,
              strokeOpacity: 1,
              strokeColor: '#1dc1ec',
              geodesic: true,
            }}
          />
        ),
      });
    }
  }

  _getIcon(scale, rotation) {
    return {
      path: 'M4.692,10.001c0,3.174,2.583,5.756,5.759,5.756s5.758-2.582,5.758-5.756c0-3.175-2.582-5.759-5.758-5.759   S4.692,6.826,4.692,10.001z M5.698,10.001c0-2.545,2.012-4.624,4.529-4.741l-2.56,3.208v2.956l1.948-2.44v5.69   C7.393,14.277,5.698,12.336,5.698,10.001z M15.203,10.001c0,2.334-1.695,4.278-3.916,4.672v-5.69l1.947,2.44V8.468l-2.56-3.208   C13.191,5.378,15.203,7.456,15.203,10.001z',
      fillColor: '#ffffff',
      rotation: parseFloat(rotation),
      fillOpacity: 1,
      strokeWeight: 1,
      scale: scale,
      strokeColor: '#0b85ef',
      strokeOpacity: 1,
      anchor: { x: 12, y: 0 },
    };
  }
  _getMarker(uniqueKey, flightId, index, position, icon, data, rotation) {
    return (
      <Marker
        key={uniqueKey}
        id={uniqueKey}
        flightId={flightId}
        markerIndex={index}
        className={`marker_${index}`}
        position={position}
        icon={icon}
        onMouseover={this.showInfoWindow}
        // onMouseover = { (e) => { e.icon.scale=2; console.log(e.icon)} }
        onMouseout={this.hideInfoWindow}
        onClick={this.handleMarkerClick}
        data={data}
        rotation={rotation}
      />
    );
  }

  render() {
    return (
      <React.Fragment>
        <div
          className='loading'
          style={{ display: this.state.loader ? 'block' : 'none' }}
        >
          <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
        </div>
        <Map
          containerStyle={{
            width: '100%',
            height:
              this.props.mapHeight && this.props.mapHeight > 0
                ? this.props.mapHeight
                : '100%',
          }}
          onClick={(t, map, c) => this.addMarker(c.latLng, map)}
          google={this.props.google}
          zoom={this.state.zoom}
          maxZoom={12}
          minZoom={3}
          initialCenter={this.state.initialCenter}
          // mapTypeControlOptions={{ mapTypeIds: ["satellite", "terrain"] } }
          onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
          onZoomChanged={this._handleZoomChanged.bind(this)}
          ref={this.googleMap}
          // onCenterChanged={this._handleCenterChanged.bind(this)}
        >
          {this.state.displayMarkers}
          {this.state.polyLine}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            style={{
              background: '#000000',
            }}
          >
            <div>
              <ul
                style={{
                  listStyle: 'none',
                  textAlign: 'left',
                  width: '170px',
                  height: '58px',
                  fontSize: '17px',
                  padding: '0px',
                  fontWeight: '600',
                }}
              >
                <li>
                  Longitude :{' '}
                  {this.state.selectedPlace.data
                    ? this.state.selectedPlace.data['gps_long']
                    : ''}
                </li>
                <li>
                  Latitude:{' '}
                  {this.state.selectedPlace.data
                    ? this.state.selectedPlace.data['gps_lat']
                    : ''}
                </li>
                <li>
                  Heading:{' '}
                  {this.state.selectedPlace.data
                    ? this.state.selectedPlace.data['heading']
                    : ''}
                </li>
              </ul>
            </div>
          </InfoWindow>
        </Map>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC9gF0NXH_KTIccE1w1a2_BpLqW0KuECb8',
})(MapContainer);
