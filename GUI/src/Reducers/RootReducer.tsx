import { combineReducers } from 'redux';
import layerReducer from './layer.reducer';
import reportReducer from './ReportReducer';
import viewReducer from './View.reducer';

const rootReducer = combineReducers({ reportReducer, layerReducer,viewReducer });

export default rootReducer;
