import { planService } from "../Service/plan.service";
import { PlanConstants, ViewsConstants } from "../Constants/constants";
export const planActions = {
  createLayer,
  setSelectedCustomer,
  setEventName,
};




function setSelectedCustomer(customer) {
  return { type: ViewsConstants.VIEW_SET_SELECTED_CUSTOMER, value: customer }; // Define a new action type to set the selected customer
}
function setEventName(eventName) {
  return { type: ViewsConstants.EVENT_NAME, value: eventName }; 
}
function createLayer(requestParams = {}) {
  return (dispatch) => {
    dispatch(request({}));

    planService.createLayer(requestParams).then(
      (resp) => {
        dispatch(success(resp));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(data) {
    return { type: PlanConstants.POST_CREATE_LAYER_REQUEST, value: data };
  }
  function success(data) {
    return { type: PlanConstants.GET_CREATE_LAYER_SUCCESS, value: data };
  }
  function failure(error) {
    return { type: PlanConstants.GET_CREATE_LAYER_FAILURE, value: error };
  }
}
