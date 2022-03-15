import { ReportConstants } from '../Constants/constants';

const initialState = {
  showLoader: false,
  reportListData: {},
  isError: false,
  errorMessage: '',
};

export default function reportReducer(state = initialState, action: any) {
  switch (action.type) {
    case ReportConstants.GET_REPORT_REQUEST:
      return {
        ...state,
        showLoader: true,
      };
    case ReportConstants.GET_REPORT_SUCCESS:
      return {
        ...state,
        reportListData: action.value,
        showLoader: false,
      };
    case ReportConstants.GET_REPORT_FAILURE:
      return {
        ...state,
        errorMessage: action.value,
        reportListData: {},
        showLoader: false,
        isError: true,
      };
    case ReportConstants.CLEAR_REPORT_RESPONSE:
      return {
        errorMessage: '',
        showLoader: false,
        isError: false,
        reportListData: {},
      };
    default:
      return state;
  }
}
