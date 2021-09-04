import { combineReducers } from 'redux';
import { getIngredientsReducer } from './index';
import { userReducer } from './user';
import { wsReducer } from './ws';
import { wsUserReducer } from './wsUser';

export const rootReducer = combineReducers({
  burger: getIngredientsReducer,
  user: userReducer,
  orders: wsReducer,
  userOrders: wsUserReducer
});