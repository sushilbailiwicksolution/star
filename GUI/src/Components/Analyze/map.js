import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  Polyline,
} from "google-maps-react";
import StartRecording from "../../Assets/images/start-recording.png";

const CSVData = require("../../store/csvjson_1.json");
const mapStyle = [
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#dceafa",
      },
    ],
  },
];

/**
 * This component is handling the flight view on map. All the waypoints which are being shown on google map.
 * @component
 */

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
      mapDiv: "",
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      infoData: {},
      displayMarkers: "",
      loader: false,
      polylineData: polylineData,
      zoom: 3,
      PolylineOptions: {
        strokeWeight: 2,
        strokeOpacity: 1,
        strokeColor: "#1dc1ec",
        geodesic: true,
      },
      allStores: [],
      polyLine: (
        <Polyline
          path={polylineData}
          options={{
            strokeWeight: 2,
            strokeOpacity: 1,
            strokeColor: "#1dc1ec",
            geodesic: true,
          }}
        />
      ),
      polyLineArray: [],
      mapDrawArray: [],
      selectedMarker: null,
    };
  }

    /**
   * Lifecycle method called after the component mounts.
   * It loads the map data and sets up the initial state.
   * @memberof MapContainer
   */
  componentDidMount() {
    this.loadMapData();
  }

  /**
   * Lifecycle method called when the component updates.
   * It responds to changes in props and triggers relevant actions.
   * @memberof MapContainer
   * @param {Object} prevProps - The previous props before the update.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.mapJson !== this.props.mapJson) {
      this.loadMapData();
    }

    if (prevProps.mapCenter !== this.props.mapCenter) {
      if (this.props.mapCenter) {
        this.changeMapCenter();
      }
    }

    if (prevProps.clickedFlightAndRoute !== this.props.clickedFlightAndRoute) {
      if (this.props.clickedFlightAndRoute.flightId) {
        const obj = this.state.displayMarkers.find((item) => {
          if (item) {
            return (
              item.props.flightId ==
                this.props.clickedFlightAndRoute.flightId &&
              item.props.markerIndex ==
                this.props.clickedFlightAndRoute.routeIndex
            );
          }
        });
        if (obj && obj.props) {
          this.handleMarkerClick(obj.props, false);
        }
      }
    }
  }

    /**
   * Generates a Polyline component for a given set of polyline data and flight ID.
   * @memberof MapContainer
   * @param {Object[]} polyLineData - The array of LatLng objects representing the polyline data.
   * @param {string} flightId - The ID of the flight associated with the polyline.
   * @returns {JSX.Element} - The JSX element representing the Polyline component.
   */
  getPolyline(polyLineData, flightId) {
    return (
      <Polyline
        key={flightId}
        path={polyLineData}
        options={{
          strokeWeight: 2,
          strokeOpacity: 1,
          strokeColor: "#1dc1ec",
          geodesic: true,
        }}
      />
    );
  }

  /**
   * Loads map data and updates the state with the necessary markers and polylines.
   * @memberof MapContainer
   */
  loadMapData = () => {
    let allLastLngs = this.props.mapJson;
    if (allLastLngs.length === 0) {
      this.setState({
        loader: false,
        polylineData: [],
        displayMarkers: [],
        polyLine: null,
        polyLineArray: [],
        mapDrawArray: [],
      });
      return false;
    }

    this.setState({
      initialCenter: {
        lat: allLastLngs[allLastLngs.length - 1].data[0].gps_lat,
        lng: allLastLngs[allLastLngs.length - 1].data[0].gps_long,
      },
    });

    let allStores = [];
    let polylineData = [];
    let polyArray = [];
    //let zoomLevel = allLastLngs[allLastLngs.length - 1].data.length > 200 ? 6 : 3;
    let zoomLevel = 6;
    let displayMarkers;
    this.setState({
      loader: true,
      polylineData: [],
      displayMarkers: [],
    });
    let mapArr = [];
    allLastLngs.forEach((item) => {
      let flightId = item.flightId;
      let polyData = [];
      displayMarkers = item.data.map((store, index) => {
        // let remainder = index % 5;
        // if(index === 0 || index === allLastLngs.length - 1 || remainder === 0) {
        // const { Latitude, Longitude } = store;
        const Latitude = parseFloat(store.gps_lat);
        const Longitude = parseFloat(store.gps_long);
        if (Latitude && Longitude) {
          const uniqueKey =
            Latitude.toString() + Longitude.toString() + index.toString();
          let replacedKey = uniqueKey.replace(/\./g, "");
          replacedKey = parseInt(replacedKey);
          allStores.push(store);
          polylineData.push({ lat: Latitude, lng: Longitude });
          polyData.push({ lat: Latitude, lng: Longitude });
          const event_name = store.event_name;

          //let icon = this._getIcon(1.5, store.heading);
          let icon = this.getIconValue(event_name, 1.5, store.heading);
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
            store.heading,
            event_name
          );
        } else {
          return null;
        }
        // }
      });
      let obj = {
        flightId: flightId,
        markers: displayMarkers,
      };
      mapArr.push(obj);
      polyArray.push(this.getPolyline(polyData, flightId));
    });

    this.setState(
      {
        zoom: zoomLevel,
        displayMarkers: displayMarkers,
        // initialCenter: {
        //   lat: allLastLngs[0].gps_lat,
        //   lng: allLastLngs[0].gps_long,
        // },
        initialCenter: {
          lat: allLastLngs[allLastLngs.length - 1].data[0].gps_lat,
          lng: allLastLngs[allLastLngs.length - 1].data[0].gps_long,
        },
        polyLine: (
          <Polyline
            path={polylineData}
            options={{
              strokeWeight: 2,
              strokeOpacity: 1,
              strokeColor: "#1dc1ec",
              geodesic: true,
            }}
          />
        ),
        polyLineArray: polyArray,
        mapDrawArray: mapArr,
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

  /**
   * Changes the center of the map when the `mapCenter` prop is updated.
   * @memberof MapContainer
   */
  changeMapCenter = () => {
    this.setState(
      {
        loader: true,
        zoom: 6,
        initialCenter: {
          lat: this.props.mapCenter.gps_lat,
          lng: this.props.mapCenter.gps_long,
        },
      },
      () => {
        setTimeout(() => {
          this.setState({
            loader: false,
          });
        }, 0);
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

  handleMarkerClick = (props, check) => {
    let routeId = props.id;
    if (check) {
      this.props.onClickedMaker(props.flightId, props.markerIndex);
    }
    let alreadySelectedMarker = this.state.selectedMarker;
    let changePreviousSelectedMarker = false;
    let previousSelectedMarker;
    let previousSelectedIndex;
    let previousMarkerIndex;
    let index = this.state.mapDrawArray.findIndex((item) => {
      if (item && item.flightId === props.flightId) return true;
    });

    let markerArr = this.state.mapDrawArray[index].markers;

    let rotation = markerArr[props.markerIndex].props.rotation;
    let position = markerArr[props.markerIndex].props.position;
    let data = markerArr[props.markerIndex].props.data;
    let flightId = markerArr[props.markerIndex].props.flightId;
    let markerIndex = markerArr[props.markerIndex].props.markerIndex;
    let scaleValue = 3;
    let event_name = markerArr[props.markerIndex].props.event_name;

    if (alreadySelectedMarker) {
      alreadySelectedMarker = alreadySelectedMarker.props;
      if (alreadySelectedMarker.id == routeId) {
        scaleValue = alreadySelectedMarker.icon.scale == 3 ? 1.5 : 3;
      } else {
        changePreviousSelectedMarker = true;
        previousSelectedIndex = this.state.mapDrawArray.findIndex(
          (item, index) => {
            if (item && item.flightId === alreadySelectedMarker.flightId)
              return true;
          }
        );
        let previousRotation = alreadySelectedMarker.rotation;
        let previousposition = alreadySelectedMarker.position;
        let previousdata = alreadySelectedMarker.data;
        let previousflightId = alreadySelectedMarker.flightId;
        let previousEventName = alreadySelectedMarker.event_name;

        previousMarkerIndex = alreadySelectedMarker.markerIndex;

        // let previousSelectedIcon = this._getIcon(1.5, previousRotation);
        let previousSelectedIcon = this.getIconValue(
          previousEventName,
          1.5,
          previousRotation
        );
        previousSelectedMarker = this._getMarker(
          alreadySelectedMarker.id,
          previousflightId,
          previousMarkerIndex,
          previousposition,
          previousSelectedIcon,
          previousdata,
          previousRotation,
          previousEventName
        );
      }
    }

    //let updatedIcon = this._getIcon(scaleValue, rotation);
    let updatedIcon = this.getIconValue(event_name, scaleValue, rotation);

    let updateMarker = this._getMarker(
      routeId,
      flightId,
      markerIndex,
      position,
      updatedIcon,
      data,
      rotation,
      event_name
    );

    // 1. Make a shallow copy of the items
    let mapDrawArray = [...this.state.mapDrawArray];
    mapDrawArray[index].markers[props.markerIndex] = updateMarker;
    if (changePreviousSelectedMarker) {
      mapDrawArray[previousSelectedIndex].markers[previousMarkerIndex] =
        previousSelectedMarker;
    }

    // 2. Set the state to our new copy
    this.setState({ mapDrawArray }, () => {});
    this.setState({ selectedMarker: updateMarker }, () => {
      this.forceUpdate();
    });
  };

  hideInfoWindow = (props) => {
    let markerUrl = props.icon.url;
    let image = document.querySelector(`[src="${markerUrl}"]`);
    if (image) {
      image.style.width = "100%";
      image.style.height = "100%";
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
    let beta = Math.atan2(X, Y);
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
      mapDiv: "",
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
      mapTypeId: "terrain",
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
    console.log("newZoom", newZoom);

    if (zoomLevel && zoomLevel !== this.state.zoom) {
      this.setState({
        zoom: zoomLevel,
        polyLine: (
          <Polyline
            path={this.state.polylineData}
            options={{
              strokeWeight: 2,
              strokeOpacity: 1,
              strokeColor: "#1dc1ec",
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
              strokeColor: "#1dc1ec",
              geodesic: true,
            }}
          />
        ),
      });
    }
  }

  _getIcon(scale, rotation) {
    return {
      path: "M4.692,10.001c0,3.174,2.583,5.756,5.759,5.756s5.758-2.582,5.758-5.756c0-3.175-2.582-5.759-5.758-5.759   S4.692,6.826,4.692,10.001z M5.698,10.001c0-2.545,2.012-4.624,4.529-4.741l-2.56,3.208v2.956l1.948-2.44v5.69   C7.393,14.277,5.698,12.336,5.698,10.001z M15.203,10.001c0,2.334-1.695,4.278-3.916,4.672v-5.69l1.947,2.44V8.468l-2.56-3.208   C13.191,5.378,15.203,7.456,15.203,10.001z",
      fillColor: "#ffffff",
      rotation: parseFloat(rotation),
      fillOpacity: 1,
      strokeWeight: 1,
      scale: scale,
      strokeColor: "#0b85ef",
      strokeOpacity: 1,
      anchor: { x: 12, y: 12 },
    };
  }
  _getMarker(
    uniqueKey,
    flightId,
    index,
    position,
    icon,
    data,
    rotation,
    event_name
  ) {
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
        onMouseout={this.hideInfoWindow}
        onClick={this.handleMarkerClick}
        data={data}
        rotation={rotation}
        event_name={event_name}
      />
    );
  }

  getIconValue(eventName, scale, rotation) {
    if (eventName == "Start Recording" || eventName == "Stop Recording") {
      return {
        url: StartRecording,
        fillColor: "#ffffff",
        rotation: parseFloat(rotation),
        fillOpacity: 1,
        strokeWeight: 1,
        scale: scale,
        strokeColor: "#0b85ef",
        strokeOpacity: 1,
        anchor: { x: 12, y: 12 },
        scaledSize: new window.google.maps.Size(20, 20),
      };
    } else if (eventName == "Engine Start") {
      return {
        path: "M19.9993 11.0245C19.9993 9.06284 19.3441 7.17653 18.5969 5.93971C18.3894 5.5963 18.1828 5.28426 17.9553 4.98158L16.3694 3.32373C15.8091 2.85134 15.1902 2.60712 14.474 2.96656C13.3486 3.53119 13.2193 4.9471 14.3118 5.78134C15.5437 6.72216 16.495 8.45791 16.7093 10.0045C16.8383 10.936 16.7872 11.8167 16.5878 12.634C16.3588 13.5722 15.9548 14.3588 15.4296 15.0748C14.711 16.0547 13.6409 16.8583 12.5034 17.303C9.87129 18.3319 7.05963 17.6143 5.25861 15.8122C3.2968 13.8492 2.7001 10.9643 3.79956 8.33247C4.07599 7.67092 4.58499 6.90507 5.08023 6.36953C5.19645 6.24395 5.35212 6.0836 5.48835 5.97788L5.92597 5.61574C7.47484 4.13357 5.46635 1.72889 3.63794 3.32771C3.47617 3.46904 3.3679 3.54936 3.2145 3.70403C2.1779 4.75014 1.38722 5.69634 0.809819 7.12005C0.652875 7.50702 0.495931 7.89995 0.385957 8.34013C0.272576 8.79422 0.16771 9.23951 0.105841 9.7041C0.0646892 10.0126 0.0588712 10.1582 0.0500733 10.4926C0.0429781 10.7672 -0.0302436 10.9409 0.0164424 11.2789C0.0702234 11.6682 0.0821432 12.1931 0.175373 12.7641C0.275273 13.3755 0.488126 14.094 0.714745 14.6686C0.95825 15.2855 1.21027 15.7906 1.568 16.348C2.87251 18.3796 4.84723 19.93 7.22083 20.6038C7.87373 20.7891 9.35476 21.0847 10.101 20.9915C10.3586 20.9592 10.6255 20.999 10.8785 20.9655C11.6228 20.867 12.2341 20.7891 12.9517 20.5504C16.1549 19.4852 18.5344 17.2359 19.5607 13.9185C19.7974 13.1535 19.9993 12.0268 19.9993 11.0245Z M8.40234 1.42693V9.2916C8.40234 9.48217 8.51062 9.7454 8.58057 9.86872C8.67607 10.0367 8.78506 10.141 8.92369 10.2811C9.89289 11.2599 11.6015 10.4353 11.6015 9.20277V1.51577C11.6015 1.10907 11.3558 0.666195 11.1474 0.459159C10.5388 -0.145913 9.51869 -0.160104 8.85629 0.459017C8.67536 0.628165 8.40234 1.09701 8.40234 1.42693Z",
        fillColor: "#008000",
        rotation: parseFloat(rotation),
        fillOpacity: 1,
        strokeWeight: 1,
        scale: scale,
        strokeColor: "#0b85ef",
        strokeOpacity: 1,
        anchor: { x: 12, y: 12 },
      };
    } else if (eventName == "Taxi Out" || eventName == "Cruise") {
      return {
        path: "M1.01094 0.0130372C1.28652 0.00558751 1.43302 -0.0375194 1.68788 0.0893847C1.75565 0.123129 2.01105 0.478454 2.06246 0.554575C2.08051 0.58133 2.08756 0.592143 2.10281 0.616809L2.34332 0.945176C2.34613 0.948845 2.34961 0.953541 2.35242 0.95721L2.54352 1.22644C2.5463 1.23019 2.54978 1.23488 2.55259 1.23855L2.67055 1.38078C2.70251 1.42521 2.69032 1.41539 2.707 1.44432C2.70855 1.44696 2.7383 1.49385 2.73857 1.49428L3.29035 2.23343C3.29304 2.23714 3.29649 2.24191 3.29918 2.24562L3.33276 2.29491C3.33625 2.3 3.34619 2.31452 3.34971 2.31953L3.41743 2.41798C3.4202 2.42173 3.42369 2.42643 3.42646 2.43018L3.59336 2.662C3.6546 2.73996 3.70656 2.81695 3.76366 2.89274C3.82214 2.97051 3.8746 3.03936 3.93684 3.12246L4.10437 3.3542C4.13383 3.3965 4.15531 3.43364 4.19062 3.47905L4.26501 3.53021C4.3553 3.54191 4.48413 3.51823 4.57918 3.51819L5.88852 3.49298C5.89733 3.49253 5.91558 3.49156 5.93324 3.49078C5.93778 3.49057 5.94362 3.49013 5.94817 3.48992L6.31106 3.48806L6.31405 3.48808C6.31805 3.48811 6.32253 3.48815 6.32623 3.48811L7.71301 3.46772C7.73035 3.46777 7.75583 3.46792 7.77345 3.46742L9.30855 3.43769C9.31322 3.43764 9.31903 3.43767 9.32369 3.43763C9.32831 3.43766 9.33415 3.43761 9.33881 3.43756L9.47523 3.43789C9.47985 3.43772 9.48574 3.43759 9.4902 3.43735C9.49474 3.43714 9.50063 3.43682 9.50513 3.4365C9.50952 3.43621 9.51544 3.43561 9.51987 3.43525C9.52417 3.43492 9.53006 3.434 9.5344 3.4336L9.57829 3.42891C9.58275 3.42866 9.58867 3.42826 9.59314 3.42801L9.77483 3.42779C9.77945 3.42782 9.78529 3.42777 9.78995 3.42773C9.80761 3.42774 9.82255 3.42767 9.83539 3.42765L10.6348 3.41756C10.641 3.41758 10.6588 3.41736 10.665 3.41731L10.8921 3.41689C10.9094 3.41682 10.9354 3.41682 10.9527 3.41687L11.0585 3.41594C11.0628 3.41566 11.0688 3.41518 11.0732 3.41477C11.0792 3.41425 11.0963 3.41197 11.1023 3.41121L11.8992 3.39377C11.9496 3.39764 11.9347 3.39715 11.975 3.3938C12.0173 3.39041 11.9841 3.39142 12.0188 3.38887C12.0224 3.38857 12.027 3.38833 12.031 3.38812L12.0337 3.38798L12.3958 3.38398C12.4521 3.38132 12.4903 3.38275 12.5468 3.38258C12.5776 3.38249 12.5908 3.38227 12.622 3.38084L12.6816 3.37773C12.6999 3.37711 12.7045 3.3773 12.7268 3.37719L13.1204 3.37626C13.1249 3.37605 13.1308 3.37573 13.1353 3.37548L13.3294 3.36714C13.3355 3.36705 13.3535 3.36722 13.3597 3.36725C13.3644 3.3672 13.3702 3.36735 13.3749 3.3673C13.3795 3.36733 13.3854 3.3674 13.39 3.36743L14.8043 3.33874C14.8089 3.33853 14.8147 3.33829 14.8192 3.33808C14.8238 3.33788 14.8297 3.33775 14.8342 3.33766C14.8389 3.33749 14.8448 3.33737 14.8493 3.33728L15.5035 3.34595C15.5098 3.3459 15.5275 3.34568 15.5338 3.3457L15.8212 3.34467C15.8274 3.34451 15.845 3.34388 15.8512 3.3438L16.864 3.42804C17.154 3.47394 17.1734 3.53735 17.3982 3.62069L18.0615 3.88238C18.1071 3.88871 18.0742 3.87351 18.1444 3.90374C18.3709 4.0013 18.2856 3.94601 18.3815 3.97817C18.4457 3.99975 18.4869 4.03777 18.559 4.0559C18.633 4.07446 18.6281 4.0544 18.7082 4.09425L19.3264 4.40208C19.3905 4.43401 19.3321 4.41981 19.3772 4.46074L19.682 4.70703C19.6961 4.72158 19.702 4.72639 19.7156 4.74122L19.7456 4.77661C19.7485 4.78024 19.7519 4.78497 19.7547 4.78864L19.9943 5.284C19.9999 5.32381 19.9985 5.31275 20 5.35779L19.9979 5.43424C19.994 5.4826 19.9929 5.51345 19.9693 5.58033C19.8812 5.83024 19.6664 6.00841 19.435 6.12715L18.6516 6.36576C18.6474 6.36664 18.6415 6.36763 18.6373 6.36843L18.4379 6.40621C18.432 6.40689 18.4148 6.4089 18.4087 6.40942C18.4056 6.40966 18.4028 6.40987 18.4003 6.41006C18.3493 6.41402 18.4278 6.40933 18.4003 6.41006C18.396 6.41018 18.3892 6.41043 18.3789 6.41086L18.1424 6.42851C17.8027 6.45021 17.4642 6.48443 17.1229 6.46019C16.9887 6.45057 16.8219 6.47728 16.8107 6.4775L16.4493 6.48386C16.4447 6.48407 16.4389 6.48451 16.4344 6.48476C16.4299 6.48496 16.424 6.48541 16.4196 6.48565L14.9277 6.50898C14.9233 6.50927 14.9174 6.50987 14.913 6.51015L14.9103 6.51035C14.9063 6.51064 14.9018 6.51097 14.8982 6.51117C14.8925 6.51155 14.8767 6.51208 14.8696 6.51232L14.8683 6.51236L14.1915 6.52707C14.1869 6.52704 14.1811 6.52701 14.1764 6.52706L14.1309 6.5269C14.1084 6.52702 14.1043 6.52686 14.0857 6.52745L6.57978 6.41388C6.57444 6.4129 6.56899 6.41196 6.56369 6.4111C6.55848 6.41028 6.55298 6.40961 6.54777 6.40879L5.2896 6.2254C5.27285 6.22338 5.24685 6.2201 5.22658 6.218L4.71802 6.14694C4.71289 6.14616 4.70731 6.14566 4.70214 6.14496L3.70139 6.00625C3.68953 6.00509 3.66598 6.00343 3.65445 6.00183L2.80925 5.87535C2.7917 5.87293 2.78135 5.87093 2.76132 5.86796C2.7561 5.86714 2.75057 5.86616 2.74531 5.86542L2.53909 5.83744C2.51886 5.83511 2.49816 5.8329 2.48326 5.83131L2.4761 5.83055L1.82327 5.73551C1.81671 5.73462 1.79822 5.73271 1.79166 5.73181L1.12481 5.64036C0.71393 5.58044 0.101375 5.59279 0.0110919 5.18054C-0.0147824 5.06266 0.00959321 4.8726 0.0334541 4.82468L0.178817 4.67088C0.459828 4.46048 0.852459 4.61769 1.08667 4.53221L0.922004 3.76951C0.92101 3.76536 0.919539 3.75959 0.918544 3.75545L0.461424 1.63649C0.460509 1.63238 0.459156 1.62658 0.458241 1.62247L0.448689 1.58021L0.448595 1.57979C0.447686 1.57571 0.446431 1.57008 0.445584 1.56604L0.304168 0.931848C0.262522 0.784403 0.225352 0.620832 0.232728 0.471054C0.232918 0.466313 0.232711 0.460584 0.233098 0.455843L0.345139 0.195947L0.488354 0.0809452C0.492143 0.078292 0.496838 0.0746103 0.500547 0.0721151C0.563015 0.0300961 0.626303 0.0300304 0.697288 0.026199L0.920396 0.0141353C0.961598 0.0126447 0.969541 0.0141331 1.01094 0.0130372Z",
        fillColor: "#0000FF",
        rotation: parseFloat(rotation) - 80,
        fillOpacity: 1,
        strokeWeight: 1,
        scale: scale,
        strokeColor: "#0b85ef",
        strokeOpacity: 1,
        anchor: { x: 12, y: 12 },
      };
    } else if (eventName == "Takeoff" || eventName == "Climb") {
      return {
        path: "M1.17537 4.64338C0.892517 4.65504 0.777068 4.76133 0.529983 4.89809C0.492854 4.91861 0.48504 4.92109 0.448251 4.94186L0.250661 5.05776C0.187792 5.09462 0.13038 5.12462 0.090751 5.19023C0.0883977 5.19412 0.085632 5.1995 0.0832715 5.20357L0 5.37001L0.00387019 5.64604C0.00544448 5.65029 0.00795883 5.65511 0.00971226 5.65926C0.0638506 5.79128 0.16402 5.91407 0.261703 6.02089L0.647626 6.49822C0.650121 6.50139 0.653703 6.50582 0.656202 6.50891L0.682033 6.54066C0.684532 6.54375 0.688118 6.54809 0.690617 6.55118L1.96611 8.1533C1.9687 8.15638 1.97237 8.16064 1.97496 8.16372L2.43418 8.74033C2.25634 8.92448 1.83614 8.9753 1.66655 9.28879L1.59709 9.48953C1.59489 9.54194 1.64996 9.71657 1.72133 9.80549C1.9707 10.1165 2.52163 9.81618 2.91887 9.67323L3.56124 9.43626C3.56756 9.43393 3.58512 9.42682 3.59143 9.42448L4.22253 9.19721C4.2367 9.19154 4.25987 9.18221 4.28249 9.17333L4.48103 9.09979C4.4861 9.09794 4.49152 9.09616 4.49658 9.0944C4.51597 9.08747 4.52618 9.08429 4.54309 9.07806L5.36154 8.78678C5.37266 8.78269 5.39471 8.77298 5.40594 8.76837L6.37054 8.41399C6.37553 8.41215 6.38079 8.40994 6.38577 8.40818L6.87619 8.22859C6.89543 8.2208 6.92036 8.21131 6.93639 8.20513L8.15277 7.76733C8.15784 7.76556 8.16309 7.76353 8.16816 7.76177C8.17331 7.76 8.17864 7.75823 8.18388 7.75655L9.34554 7.17738C9.37456 7.17075 9.39345 7.17161 9.42258 7.17041L8.48214 8.70916C8.47053 8.72716 8.46817 8.73115 8.45744 8.74687L8.30523 8.99039C8.3028 8.99421 8.2996 8.99943 8.29725 9.00324L8.05266 9.43032C8.04596 9.43984 8.04189 9.44501 8.03518 9.45453L7.65088 10.1793C7.47162 10.4455 7.2727 10.7061 7.51365 10.9569L7.64696 11.0352C7.68419 11.0499 7.64412 11.0401 7.68941 11.0509C7.75239 11.0658 7.82381 11.0547 7.88515 11.0313L9.08302 10.0911C9.08849 10.0882 9.1047 10.0797 9.11018 10.0766L9.47386 9.73072C9.47705 9.72783 9.48185 9.72392 9.48504 9.72111C9.48831 9.71821 9.49321 9.71438 9.49648 9.71157L9.98659 9.22109C9.99727 9.21072 10.0074 9.19934 10.017 9.18902L10.1466 9.04752C10.1655 9.02827 10.1743 9.02039 10.1994 8.99596L10.3818 8.80282C10.4013 8.78432 10.4047 8.78228 10.4241 8.76171L10.8506 8.33282C10.8535 8.32959 10.8575 8.32502 10.8604 8.32179L11.6937 7.46535C11.7314 7.42822 11.7567 7.40525 11.788 7.37184L12.2023 6.93094C12.3476 6.7534 12.5412 6.61341 12.693 6.44113L12.7208 6.4064C12.8209 6.27907 12.958 6.18234 13.0593 6.05643C13.062 6.05303 13.0656 6.04796 13.0682 6.04457L13.188 5.9141C13.3005 5.81199 13.705 5.2332 13.8444 5.15442C13.8484 5.15218 13.8537 5.1492 13.8579 5.14695C13.862 5.14471 13.8673 5.1419 13.8714 5.13966L15.0422 4.30335C15.0589 4.29403 15.0627 4.29223 15.0831 4.28146L15.1245 4.26007C15.1287 4.25783 15.134 4.2551 15.1382 4.25294L15.7464 3.92017C15.7519 3.91709 15.7677 3.90824 15.7731 3.90499C15.777 3.90267 15.7822 3.89953 15.7861 3.89712C15.79 3.8948 15.7951 3.89148 15.799 3.88916L17.0839 3.09242C17.0879 3.0901 17.093 3.08695 17.097 3.08463C17.101 3.08231 17.1061 3.07916 17.1101 3.07683L17.4355 2.90041C17.4457 2.8949 17.5862 2.7931 17.7119 2.73785C18.0315 2.59724 18.3899 2.34105 18.6894 2.16173L18.8968 2.03473C18.9678 1.99416 18.8555 2.06095 18.9233 2.01939C18.9286 2.01606 18.9434 2.00621 18.9485 2.00281L19.1141 1.87606C19.1176 1.87341 19.1225 1.86975 19.126 1.86702L19.7401 1.29166C19.9019 1.08028 20.019 0.963478 19.9974 0.707344C19.9917 0.63877 19.9802 0.611793 19.9641 0.568424L19.9349 0.501855C19.9153 0.463899 19.9211 0.472727 19.8998 0.441229L19.4812 0.129463C19.4771 0.127644 19.4721 0.125173 19.468 0.123444L19.4264 0.10729C19.4081 0.100965 19.4008 0.0996255 19.382 0.0938379L19.0054 0.0266579C18.9478 0.0128879 19.0066 -0.00257258 18.9354 0.000362051L18.2493 0.0286502C18.1605 0.0323121 18.173 0.04725 18.0983 0.0663001C18.0256 0.0848418 17.9727 0.0717405 17.9057 0.0835678C17.8056 0.101336 17.9054 0.108443 17.6603 0.131846C17.5843 0.139124 17.6203 0.136603 17.5763 0.152747L16.8681 0.241954C16.6301 0.276801 16.5868 0.231535 16.305 0.329317L15.3515 0.736162C15.346 0.739154 15.3303 0.748003 15.3247 0.751082L15.0642 0.887958C15.0586 0.890867 15.0425 0.899471 15.0369 0.902466L14.4396 1.20449C14.4355 1.20673 14.4302 1.20963 14.4261 1.21195C14.422 1.2142 14.4167 1.21709 14.4126 1.21941C14.4086 1.22174 14.4034 1.22472 14.3994 1.22704L13.1274 1.9207C13.1232 1.92286 13.1178 1.92559 13.1136 1.92774C13.1094 1.92999 13.1041 1.93263 13.0998 1.93488C13.0942 1.93778 13.0778 1.94614 13.0723 1.94913L12.8995 2.04812C12.8955 2.05044 12.8903 2.05351 12.8863 2.05583L12.5295 2.24278C12.5093 2.25346 12.5051 2.25544 12.4886 2.26467L12.4358 2.29551C12.4081 2.3115 12.3962 2.31795 12.3683 2.33257C12.3171 2.35946 12.2819 2.37628 12.2318 2.40519L11.9048 2.57995C11.9008 2.58227 11.8955 2.58534 11.8916 2.58775C11.8612 2.60636 11.8909 2.58976 11.8539 2.6127C11.8187 2.63461 11.8324 2.628 11.7851 2.64851L11.0689 3.04048C11.0637 3.04397 11.0492 3.05398 11.0439 3.05731C11.0401 3.05971 11.0349 3.06295 11.0311 3.06527L10.9354 3.11609C10.9197 3.12425 10.8961 3.13653 10.8805 3.14477L10.6745 3.25255C10.6689 3.25555 10.6528 3.26415 10.6472 3.26706L9.92576 3.65389C9.91412 3.65998 9.90059 3.6671 9.88456 3.67545C9.88035 3.67769 9.87506 3.6805 9.87085 3.68266L9.70605 3.7688C9.7021 3.77112 9.69688 3.77427 9.69293 3.77659L9.65501 3.80138C9.65123 3.80378 9.64626 3.80735 9.64249 3.80966C9.63862 3.81207 9.63348 3.81539 9.62962 3.81771C9.62566 3.82011 9.62046 3.82318 9.61642 3.8255C9.61246 3.82782 9.60717 3.83072 9.60305 3.83305L9.47911 3.8973C9.47489 3.89954 9.46961 3.90235 9.4654 3.90451C9.46119 3.90676 9.45591 3.90948 9.45169 3.91172L8.07053 4.66341C8.05475 4.67218 8.03156 4.6841 8.0158 4.69226L6.76547 5.36578C6.76125 5.36802 6.75588 5.37075 6.75168 5.37291L6.42307 5.54618C6.41903 5.5485 6.41391 5.55165 6.40987 5.55397C6.39416 5.56299 6.37799 5.57247 6.37018 5.57702L5.19209 6.21803C5.10584 6.26303 4.99853 6.34429 4.91183 6.37696L4.82354 6.36825C4.77304 6.34599 4.73847 6.32428 4.69455 6.30191L4.44838 6.1823C4.35814 6.14044 4.28256 6.10617 4.1979 6.0671C4.1153 6.02906 4.03687 5.98757 3.94962 5.94964L3.70399 5.82966C3.69996 5.82776 3.69489 5.82538 3.69085 5.82347L3.5894 5.77102C3.58417 5.76839 3.56925 5.76063 3.56402 5.75791L3.51352 5.7315C3.50957 5.72959 3.5045 5.72712 3.50055 5.72521L2.69956 5.35194C2.69914 5.3517 2.6531 5.32554 2.65062 5.324C2.62373 5.30707 2.63878 5.30973 2.59173 5.28672L2.42691 5.22047C2.42286 5.21865 2.41779 5.21627 2.41376 5.21437L2.13097 5.07373C2.12693 5.07191 2.12186 5.06953 2.11782 5.06771L1.76617 4.8997C1.74231 4.88574 1.73152 4.8798 1.70427 4.86538C1.6267 4.82438 1.25058 4.64028 1.17537 4.64338Z M8.86817 3.5602L9.38957 3.67212L11.6946 2.46161C11.6946 2.46161 11.2241 2.3982 11.1772 2.39712L10.1077 2.35122C10.1037 2.35094 10.0981 2.35047 10.0942 2.35013L9.55556 2.33239C9.5301 2.33091 9.52707 2.33161 9.50347 2.33148L9.26412 2.31798C9.23317 2.31743 9.22295 2.31767 9.19887 2.3167L9.02483 2.30458C9.01207 2.30379 8.99818 2.30264 8.98503 2.30242L8.36827 2.28343C8.36459 2.28358 8.35942 2.28404 8.35565 2.28414C8.352 2.28424 8.34678 2.2846 8.34305 2.28465L7.90219 2.28149C7.89745 2.28268 7.88427 2.28674 7.87969 2.28803L6.75565 2.62204C6.71366 2.64256 6.6798 2.67623 6.67283 2.72081C6.66783 2.75286 6.67203 2.72435 6.67336 2.75425L6.70186 2.87674C6.85479 3.16409 7.16221 3.20894 7.46822 3.2682L8.14558 3.40771C8.15661 3.40966 8.16276 3.41048 8.1738 3.41244L8.53439 3.48727C8.53869 3.48824 8.5446 3.48958 8.54894 3.49051L8.82504 3.55141C8.84317 3.55483 8.84764 3.5559 8.86817 3.5602Z",
        fillColor: "#0000FF",
        rotation: parseFloat(rotation) - 80,
        fillOpacity: 1,
        strokeWeight: 1,
        scale: scale,
        strokeColor: "#0b85ef",
        strokeOpacity: 1,
        anchor: { x: 12, y: 12 },
      };
    } else if (eventName == "Landing") {
      return {
        path: "M2.90803 0.318619C2.68324 0.129994 2.52604 0.137866 2.24809 0.0788794C2.20634 0.0699945 2.19874 0.0665878 2.15709 0.0581463L1.93061 0.0164361C1.85855 0.00315837 1.79512 -0.0120368 1.72239 0.0150068C1.71807 0.0166126 1.71248 0.01917 1.70804 0.0209153L1.5368 0.101623L1.36185 0.335044C1.36032 0.339702 1.35915 0.345492 1.35781 0.350197C1.3143 0.498509 1.31211 0.671383 1.31829 0.829178L1.30708 1.49879C1.30694 1.50319 1.30684 1.50941 1.30677 1.51374L1.30615 1.55839C1.30608 1.56273 1.30603 1.56887 1.30596 1.57321L1.25308 3.80681C1.25308 3.81121 1.25316 3.81734 1.25316 3.82173L1.23425 4.62573C0.97894 4.65492 0.623399 4.4027 0.291068 4.54578L0.108316 4.66484C0.07285 4.70711 0.00259312 4.89169 9.60315e-05 5.01606C-0.00884059 5.45094 0.60797 5.58627 1.00526 5.74539L1.65144 5.99784C1.6578 6.00032 1.67587 6.00668 1.68223 6.00917L2.31351 6.26182C2.32805 6.26701 2.35186 6.27546 2.37496 6.28391L2.57487 6.36168C2.57996 6.36369 2.58526 6.366 2.59029 6.36808C2.60965 6.37589 2.61955 6.38039 2.63654 6.38705L3.45301 6.71759C3.46418 6.72198 3.48738 6.72932 3.49898 6.73335L4.46837 7.11365C4.47339 7.11561 4.47885 7.11746 4.48381 7.11948L4.97629 7.31331C4.9961 7.3203 5.02136 7.32986 5.03766 7.33593L6.25423 7.82309C6.25926 7.82517 6.2646 7.82716 6.26963 7.82924C6.27473 7.83138 6.27997 7.83363 6.28508 7.8359L7.55073 8.16654C7.5773 8.18134 7.59125 8.19531 7.6144 8.21474L5.90017 8.84128C5.87964 8.84818 5.87526 8.84986 5.85688 8.85547L5.583 8.95227C5.57867 8.95375 5.57284 8.95587 5.56858 8.95741L5.10542 9.14283C5.09413 9.14608 5.08767 9.14755 5.07639 9.1508L4.314 9.48708C4.00475 9.5838 3.68395 9.66215 3.70738 10.0407L3.75935 10.1996C3.77847 10.238 3.75398 10.2018 3.78184 10.2425C3.8206 10.2992 3.88259 10.34 3.94481 10.3635L5.47096 10.4178C5.47709 10.4191 5.49498 10.4234 5.50123 10.4246L6.0035 10.3906C6.00782 10.3904 6.01403 10.3906 6.01829 10.3904C6.02267 10.3903 6.0289 10.3905 6.03322 10.3905L6.72585 10.3243C6.74074 10.3231 6.75585 10.3207 6.7699 10.3188L6.96068 10.2914C6.98757 10.2886 6.99943 10.2882 7.03447 10.2854L7.29902 10.2518C7.32594 10.2501 7.32988 10.2507 7.358 10.2471L7.96211 10.1878C7.96638 10.1871 7.97244 10.1861 7.97677 10.1855L9.16888 10.054C9.2218 10.0495 9.25599 10.048 9.30161 10.042L9.90403 9.96407C10.1301 9.9176 10.369 9.93638 10.5967 9.89882L10.6404 9.88931C10.7994 9.8531 10.967 9.86836 11.126 9.83416C11.1303 9.83326 11.1363 9.83151 11.1405 9.83056L11.3167 9.80552C11.4689 9.79906 12.1526 9.59895 12.3105 9.63089C12.3151 9.63185 12.3211 9.63307 12.3257 9.63409C12.3303 9.63511 12.3362 9.63647 12.3408 9.63749L13.7792 9.75963C13.798 9.76354 13.8021 9.76468 13.8247 9.77L13.8703 9.78113C13.875 9.78221 13.8808 9.78364 13.8854 9.78479L14.5671 9.93324C14.5733 9.93451 14.5912 9.93818 14.5974 9.93925C14.6019 9.94009 14.6079 9.94105 14.6125 9.94181C14.617 9.94258 14.623 9.94341 14.6275 9.94418L16.1281 10.2805C16.1326 10.2814 16.1386 10.2823 16.1432 10.2832C16.1477 10.2841 16.1537 10.285 16.1583 10.2859L16.522 10.3667C16.5333 10.3692 16.7068 10.3826 16.8391 10.4246C17.1751 10.5312 17.5226 10.5785 17.8683 10.6387L18.1095 10.678C18.1902 10.6939 18.0609 10.671 18.1397 10.6838C18.1459 10.6847 18.1636 10.6869 18.1698 10.6876L18.3787 10.6978C18.3831 10.698 18.3892 10.6985 18.3936 10.6986L19.2363 10.6484C19.4968 10.5852 19.7549 10.4585 19.9035 10.2293C19.9433 10.168 19.9518 10.1373 19.9674 10.0898L19.9879 10.0137C19.9973 9.9682 19.996 9.97962 20 9.93836L19.8794 9.38421C19.8775 9.37985 19.8752 9.3743 19.8732 9.36995L19.8516 9.32725C19.8416 9.30912 19.8369 9.30288 19.8262 9.28488L19.5802 8.96459C19.5448 8.91269 19.5999 8.94101 19.5434 8.89355L18.9981 8.43601C18.9275 8.37678 18.9275 8.39804 18.8579 8.36161C18.79 8.32606 18.7578 8.27801 18.6987 8.24091C18.6104 8.18557 18.6825 8.26153 18.4791 8.10916C18.416 8.06194 18.4453 8.0851 18.4012 8.06777L17.7996 7.64559C17.5944 7.50785 17.5903 7.43964 17.3108 7.32373L16.3161 6.99507C16.3099 6.99367 16.2921 6.99006 16.2859 6.98873L15.9976 6.92044C15.9914 6.91892 15.9735 6.91486 15.9672 6.9134L15.3138 6.74696C15.3091 6.74595 15.3032 6.74466 15.2985 6.74371C15.2939 6.74269 15.288 6.7414 15.2834 6.74051C15.2788 6.73962 15.2729 6.73846 15.2683 6.73757L13.8441 6.42529C13.8395 6.42414 13.8336 6.42265 13.829 6.4215C13.8243 6.42043 13.8185 6.41887 13.8138 6.41779C13.8076 6.41627 13.7896 6.41177 13.7834 6.41037L13.5869 6.37192C13.5823 6.37109 13.5764 6.37 13.5718 6.36911L13.1772 6.27515C13.1548 6.26987 13.1503 6.26859 13.1317 6.26478L13.0713 6.25352C13.0397 6.24744 13.0263 6.24446 12.9955 6.23714C12.9388 6.22369 12.9009 6.21304 12.8439 6.20214L12.48 6.11881C12.4754 6.11798 12.4694 6.11682 12.4649 6.11612C12.4295 6.1103 12.463 6.11732 12.4198 6.1105C12.3787 6.10415 12.3934 6.10822 12.3439 6.0922L11.541 5.9175C11.5348 5.91681 11.5172 5.91499 11.511 5.91405C11.5066 5.91341 11.5005 5.91245 11.496 5.91168L11.3898 5.88711C11.3724 5.88288 11.3464 5.87662 11.3291 5.87252L11.1014 5.81818C11.0952 5.81672 11.0773 5.81266 11.0711 5.81114L10.2676 5.62849C10.2547 5.62541 10.2397 5.62188 10.222 5.61761C10.2173 5.61653 10.2115 5.61517 10.2068 5.61402L10.0247 5.57044C10.0202 5.5696 10.0141 5.56858 10.0096 5.56775L9.96451 5.56187C9.96006 5.56123 9.95394 5.56073 9.94955 5.56002C9.94503 5.55931 9.93894 5.55849 9.93448 5.55771C9.92989 5.55695 9.92391 5.55586 9.91931 5.55497C9.91478 5.55414 9.90885 5.55285 9.90418 5.5519L9.76756 5.51868C9.76288 5.5176 9.75701 5.51624 9.75238 5.5151C9.7477 5.51402 9.74189 5.51259 9.7372 5.51151L8.19173 5.17113C8.17396 5.16739 8.14846 5.16109 8.13109 5.15686L6.73651 4.8429C6.73183 4.84182 6.72594 4.84033 6.72132 4.83918L6.35722 4.75355C6.35261 4.75266 6.34665 4.75169 6.34205 4.7508C6.32416 4.74733 6.30564 4.74391 6.2967 4.74223L4.97856 4.45176C4.8833 4.42888 4.7485 4.42155 4.66084 4.38805L4.59863 4.31885C4.57419 4.26482 4.56162 4.22243 4.5423 4.17294L4.4303 3.90032C4.38797 3.80204 4.352 3.72039 4.31215 3.62836C4.27322 3.53864 4.23971 3.44896 4.19714 3.35607L4.08579 3.08352C4.08392 3.0791 4.08156 3.07355 4.07968 3.06913L4.03557 2.95414C4.03324 2.94827 4.02678 2.93132 4.02452 2.92538L4.00275 2.86789C4.00095 2.86352 3.99865 2.85791 3.99684 2.85354L3.62215 1.9798C3.62197 1.9793 3.60347 1.92515 3.60256 1.92212C3.59282 1.88911 3.60266 1.90189 3.58136 1.84966L3.49744 1.6787C3.49551 1.67434 3.49315 1.6688 3.49128 1.66437L3.3647 1.3485C3.36277 1.34414 3.36041 1.3386 3.35848 1.33424L3.19665 0.947197C3.18732 0.918803 3.18286 0.906267 3.17122 0.875102C3.13806 0.786427 2.96781 0.368775 2.90803 0.318619Z M9.51554 4.80847L9.84392 5.26768L12.3948 5.87252C12.3948 5.87252 12.0742 5.4895 12.0389 5.45572L11.247 4.66729C11.2441 4.66427 11.2401 4.65997 11.2373 4.65693L10.835 4.26433C10.8164 4.24524 10.8136 4.2437 10.7955 4.22703L10.6204 4.04789C10.597 4.02573 10.589 4.01876 10.5711 4.00106L10.4452 3.86887C10.4359 3.85927 10.426 3.84856 10.416 3.83915L9.9545 3.39073C9.95157 3.38827 9.94731 3.38503 9.94435 3.38247C9.94147 3.38 9.93724 3.37664 9.93433 3.37406L9.59772 3.06224C9.59332 3.0599 9.58057 3.05406 9.57623 3.05192L8.49749 2.54277C8.45201 2.53047 8.40429 2.53487 8.37021 2.56724C8.3457 2.59052 8.36731 2.56964 8.34906 2.59555L8.292 2.71792C8.22425 3.06535 8.43149 3.31843 8.62836 3.58258L9.05876 4.17424C9.06598 4.18361 9.07017 4.1886 9.07739 4.19798L9.30615 4.51341C9.30884 4.51724 9.3125 4.52251 9.31524 4.52632L9.48808 4.77087C9.4998 4.78644 9.50254 4.79047 9.51554 4.80847Z",
        fillColor: "#017F01",
        rotation: parseFloat(rotation) - 80,
        fillOpacity: 1,
        strokeWeight: 1,
        scale: scale,
        strokeColor: "#0b85ef",
        strokeOpacity: 1,
        anchor: { x: 12, y: 12 },
      };
    } else if (eventName == "Taxi In") {
      return {
        path: "M1.01094 0.0130372C1.28652 0.00558751 1.43302 -0.0375194 1.68788 0.0893847C1.75565 0.123129 2.01105 0.478454 2.06246 0.554575C2.08051 0.58133 2.08756 0.592143 2.10281 0.616809L2.34332 0.945176C2.34613 0.948845 2.34961 0.953541 2.35242 0.95721L2.54352 1.22644C2.5463 1.23019 2.54978 1.23488 2.55259 1.23855L2.67055 1.38078C2.70251 1.42521 2.69032 1.41539 2.707 1.44432C2.70855 1.44696 2.7383 1.49385 2.73857 1.49428L3.29035 2.23343C3.29304 2.23714 3.29649 2.24191 3.29918 2.24562L3.33276 2.29491C3.33625 2.3 3.34619 2.31452 3.34971 2.31953L3.41743 2.41798C3.4202 2.42173 3.42369 2.42643 3.42646 2.43018L3.59336 2.662C3.6546 2.73996 3.70656 2.81695 3.76366 2.89274C3.82214 2.97051 3.8746 3.03936 3.93684 3.12246L4.10437 3.3542C4.13383 3.3965 4.15531 3.43364 4.19062 3.47905L4.26501 3.53021C4.3553 3.54191 4.48413 3.51823 4.57918 3.51819L5.88852 3.49298C5.89733 3.49253 5.91558 3.49156 5.93324 3.49078C5.93778 3.49057 5.94362 3.49013 5.94817 3.48992L6.31106 3.48806L6.31405 3.48808C6.31805 3.48811 6.32253 3.48815 6.32623 3.48811L7.71301 3.46772C7.73035 3.46777 7.75583 3.46792 7.77345 3.46742L9.30855 3.43769C9.31322 3.43764 9.31903 3.43767 9.32369 3.43763C9.32831 3.43766 9.33415 3.43761 9.33881 3.43756L9.47523 3.43789C9.47985 3.43772 9.48574 3.43759 9.4902 3.43735C9.49474 3.43714 9.50063 3.43682 9.50513 3.4365C9.50952 3.43621 9.51544 3.43561 9.51987 3.43525C9.52417 3.43492 9.53006 3.434 9.5344 3.4336L9.57829 3.42891C9.58275 3.42866 9.58867 3.42826 9.59314 3.42801L9.77483 3.42779C9.77945 3.42782 9.78529 3.42777 9.78995 3.42773C9.80761 3.42774 9.82255 3.42767 9.83539 3.42765L10.6348 3.41756C10.641 3.41758 10.6588 3.41736 10.665 3.41731L10.8921 3.41689C10.9094 3.41682 10.9354 3.41682 10.9527 3.41687L11.0585 3.41594C11.0628 3.41566 11.0688 3.41518 11.0732 3.41477C11.0792 3.41425 11.0963 3.41197 11.1023 3.41121L11.8992 3.39377C11.9496 3.39764 11.9347 3.39715 11.975 3.3938C12.0173 3.39041 11.9841 3.39142 12.0188 3.38887C12.0224 3.38857 12.027 3.38833 12.031 3.38812L12.0337 3.38798L12.3958 3.38398C12.4521 3.38132 12.4903 3.38275 12.5468 3.38258C12.5776 3.38249 12.5908 3.38227 12.622 3.38084L12.6816 3.37773C12.6999 3.37711 12.7045 3.3773 12.7268 3.37719L13.1204 3.37626C13.1249 3.37605 13.1308 3.37573 13.1353 3.37548L13.3294 3.36714C13.3355 3.36705 13.3535 3.36722 13.3597 3.36725C13.3644 3.3672 13.3702 3.36735 13.3749 3.3673C13.3795 3.36733 13.3854 3.3674 13.39 3.36743L14.8043 3.33874C14.8089 3.33853 14.8147 3.33829 14.8192 3.33808C14.8238 3.33788 14.8297 3.33775 14.8342 3.33766C14.8389 3.33749 14.8448 3.33737 14.8493 3.33728L15.5035 3.34595C15.5098 3.3459 15.5275 3.34568 15.5338 3.3457L15.8212 3.34467C15.8274 3.34451 15.845 3.34388 15.8512 3.3438L16.864 3.42804C17.154 3.47394 17.1734 3.53735 17.3982 3.62069L18.0615 3.88238C18.1071 3.88871 18.0742 3.87351 18.1444 3.90374C18.3709 4.0013 18.2856 3.94601 18.3815 3.97817C18.4457 3.99975 18.4869 4.03777 18.559 4.0559C18.633 4.07446 18.6281 4.0544 18.7082 4.09425L19.3264 4.40208C19.3905 4.43401 19.3321 4.41981 19.3772 4.46074L19.682 4.70703C19.6961 4.72158 19.702 4.72639 19.7156 4.74122L19.7456 4.77661C19.7485 4.78024 19.7519 4.78497 19.7547 4.78864L19.9943 5.284C19.9999 5.32381 19.9985 5.31275 20 5.35779L19.9979 5.43424C19.994 5.4826 19.9929 5.51345 19.9693 5.58033C19.8812 5.83024 19.6664 6.00841 19.435 6.12715L18.6516 6.36576C18.6474 6.36664 18.6415 6.36763 18.6373 6.36843L18.4379 6.40621C18.432 6.40689 18.4148 6.4089 18.4087 6.40942C18.4056 6.40966 18.4028 6.40987 18.4003 6.41006C18.3493 6.41402 18.4278 6.40933 18.4003 6.41006C18.396 6.41018 18.3892 6.41043 18.3789 6.41086L18.1424 6.42851C17.8027 6.45021 17.4642 6.48443 17.1229 6.46019C16.9887 6.45057 16.8219 6.47728 16.8107 6.4775L16.4493 6.48386C16.4447 6.48407 16.4389 6.48451 16.4344 6.48476C16.4299 6.48496 16.424 6.48541 16.4196 6.48565L14.9277 6.50898C14.9233 6.50927 14.9174 6.50987 14.913 6.51015L14.9103 6.51035C14.9063 6.51064 14.9018 6.51097 14.8982 6.51117C14.8925 6.51155 14.8767 6.51208 14.8696 6.51232L14.8683 6.51236L14.1915 6.52707C14.1869 6.52704 14.1811 6.52701 14.1764 6.52706L14.1309 6.5269C14.1084 6.52702 14.1043 6.52686 14.0857 6.52745L6.57978 6.41388C6.57444 6.4129 6.56899 6.41196 6.56369 6.4111C6.55848 6.41028 6.55298 6.40961 6.54777 6.40879L5.2896 6.2254C5.27285 6.22338 5.24685 6.2201 5.22658 6.218L4.71802 6.14694C4.71289 6.14616 4.70731 6.14566 4.70214 6.14496L3.70139 6.00625C3.68953 6.00509 3.66598 6.00343 3.65445 6.00183L2.80925 5.87535C2.7917 5.87293 2.78135 5.87093 2.76132 5.86796C2.7561 5.86714 2.75057 5.86616 2.74531 5.86542L2.53909 5.83744C2.51886 5.83511 2.49816 5.8329 2.48326 5.83131L2.4761 5.83055L1.82327 5.73551C1.81671 5.73462 1.79822 5.73271 1.79166 5.73181L1.12481 5.64036C0.71393 5.58044 0.101375 5.59279 0.0110919 5.18054C-0.0147824 5.06266 0.00959321 4.8726 0.0334541 4.82468L0.178817 4.67088C0.459828 4.46048 0.852459 4.61769 1.08667 4.53221L0.922004 3.76951C0.92101 3.76536 0.919539 3.75959 0.918544 3.75545L0.461424 1.63649C0.460509 1.63238 0.459156 1.62658 0.458241 1.62247L0.448689 1.58021L0.448595 1.57979C0.447686 1.57571 0.446431 1.57008 0.445584 1.56604L0.304168 0.931848C0.262522 0.784403 0.225352 0.620832 0.232728 0.471054C0.232918 0.466313 0.232711 0.460584 0.233098 0.455843L0.345139 0.195947L0.488354 0.0809452C0.492143 0.078292 0.496838 0.0746103 0.500547 0.0721151C0.563015 0.0300961 0.626303 0.0300304 0.697288 0.026199L0.920396 0.0141353C0.961598 0.0126447 0.969541 0.0141331 1.01094 0.0130372Z",
        fillColor: "#017F01",
        rotation: parseFloat(rotation) - 80,
        fillOpacity: 1,
        strokeWeight: 1,
        scale: scale,
        strokeColor: "#0b85ef",
        strokeOpacity: 1,
        anchor: { x: 12, y: 12 },
      };
    } else {
      return {
        path: "M4.692,10.001c0,3.174,2.583,5.756,5.759,5.756s5.758-2.582,5.758-5.756c0-3.175-2.582-5.759-5.758-5.759   S4.692,6.826,4.692,10.001z M5.698,10.001c0-2.545,2.012-4.624,4.529-4.741l-2.56,3.208v2.956l1.948-2.44v5.69   C7.393,14.277,5.698,12.336,5.698,10.001z M15.203,10.001c0,2.334-1.695,4.278-3.916,4.672v-5.69l1.947,2.44V8.468l-2.56-3.208   C13.191,5.378,15.203,7.456,15.203,10.001z",
        fillColor: "#ffffff",
        rotation: parseFloat(rotation),
        fillOpacity: 1,
        strokeWeight: 1,
        scale: scale,
        strokeColor: "#0b85ef",
        strokeOpacity: 1,
        anchor: { x: 12, y: 12 },
      };
    }
  }

  render() {
    const zoomControlOptions = {
      position: this.props.google.maps.ControlPosition.TOP_LEFT,
    };

    const convertTime = (dateTimeString) => {
      const date = new Date(dateTimeString);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12;
      const dateString = date.toISOString().slice(0, 10);
      return `${dateString} ${formattedHours}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
    };

    return (
      <React.Fragment>
        <div
          className="loading"
          style={{ display: this.state.loader ? "block" : "none" }}
        >
          <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
        </div>
        <Map
          containerStyle={{
            width: "100%",
            height:
              this.props.mapHeight && this.props.mapHeight > 0
                ? this.props.mapHeight
                : "100%",
          }}
          onClick={(t, map, c) => this.addMarker(c.latLng, map)}
          google={this.props.google}
          zoom={this.state.zoom}
          maxZoom={12}
          minZoom={3}
          initialCenter={this.state.initialCenter}
          center={this.state.initialCenter}
          // mapTypeControlOptions={{ mapTypeIds: ["satellite", "terrain"] } }
          onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
          onZoomChanged={this._handleZoomChanged.bind(this)}
          ref={this.googleMap}
          gestureHandling="greedy"
          streetViewControl={false}
          zoomControlOptions={zoomControlOptions}
          zoomControl={true}
          disableDefaultUI={true}
          // onCenterChanged={this._handleCenterChanged.bind(this)}
        >
          {/* {this.state.displayMarkers}
          {this.state.polyLine} */}
          {this.state.mapDrawArray.map((item) => {
            return item.markers;
          })}
          {this.state.polyLineArray.map((item) => {
            return item;
          })}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            style={{
              background: "#000000",
            }}
          >
            <div>
              <ul
                //   style={{
                //     listStyle: 'none',
                //     textAlign: 'left',
                //     width: '170px',
                //     height: '58px',
                //     fontSize: '17px',
                //     padding: '0px',
                //     fontWeight: '600'
                //   }}
                // >
                //   <li>
                //     Longitude :{' '}
                //     {this.state.selectedPlace.data
                //       ? this.state.selectedPlace.data['gps_long']
                //       : ''}
                //   </li>
                //   <li>
                //     Latitude:{' '}
                //     {this.state.selectedPlace.data
                //       ? this.state.selectedPlace.data['gps_lat']
                //       : ''}
                //   </li>
                //   <li>
                //     Heading:{' '}
                //     {this.state.selectedPlace.data
                //       ? this.state.selectedPlace.data['heading']
                //       : ''}
                //   </li>

                style={{
                  listStyle: "none",
                  textAlign: "left",
                  width: "220px",
                  // height: "100px",
                  fontSize: "14px",
                  padding: "0px",
                  fontWeight: "600",
                }}
              >
                {/* <li>
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
              </li> */}

                <li>
                  Timestamp:{" "}
                  {this.state.selectedPlace.data
                    ? convertTime(this.state.selectedPlace.data["date_time"])
                    : ""}
                </li>
                <li>
                  Location:
                  {this.state.selectedPlace.data
                    ? `${this.state.selectedPlace.data["gps_lat"]}${
                        this.state.selectedPlace.data["gps_lat"] > 0
                          ? "°N"
                          : "°S"
                      }, ${this.state.selectedPlace.data["gps_long"]}${
                        this.state.selectedPlace.data["gps_long"] > 0
                          ? "°E"
                          : "°W"
                      }`
                    : ""}
                </li>
                <li>
                  Altitude:{" "}
                  {this.state.selectedPlace.data
                    ? `${this.state.selectedPlace.data["altitude"]}ft`
                    : ""}
                </li>
                <li>
                  Speed:{" "}
                  {this.state.selectedPlace.data
                    ? `${this.state.selectedPlace.data["speed"]} knots`
                    : ""}
                </li>
                <li>
                  Heading:{" "}
                  {this.state.selectedPlace.data
                    ? this.state.selectedPlace.data["heading"]
                    : ""}
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
  apiKey: "AIzaSyC9gF0NXH_KTIccE1w1a2_BpLqW0KuECb8",
})(MapContainer);
