import { combineReducers } from 'redux';
import layerReducer from './layer.reducer';
import reportReducer from './ReportReducer';
const rootReducer = combineReducers({ reportReducer, layerReducer });

export default rootReducer;
