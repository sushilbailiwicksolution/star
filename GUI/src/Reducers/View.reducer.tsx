import { ViewsConstants } from "../Constants/constants";

const initialState = {
    showLoader: false,
    isError: false,
    errorMessage: '',
    selectedAssetId: '',
    currentFlightList: [],
    baronMapData: {},
    fuel: 0,
    airSpeed: 0,
    groundSpeed: 0
};

export default function viewReducer(state = initialState, action: any) {

    switch (action.type) {
        case ViewsConstants.FLIGHT_LIST_DATA:
            return {
                ...state,
                showLoader: false,
                isError: false,
                errorMessage: '',
                selectedAssetId: '',
                currentFlightList: action.value,
            };
        case ViewsConstants.VIEW_CLEAR_DATA:
            return {
                ...state,
                showLoader: false,
                isError: false,
                errorMessage: '',
                selectedAssetId: '',
                currentFlightList: [],
                baronMapData: {}
            };
        case ViewsConstants.VIEW_FLIGHT_SPEED_DETAILS:
            return {
                ...state,
                fuel: action.value.fuel,
                airSpeed: action.value.airSpeed,
                groundSpeed: action.value.groundSpeed,
            };
        case ViewsConstants.BARON_WEATHER_DATA:
            return {
                ...state,
                baronMapData: action.value,
            };
        default:
            return state;
    }

}
