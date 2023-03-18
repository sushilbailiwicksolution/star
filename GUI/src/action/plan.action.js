import { planService } from '../Service/plan.service';
import { PlanConstants } from '../Constants/constants';
export const planActions = {
  createLayer,
};

function createLayer(requestParams = {}) {
  return (dispatch) => {
    dispatch(request({}));

    planService.createLayer(requestParams).then(
      (resp) => {
        console.log('Layers response', resp);
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
