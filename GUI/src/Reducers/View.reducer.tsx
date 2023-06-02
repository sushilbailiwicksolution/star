import { DefaultMapID, ViewsConstants } from "../Constants/constants";

const initialState = {
  selectedCustomer: null, //Added to handle customer selection 
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
  selectedEventIndex: null,
  mapTypeId: DefaultMapID,
  moveToAsset: null,
  zoomToAsset: null,
  lastRefreshedTime: "",
  zoomInTrigger: 0,
  zoomOutTrigger: 0,
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
      //Added case to handle customer selection 
      case 'SET_SELECTED_CUSTOMER':
        return {
          ...state,
          selectedCustomer: action.value, 
        };
    
    default:
      return state;
  }
}
