import { combineReducers } from 'redux';
import { getIngredientsReducer } from './index';

export const rootReducer = combineReducers({
  burger: getIngredientsReducer,
});