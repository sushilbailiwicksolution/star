import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
  Polyline,
} from "google-maps-react";
import { saveLandMarks, getLayer } from "../../Service/index";
import { toast } from "react-toastify";
import InfoWindowEx from "../GoogleMap/infoWindowCustom";
import { planService } from "../../Service/plan.service";
import { EDIT_VIEW_LANDMARK_DATA } from "../../Constants/constants";

const CSVData = require("../../store/csvjson.json");

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.googleMap = React.createRef();
    let polylineData = [];
    this.zoomControlOptions = {
      position: props.google.maps.ControlPosition.TOP_LEFT,
    };
    this.state = {
      //initialCenter: { lat: 23.3, lng: 22.2 },
      initialCenter: { lat: CSVData[0].Latitude, lng: CSVData[0].Longitude },
      allLastLngs: [],
      showModal: false,
      dataToShow: {},
      mapDiv: "",
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      infoData: {},
      displayMarkers: "",
      loader: true,
      polylineData: polylineData,
      zoom: 7,
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
      showAddIcon: false,
      showModalPopup: false,
      landMarkName: "",
      layerList: [],
      selectedLayer: "",
      isUpdateLandmark: false,
      isReadOnly: false,
      landmarkId: "",
    };
  }

  componentDidMount() {
    //this.loadMap();
    getLayer();
    this.getLayersList();
    let sessionData = sessionStorage.getItem(EDIT_VIEW_LANDMARK_DATA);
    if (sessionData) {
      let state = JSON.parse(sessionData);
      console.log("data", state.data);
      let readOnly = false;
      let updateLandmark = false;
      let zoom = 12;
      if (state.isEdit == true) {
        updateLandmark = true;
      } else {
        readOnly = true;
      }
      this.googleMap.current.map.setOptions({
        zoom: zoom,
      });

      this.setState(
        {
          allLastLngs: state.data.geojsonobject,
          isReadOnly: readOnly,
          isUpdateLandmark: updateLandmark,
          selectedLayer: state.data.layerId,
          landmarkId: state.data.id,
          landMarkName: state.data.name,
          zoom,
        },
        () => {
          this.loadMap();
        }
      );
      sessionStorage.removeItem(EDIT_VIEW_LANDMARK_DATA);
    } else {
      this.loadMap();
    }
  }

  async getLayersList() {
    try {
      let response = await planService.getLayersList();
      if (response.status == 200) {
        //this.setState({ layerList: response.data });
        this.setState({ layerList: response.data.results });
      }
    } catch (error) {
      toast(error.msg);
    }
  }

  loadMap = () => {
    const { allLastLngs } = this.state;
    let allStores = [];
    let polylineData = [];
    let initialCenter = this.state.initialCenter;
    if (allLastLngs.length > 0) {
      initialCenter = {
        lat: Number(allLastLngs[0].Latitude),
        lng: Number(allLastLngs[0].Longitude),
      };
    }

    const displayMarkers = allLastLngs.map((store, index) => {
      const { Latitude, Longitude } = store;
      if (Latitude && Longitude) {
        polylineData.push({ lat: Latitude, lng: Longitude });
        const uniqueKey =
          Latitude.toString() + Longitude.toString() + index.toString();
        let replacedKey = uniqueKey.replace(/\./g, "");
        replacedKey = parseInt(replacedKey);
        allStores.push(store);

        return (
          <Marker
            key={uniqueKey}
            id={`marker_${index}`}
            position={{
              lat: Latitude,
              lng: Longitude,
            }}
            onClick={this.showInfoWindow}
            // onMouseout={this.hideInfoWindow}
            data={store}
            // onMouseover = {() => this.showModal(store)}
            // onMouseout = {() => this.hideModal()}
          />
        );
      } else {
        return null;
      }
    });
    const stateObject = {
      displayMarkers: displayMarkers,
      initialCenter,
    };
    if (allLastLngs.length > 2) {
      polylineData.push({
        lat: allLastLngs[0].Latitude,
        lng: allLastLngs[0].Longitude,
      });
      stateObject.showAddIcon = true;
    }

    stateObject.polyLine = (
      <Polyline
        path={polylineData}
        options={{
          strokeWeight: 2,
          strokeOpacity: 1,
          strokeColor: "#1dc1ec",
          geodesic: true,
        }}
      />
    );

    this.setState(stateObject, () => {
      setTimeout(() => {
        this.setState({
          loader: false,
        });
      }, 3000);
    });
  };

  removeMarker = (currentData = false) => {
    if (!currentData) {
      return false;
    }

    const { id } = currentData;
    if (!id) {
      return false;
    }

    let ids = id.split("_");
    const markerPosition = ids[1];
    console.log(markerPosition);

    let oldLocations = this.state.allLastLngs;
    if (markerPosition) {
      oldLocations.splice(markerPosition, 1);
      this.setState(
        {
          allLastLngs: oldLocations,
        },
        () => {
          console.log(this.state.allLastLngs);
          this.loadMap();
        }
      );
    }
  };

  showInfoWindow = (props, marker) => {
    if (
      this.state.showingInfoWindow === false ||
      marker !== this.state.activeMarker
    ) {
      this.setState({
        activeMarker: marker,
        selectedPlace: props,
        showingInfoWindow: true,
      });
    } else {
      this.hideInfoWindow();
    }
  };

  hideInfoWindow = () => {
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
    if (this.state.isReadOnly) return;
    const newLocation = { Latitude: location.lat(), Longitude: location.lng() };
    let oldLocations = this.state.allLastLngs;
    oldLocations.push(newLocation);
    this.setState(
      {
        allLastLngs: oldLocations,
      },
      () => {
        this.loadMap();
      }
    );
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
      displayMarkers: "",
    });
  }

  _mapLoaded(mapProps, map) {
    map.setOptions({
      mapTypeId: "terrain",
    });
  }

  _handleZoomChanged() {
    const zoomLevel =
      this.googleMap &&
      this.googleMap.current &&
      this.googleMap.current.listeners &&
      this.googleMap.current.listeners.zoom_changed &&
      this.googleMap.current.listeners.zoom_changed.Fb &&
      this.googleMap.current.listeners.zoom_changed.Fb.zoom
        ? this.googleMap.current.listeners.zoom_changed.Fb.zoom
        : false;
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

  handleLandmarkName = (e) => {
    const target = e.target;
    this.setState({
      landMarkName: target.value,
    });
  };

  addLandmark = async () => {
    const { landMarkName, allLastLngs } = this.state;
    if (allLastLngs.length <= 2) {
      toast.error("Please select atleast 3 points!");
      return false;
    }

    if (!landMarkName.trim()) {
      toast.error("Please enter landmark name!");
      return false;
    }

    console.log(
      "this.state.selectedLayer",
      this.state.selectedLayer,
      "length",
      this.state.selectedLayer.length
    );

    if (this.state.selectedLayer.length < 1) {
      toast.error("Please Select Layer");
      return false;
    }

    let logedInUser = localStorage.getItem("logedInUser");
    logedInUser = JSON.parse(logedInUser);

    console.log("allLastLngs", allLastLngs);

    const data = {
      name: landMarkName,
      createdBy: logedInUser.results.username,
      layerId: Number(this.state.selectedLayer),
      locationType: "layer",
      geojsonobject: allLastLngs,
    };

    try {
      //const saveLandMark = await saveLandMarks(data);
      if (!this.state.isUpdateLandmark) {
        const saveLandMark = await planService.createLandmark(data);
        toast.success("Landmark Added Successfully");
      } else {
        const updateLandMark = await planService.updateLandmark(
          this.state.landmarkId,
          data
        );
        toast.success("Landmark Updated Successfully");
      }
      this.cancelLandmark();
    } catch (err) {
      // console.log(err);
      toast.error(err.msg);
    }
  };

  cancelLandmark = () => {
    this.setState({
      landMarkName: "",
      showModalPopup: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="loading"
          style={{ display: this.state.loader ? "block" : "none" }}
        >
          <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
        </div>

        {/* Show plus icon if points are greater than 2 */}
        {this.state.showAddIcon && !this.state.isReadOnly ? (
          <span
            className="plus-icon-position"
            onClick={() => {
              this.setState({ showModalPopup: true });
            }}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
          </span>
        ) : null}

        {/* Show add Name modal onclick of plus icon */}
        {this.state.showModalPopup ? (
          <div className="addArea-name cl-white">
            <h2 className="mb-3">Add Name of the Area</h2>
            <input
              type="text"
              className="form-control mb-3"
              onChange={this.handleLandmarkName}
              value={this.state.landMarkName}
            ></input>
            <div className="col-md-12 mb-3 padding-initial">
              <div className="select-dropdown">
                <select
                  className="form-control"
                  id="select2"
                  onChange={(e) => {
                    console.log(e.target.value);
                    // setSelectedFlight(e.target.value);
                    this.setState({ selectedLayer: e.target.value });
                  }}
                  value={this.state.selectedLayer}
                >
                  <option value="">Select Layer</option>
                  {this.state.layerList.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.addLandmark}
            >
              {this.state.isUpdateLandmark ? "Update" : "Add Name"}
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.cancelLandmark}
            >
              Cancel
            </button>
          </div>
        ) : null}

        <Map
          containerStyle={{
            width: "100%",
            height:
              this.props.mapHeight && this.props.mapHeight > 0
                ? this.props.mapHeight
                : "96%",
          }}
          onClick={(t, map, c) => this.addMarker(c.latLng, map)}
          google={this.props.google}
          //zoom={this.state.zoom}
          zoom={this.state.zoom}
          maxZoom={15}
          minZoom={5}
          initialCenter={this.state.initialCenter}
          fullscreenControl={false}
          onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
          // onZoomChanged={this._handleZoomChanged.bind(this)}
          ref={this.googleMap}
          // onCenterChanged={this._handleCenterChanged.bind(this)}

          streetViewControl={false}
          zoomControlOptions={this.zoomControlOptions}
          zoomControl={true}
          disableDefaultUI={true}
        >
          {this.state.displayMarkers}
          {this.state.polyLine}
          <InfoWindowEx
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <>
              <div>
                <ul
                  style={{
                    listStyle: "none",
                    textAlign: "left",
                    width: "170px",
                    height: "58px",
                    fontSize: "12px",
                    padding: "0px",
                    fontWeight: "600",
                  }}
                >
                  <li>
                    Longitude :{" "}
                    {this.state.selectedPlace.data
                      ? this.state.selectedPlace.data["Longitude"].toFixed(4)
                      : ""}
                  </li>
                  <li>
                    Latitude:{" "}
                    {this.state.selectedPlace.data
                      ? this.state.selectedPlace.data["Latitude"].toFixed(4)
                      : ""}
                  </li>
                  <li className="marker-delete-btn">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        this.removeMarker(this.state.selectedPlace);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </>
          </InfoWindowEx>
          {/* <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            style={{
              background: '#000000'
            }}
          >
            <div>
              <ul style={{ listStyle: 'none', textAlign: 'left', width: '170px', height: '58px', fontSize: '17px', padding: '0px', fontWeight: '600' }}>
                <li>Longitude : {this.state.selectedPlace.data ? this.state.selectedPlace.data['Longitude'] : ""}</li>
                <li><button onClick={this.removeMarker}>Delete</button></li>
                <li>Latitude: {this.state.selectedPlace.data ? this.state.selectedPlace.data['Latitude'] : ""}</li>
                <li>Heading: {this.state.selectedPlace.data ? this.state.selectedPlace.data['Heading'] : ""}</li>
              </ul>
            </div>
            <button id="marker_delete_button" onClick={() => this.removeMarker}>Delete</button>
          </InfoWindow> */}
        </Map>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC9gF0NXH_KTIccE1w1a2_BpLqW0KuECb8",
})(MapContainer);
