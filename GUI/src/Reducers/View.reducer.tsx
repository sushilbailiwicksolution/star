import { DefaultMapID, ViewsConstants } from "../Constants/constants";

const initialState = {
  selectedCustomer: null, //Added to handle customer selection
  eventName: null,
  showLoader: false,
  isError: false,
  errorMessage: "",
  selectedAssetId: null,
  currentFlightList: [],
  baronMapData: {},
  fuel: 0,
  airSpeed: 0,
  groundSpeed: 0,
  altitude: 0,
  startTimer: false,
  assetList: [],
  selectedEvent: null,
  zoomToEvent: null,
  selectedEventIndex: null,
  mapTypeId: DefaultMapID,
  moveToAsset: null,
  zoomToAsset: null,
  lastRefreshedTime: "",
  zoomInTrigger: 0,
  zoomOutTrigger: 0,
  zoomOutMaxTrigger:0,
  goToLocationData: null,
  selectedAssetIndex: 0,
};

export default function viewReducer(state = initialState, action: any) {
  switch (action.type) {
    case ViewsConstants.FLIGHT_LIST_DATA:
      return {
        ...state,
        showLoader: false,
        isError: false,
        errorMessage: "",
        currentFlightList: action.value,
      };
    case ViewsConstants.EVENT_NAME:
      return {
        ...state,
        eventName: action.value,
      };
    case ViewsConstants.VIEW_CLEAR_DATA:
      return {
        ...state,
        showLoader: false,
        isError: false,
        errorMessage: "",
        selectedAssetId: null,
        currentFlightList: [],
        baronMapData: {},
      };
    case ViewsConstants.VIEW_FLIGHT_SPEED_DETAILS:
      return {
        ...state,
        fuel: action.value.fuel,
        airSpeed: action.value.airSpeed,
        groundSpeed: action.value.groundSpeed,
        altitude: action.value.altitude,
      };
    case ViewsConstants.BARON_WEATHER_DATA:
      return {
        ...state,
        baronMapData: action.value,
      };
    case ViewsConstants.START_TIMER:
      return {
        ...state,
        startTimer: action.value,
      };
    case ViewsConstants.VIEW_SELECTED_ASSET:
      return {
        ...state,
        selectedAssetId: action.value,
      };
    case ViewsConstants.VIEW_ASSET_LIST:
      return {
        ...state,
        assetList: action.value,
      };
    case ViewsConstants.VIEW_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: action.value.selectedEvent,
      };
    case ViewsConstants.VIEW_ZOOM_TO_EVENT:
      return {
        ...state,
        zoomToEvent: action.value,
      };
    case ViewsConstants.UPDATE_MAP_TYPE_ID:
      return {
        ...state,
        mapTypeId: action.value,
      };
    case ViewsConstants.VIEW_MOVE_TO_ASSET:
      return {
        ...state,
        moveToAsset: action.value,
      };
    case ViewsConstants.VIEW_ZOOM_TO_ASSET:
      return {
        ...state,
        zoomToAsset: action.value,
      };

    case ViewsConstants.VIEW_LAST_REFRESHED_TIME:
      return {
        ...state,
        lastRefreshedTime: action.value,
      };
    case ViewsConstants.VIEW_ZOOM_IN_TRIGGER:
      return {
        ...state,
        zoomInTrigger: state.zoomInTrigger + 1,
      };
    case ViewsConstants.VIEW_ZOOM_OUT_TRIGGER:
      return {
        ...state,
        zoomOutTrigger: state.zoomOutTrigger + 1,
      };
      case ViewsConstants.VIEW_ZOOM_OUT_MAX_TRIGGER:
        return {
          ...state,
          zoomOutMaxTrigger: state.zoomOutMaxTrigger +1,
        };

    //Added case to handle customer selection
    case ViewsConstants.VIEW_SET_SELECTED_CUSTOMER:
      return {
        ...state,
        selectedCustomer: action.value,
      };
    case ViewsConstants.VIEW_GO_TO_LOCATION_DATA:
      return {
        ...state,
        goToLocationData: action.value,
      };
    case ViewsConstants.SELECTED_ASSET_INDEX:
      return { ...state, selectedAssetIndex: action.value };

    default:
      return state;
  }
}
