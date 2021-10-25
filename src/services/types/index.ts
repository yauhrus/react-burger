import { store } from '../../index';
import { TIgredientsAndOrdersActions } from '../actions';
import { TUserActions } from '../actions/user';
import { TWsActions } from '../actions/ws';
import { TWsUserActions } from '../actions/wsUser'; 
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = 
  | TIgredientsAndOrdersActions
  | TUserActions
  | TWsActions
  | TWsUserActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = typeof store.dispatch;