import React, { useState, useEffect, useRef } from 'react';

import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  Polyline
} from 'google-maps-react';

import {
  BARON_BASE_URL,
  BARON_KEY,
  BARON_SECRET
} from '../../Config/siteConfig';

import { GOOGLE_API_KEY } from '../../Config/siteConfig';
import { useSelector } from 'react-redux';

const defaultMapState = {
  initialCenter: { lat: 23.3, lng: 22.2 },
  allLastLngs: [],
  showModal: false,
  dataToShow: {},
  mapDiv: '',
  activeMarker: {},
  selectedPlace: {},
  showingInfoWindow: false,
  infoData: {},
  displayMarkers: '',
  loader: false,
  polylineData: [],
  zoom: 3,
  PolylineOptions: {
    strokeWeight: 2,
    strokeOpacity: 1,
    strokeColor: '#1dc1ec',
    geodesic: true
  },
  allStores: [],
  polyLine: (
    <Polyline
      path={[]}
      options={{
        strokeWeight: 2,
        strokeOpacity: 1,
        strokeColor: '#1dc1ec',
        geodesic: true
      }}
    />
  ),
  selectedMarker: null,
  overlayMapTypes: []
};

const defaultInfoPopup = {
  activeMarker: {},
  selectedPlace: {},
  showingInfoWindow: false
}

function MapContainer(props) {
  const [loader, setLoader] = useState(false);
  const [mapState, setMapState] = useState(defaultMapState);
  const [infoPopup,setInfoPopup] = useState(defaultInfoPopup);
  const viewReducerResponse = useSelector((state) => state.viewReducer);
  const googleMap = useRef(null);

  useEffect(() => {
    console.log(
      'currentFlightList in map',
      viewReducerResponse.currentFlightList
    );
    if (viewReducerResponse.currentFlightList.length > 0) {
      const allLastLngs = viewReducerResponse.currentFlightList;
      let zoomLevel = allLastLngs.length > 200 ? 6 : 3;
      const initialCenter = {
        lat: Number(allLastLngs[0].gps_lat),
        lng: Number(allLastLngs[0].gps_long)
      };

      let allStores = [];
      let polyData = [];
      const displayMarkers = allLastLngs.map((store, index) => {
        const Latitude = parseFloat(store.gps_lat);
        const Longitude = parseFloat(store.gps_long);

        if (Latitude && Longitude) {
          const uniqueKey =
            Latitude.toString() + Longitude.toString() + index.toString();
          let replacedKey = uniqueKey.replace(/\./g, '');
          replacedKey = parseInt(replacedKey);
          allStores.push(store);
          polyData.push({ lat: Latitude, lng: Longitude });
          let icon = _getIcon(1.5, store.heading);
          let className = `marker_${index}`;
          let position = {
            lat: Latitude,
            lng: Longitude
          };
          return _getMarker(
            uniqueKey,
            index,
            position,
            icon,
            store,
            store.heading
          );
        }
      });

      const polyLine = getPolyline(polyData);
      setMapState({
        ...mapState,
        displayMarkers,
        polyLine,
        initialCenter,
        zoom: zoomLevel
      });
    }
  }, [viewReducerResponse.currentFlightList]);

  useEffect(() => {
    if (viewReducerResponse.baronMapData) {
      const baraonResponse = viewReducerResponse.baronMapData.baronResponse;
      const PRODUCT = viewReducerResponse.baronMapData.PRODUCT;
      const CONFIGURATION = viewReducerResponse.baronMapData.CONFIGURATION;
      const signature = viewReducerResponse.baronMapData.signature;
      const overLayData = [];
      if (baraonResponse) {
        baraonResponse.forEach((item) => {
          createOverlayLayer(
            overLayData,
            item.time,
            PRODUCT,
            CONFIGURATION,
            signature
          );
        });
      }
      overLayData.forEach((item) => {
        googleMap.current.map.overlayMapTypes.push(item);
      });

      // console.log(googleMap.current.map.overlayMapTypes.push(overLayData));
      setMapState({ ...mapState, overlayMapTypes: overLayData });
    }
  }, [viewReducerResponse.baronMapData]);

  const createOverlayLayer = (
    overLayData,
    time,
    PRODUCT,
    CONFIGURATION,
    signature
  ) => {
    const layer = new window.google.maps.ImageMapType({
      getTileUrl: function (coord, zoom) {
        // http://code.google.com/apis/maps/documentation/javascript/maptypes.html#ProjectionTileUsage

        // Our grid is square, so this represents either the number of tiles high or wide.
        var numTiles = 1 << zoom;
        // Don't wrap tiles vertically.
        if (coord.y < 0 || coord.y >= numTiles) {
          return null;
        }

        // Wrap tiles horizontally. Part of this looks redundant, but it is NOT!
        // That part is needed to prevent requests for negative numbered tiles.
        var x = ((coord.x % numTiles) + numTiles) % numTiles;

        // Google Maps considers the TopLeft grid tile to be (0, 0), while TMS
        // considers the Bottomleft grid tile to be (0, 0).
        var y = numTiles - coord.y - 1;

        // Url of overlay tile
        var baseUrl =
          BARON_BASE_URL +
          '/' +
          BARON_KEY +
          '/tms/1.0.0/' +
          PRODUCT +
          '+' +
          CONFIGURATION +
          '+' +
          time +
          '/' +
          zoom +
          '/' +
          x +
          '/' +
          y +
          '.png?' +
          signature;
        return baseUrl;
      },
      tileSize: new window.google.maps.Size(256, 256),
      opacity: 0.7
      // isPng: true
    });
    overLayData.push(layer);
  };

  const _mapLoaded = (mapProps, map) => {
    map.setOptions({
      mapTypeId: 'terrain'
    });
  };

  const _handleZoomChanged = (event) => {
    console.log('googleMap', googleMap);
    const zoomLevel = false;
    //const newZoom = googleMap.current;
    //console.log('newZoom', newZoom);

    if (zoomLevel && zoomLevel !== mapState.zoom) {
      let obj = {
        zoom: zoomLevel,
        polyLine: (
          <Polyline
            path={mapState.polylineData}
            options={{
              strokeWeight: 2,
              strokeOpacity: 1,
              strokeColor: '#1dc1ec',
              geodesic: true
            }}
          />
        )
      };
    }
  };

  const handleMarkerClick = (
    uniqueKey,
    index,
    position,
    icon,
    data,
    rotation
  ) => {};

  const showInfoWindow = (props, marker) => {
    const obj = {
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    };
    setInfoPopup({ ...infoPopup, ...obj });
  };

  const hideInfoWindow = (props) => {
    setInfoPopup({ ...infoPopup, ...defaultInfoPopup });
  };

  const getRotation = (place1, place2) => {
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

  const _getIcon = (scale, rotation) => {
    return {
      path: 'M4.692,10.001c0,3.174,2.583,5.756,5.759,5.756s5.758-2.582,5.758-5.756c0-3.175-2.582-5.759-5.758-5.759   S4.692,6.826,4.692,10.001z M5.698,10.001c0-2.545,2.012-4.624,4.529-4.741l-2.56,3.208v2.956l1.948-2.44v5.69   C7.393,14.277,5.698,12.336,5.698,10.001z M15.203,10.001c0,2.334-1.695,4.278-3.916,4.672v-5.69l1.947,2.44V8.468l-2.56-3.208   C13.191,5.378,15.203,7.456,15.203,10.001z',
      fillColor: '#ffffff',
      rotation: parseFloat(rotation),
      fillOpacity: 1,
      strokeWeight: 1,
      scale: scale,
      strokeColor: '#0b85ef',
      strokeOpacity: 1,
      anchor: { x: 12, y: 0 }
    };
  };
  const _getMarker = (uniqueKey, index, position, icon, data, rotation) => {
    return (
      <Marker
        key={uniqueKey}
        position={position}
        icon={icon}
        onMouseover={showInfoWindow}
        onMouseout={hideInfoWindow}
        onClick={() =>
          handleMarkerClick(uniqueKey, index, position, icon, data, rotation)
        }
        data={data}
      />
    );
  };

  const getPolyline = (polyLineData) => {
    return (
      <Polyline
        path={polyLineData}
        options={{
          strokeWeight: 2,
          strokeOpacity: 1,
          strokeColor: '#1dc1ec',
          geodesic: true
        }}
      />
    );
  };

  return (
    <React.Fragment>
      <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
        <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
      </div>
      <Map
        google={props.google}
        ref={googleMap}
        containerStyle={{
          width: '100%',
          height:
            props.mapHeight && props.mapHeight > 0 ? props.mapHeight : '100%'
        }}
        zoom={mapState.zoom}
        maxZoom={12}
        minZoom={3}
        initialCenter={mapState.initialCenter}
        center={mapState.initialCenter}
        // mapTypeControlOptions={{ mapTypeIds: ["satellite", "terrain"] } }
        onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
        onZoomChanged={_handleZoomChanged}
        // overlayMapTypes={mapState.overlayMapTypes}
        gestureHandling='greedy'
      >
        {mapState.displayMarkers}
        {mapState.polyLine}
        <InfoWindow
          marker={infoPopup.activeMarker}
          visible={infoPopup.showingInfoWindow}
          style={{
            background: '#000000'
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
                fontWeight: '600'
              }}
            >
              <li>
                Longitude :{' '}
                {infoPopup.selectedPlace.data
                  ? infoPopup.selectedPlace.data['gps_long']
                  : ''}
              </li>
              <li>
                Latitude:{' '}
                {infoPopup.selectedPlace.data
                  ? infoPopup.selectedPlace.data['gps_lat']
                  : ''}
              </li>
              <li>
                Heading:{' '}
                {infoPopup.selectedPlace.data
                  ? infoPopup.selectedPlace.data['heading']
                  : ''}
              </li>
            </ul>
          </div>
        </InfoWindow>
      </Map>
    </React.Fragment>
  );
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapContainer);
