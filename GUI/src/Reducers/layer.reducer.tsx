const initialState = {
  showLoader: false,
  layerListData: {},
  isError: false,
  errorMessage: '',
};

export default function layerReducer(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
