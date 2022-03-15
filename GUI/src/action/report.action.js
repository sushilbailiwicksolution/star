import { reportService } from '../Service/report.service';
import { ReportConstants } from '../Constants/constants';
export const reportActions = {
  getReport,
};

function getReport(reportRequest = {}) {
  return (dispatch) => {
    dispatch(request({}));

    reportService.getReport(reportRequest).then(
      (resp) => {
        console.log('Report List response', resp);
        dispatch(success(resp));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(data) {
    return { type: ReportConstants.GET_REPORT_REQUEST, value: data };
  }
  function success(data) {
    return { type: ReportConstants.GET_REPORT_SUCCESS, value: data };
  }
  function failure(error) {
    return { type: ReportConstants.GET_REPORT_FAILURE, value: error };
  }
}
