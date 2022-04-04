import { ReportConstants } from '../Constants/constants';

const initialState = {
  showLoader: false,
  reportListData: {},
  isError: false,
  errorMessage: '',
  selectedAssetId: '',
  activeReport: '',
  engineConditionData: {},
  engineeringAndMaintainanceData: {},
  financeAndAdminData: {},
  flightOperationsData: {},
  flightSafetyData: {},
  moqaData: {},
  foqaData: {},
  oooiData: {},
  scheduleListData: {},
};

export default function reportReducer(state = initialState, action: any) {
  switch (action.type) {
    case ReportConstants.GET_REPORT_REQUEST:
      return {
        ...state,
        showLoader: true,
      };
    case ReportConstants.GET_ENGINE_MAINTAINANCE_REPORT_SUCCESS:
      return {
        ...state,
        engineeringAndMaintainanceData: action.value,
        showLoader: false,
      };
    case ReportConstants.GET_ENGINE_CONDITION_REPORT_SUCCESS:
      return {
        ...state,
        engineConditionData: action.value,
        showLoader: false,
      };
    case ReportConstants.GET_FINANCE_ADMIN_REPORT_SUCCESS:
      return {
        ...state,
        financeAndAdminData: action.value,
        showLoader: false,
      };
    case ReportConstants.GET_FLIGHT_OPERATION_REPORT_SUCCESS:
      return {
        ...state,
        flightOperationsData: action.value,
        showLoader: false,
      };
    case ReportConstants.GET_FLIGHT_SAFETY_REPORT_SUCCESS:
      return {
        ...state,
        flightSafetyData: action.value,
        showLoader: false,
      };
    case ReportConstants.GET_FLIGHT_MOQA_REPORT_SUCCESS:
      return {
        ...state,
        moqaData: action.value,
        showLoader: false,
      };
    case ReportConstants.GET_REPORT_FAILURE:
      return {
        ...state,
        errorMessage: action.value,
        reportListData: {},
        engineConditionData: {},
        engineeringAndMaintainanceData: {},
        financeAndAdminData: {},
        flightOperationsData: {},
        flightSafetyData: {},
        moqaData: {},
        foqaData: {},
        oooiData: {},
        scheduleListData: {},
        showLoader: false,
        isError: true,
      };
    case ReportConstants.CLEAR_REPORT_RESPONSE:
      return {
        ...state,
        errorMessage: '',
        showLoader: false,
        isError: false,
        reportListData: {},
        engineConditionData: {},
        engineeringAndMaintainanceData: {},
        financeAndAdminData: {},
        flightOperationsData: {},
        flightSafetyData: {},
        moqaData: {},
        foqaData: {},
        oooiData: {},
        scheduleListData: {},
      };
    case ReportConstants.SET_ACTIVE_REPORT:
      return {
        ...state,
        activeReport: action.value,
        reportListData: {},
        engineConditionData: {},
        engineeringAndMaintainanceData: {},
        financeAndAdminData: {},
        flightOperationsData: {},
        flightSafetyData: {},
        moqaData: {},
        foqaData: {},
        oooiData: {},
        scheduleListData: {},
      };
    case ReportConstants.SET_SELECTED_ASSET_ID:
      return {
        ...state,
        selectedAssetId: action.value,
      };
    default:
      return state;
  }
}
