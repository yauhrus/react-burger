import { combineReducers } from 'redux';
import { getIngredientsReducer } from './index';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  burger: getIngredientsReducer,
  user: userReducer,
});