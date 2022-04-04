import { reportService } from '../Service/report.service';
import { ReportConstants } from '../Constants/constants';
import {
  IP,
  PORT_8080,
  PORT_8082,
  GET_REPORT,
  GET_REPORT_ENG_MAINTAINANCE,
  GET_REPORT_ENG_CONDITION,
  GET_REPORT_FINANCE_ADMIN,
  GET_REPORT_FLIGHT_OPERATION,
  GET_REPORT_FLIGHT_SAFETY,
  GET_REPORT_FLIGHT_MOQA,
} from '../Config/siteConfig';
import REPORTDATA from '../store/reportSampleJson.json';

const URL = IP + PORT_8082;

export const reportActions = {
  getReportEngineMaintainance,
  getReportEngineCondition,
  getReportFinanceAndAdmin,
  getReportFlightOperation,
  getReportFlightSafety,
  getReportFlightMOQA,
};

function getReportEngineMaintainance(reportRequest) {
  let apiUrl = URL + GET_REPORT + GET_REPORT_ENG_MAINTAINANCE;
  return (dispatch) => {
    dispatch(request({}));
    reportService.getReports(apiUrl, reportRequest).then(
      (resp) => {
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
    return {
      type: ReportConstants.GET_ENGINE_MAINTAINANCE_REPORT_SUCCESS,
      value: data,
    };
  }
  function failure(error) {
    return { type: ReportConstants.GET_REPORT_FAILURE, value: error };
  }
}

function getReportEngineCondition(reportRequest) {
  let apiUrl = URL + GET_REPORT + GET_REPORT_ENG_CONDITION;
  return (dispatch) => {
    dispatch(request({}));

    reportService.getReports(apiUrl, reportRequest).then(
      (resp) => {
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
    return {
      type: ReportConstants.GET_ENGINE_CONDITION_REPORT_SUCCESS,
      value: data,
    };
  }
  function failure(error) {
    return { type: ReportConstants.GET_REPORT_FAILURE, value: error };
  }
}

function getReportFinanceAndAdmin(reportRequest) {
  let apiUrl = URL + GET_REPORT + GET_REPORT_FINANCE_ADMIN;
  return (dispatch) => {
    dispatch(request({}));

    reportService.getReports(apiUrl, reportRequest).then(
      (resp) => {
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
    return {
      type: ReportConstants.GET_FINANCE_ADMIN_REPORT_SUCCESS,
      value: data,
    };
  }
  function failure(error) {
    return { type: ReportConstants.GET_REPORT_FAILURE, value: error };
  }
}

function getReportFlightOperation(reportRequest) {
  let apiUrl = URL + GET_REPORT + GET_REPORT_FLIGHT_OPERATION;
  return (dispatch) => {
    dispatch(request({}));

    reportService.getReports(apiUrl, reportRequest).then(
      (resp) => {
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
    return {
      type: ReportConstants.GET_FLIGHT_OPERATION_REPORT_SUCCESS,
      value: data,
    };
  }
  function failure(error) {
    return { type: ReportConstants.GET_REPORT_FAILURE, value: error };
  }
}

function getReportFlightSafety(reportRequest) {
  let apiUrl = URL + GET_REPORT + GET_REPORT_FLIGHT_SAFETY;
  return (dispatch) => {
    dispatch(request({}));

    reportService.getReports(apiUrl, reportRequest).then(
      (resp) => {
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
    return {
      type: ReportConstants.GET_FLIGHT_SAFETY_REPORT_SUCCESS,
      value: data,
    };
  }
  function failure(error) {
    return { type: ReportConstants.GET_REPORT_FAILURE, value: error };
  }
}

function getReportFlightMOQA(reportRequest) {
  let apiUrl = URL + GET_REPORT + GET_REPORT_FLIGHT_MOQA;
  return (dispatch) => {
    dispatch(request({}));

    reportService.getReports(apiUrl, reportRequest).then(
      (resp) => {
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
    return {
      type: ReportConstants.GET_FLIGHT_MOQA_REPORT_SUCCESS,
      value: data,
    };
  }
  function failure(error) {
    return { type: ReportConstants.GET_REPORT_FAILURE, value: error };
  }
}
