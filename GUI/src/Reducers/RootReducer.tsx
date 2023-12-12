import { combineReducers } from 'redux';
import layerReducer from './layer.reducer';
import reportReducer from './ReportReducer';
import viewReducer from './View.reducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const rootReducer = combineReducers({ reportReducer, layerReducer,viewReducer });

export type RootState = ReturnType<typeof rootReducer>;

// Create a typed selector hook
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;


export default rootReducer;
