import { getCookie } from "../cookies";
import { 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  CLEAR_ORDER_NUMBER,
  REPLACE_INGREDIENTS
} from '../constants';

import { AppDispatch, AppThunk } from '../types';
import { TIngredient } from '../types/data';

const token = getCookie('accessToken');

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS
  readonly data: TIngredient[]
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED
}

export interface ISetCurrentIngredient {
  readonly type: typeof SET_CURRENT_INGREDIENT
  readonly currentIngredient: number
}

export interface IDeleteCurrentIngredient {
  readonly type: typeof DELETE_CURRENT_INGREDIENT
  readonly currentIngredient: object
}

export interface IAddIngredientToConstructor {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR
  readonly draggedIngredient: TIngredient
}

export interface IDeleteIngredientFromConstructor {
  readonly type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR
  readonly id: string
}

export interface IGetOrderNumberRequest {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST
}

export interface IGetOrderNumberSuccess {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS
  readonly orderNumber: number
}

export interface IGetOrderNumberFailed {
  readonly type: typeof GET_ORDER_NUMBER_FAILED
}

export interface IClearOrderNumber {
  readonly type: typeof CLEAR_ORDER_NUMBER
}

export interface IReplaceIngredients {
  readonly type: typeof REPLACE_INGREDIENTS
  readonly payload: {
    dragIndex: number,
    hoverIndex: number
  }
}

export const getIngredientsRequestAction = (): IGetIngredientsRequest => ({
  type: GET_INGREDIENTS_REQUEST,
})

export const getIngredientsSuccessAction = (data: TIngredient[]): IGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  data: data
})

export const getIngedientsFailedAction = (): IGetIngredientsFailed => ({
  type: GET_INGREDIENTS_FAILED
})

export const setCurrentIngredientAction = (currentIngredient: number): ISetCurrentIngredient => ({
  type: SET_CURRENT_INGREDIENT,
  currentIngredient: currentIngredient
})

export const deleteCurrentIngredientAction = (currentIngredient: object): IDeleteCurrentIngredient => ({
  type: DELETE_CURRENT_INGREDIENT,
  currentIngredient: currentIngredient
})

export const addIngredientToConstructorAction = (draggedIngredient: TIngredient): IAddIngredientToConstructor => ({
  type: ADD_INGREDIENT_TO_CONSTRUCTOR,
  draggedIngredient: draggedIngredient
})

export const deleteIngredientFromConstructor = (id: string): IDeleteIngredientFromConstructor => ({
  type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  id: id
})

export const getOrderNumberRequestAction = (): IGetOrderNumberRequest => ({
  type: GET_ORDER_NUMBER_REQUEST,
})

export const getOrderNumberSuccessAction = (orderNumber: number): IGetOrderNumberSuccess => ({
  type: GET_ORDER_NUMBER_SUCCESS,
  orderNumber: orderNumber
})

export const getOrderNumberFailedAction = (): IGetOrderNumberFailed => ({
  type: GET_ORDER_NUMBER_FAILED
})

export const clearOrderNumberAction = (): IClearOrderNumber => ({
  type: CLEAR_ORDER_NUMBER
})

export const replaceIngredientsAction = (dragIndex: number, hoverIndex: number): IReplaceIngredients => ({
  type: REPLACE_INGREDIENTS,
  payload: {
    dragIndex: dragIndex,
    hoverIndex: hoverIndex
  }
})

export type TIgredientsAndOrdersActions = 
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  | ISetCurrentIngredient
  | IDeleteCurrentIngredient
  | IAddIngredientToConstructor
  | IDeleteIngredientFromConstructor
  | IGetOrderNumberRequest
  | IGetOrderNumberSuccess
  | IGetOrderNumberFailed
  | IClearOrderNumber
  | IReplaceIngredients;

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  const API = 'https://norma.nomoreparties.space/api/ingredients';

  dispatch(getIngredientsRequestAction())
  fetch(API).then(res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
  .then(data => dispatch(getIngredientsSuccessAction(data.data)))
  .catch(e => {
    dispatch(getIngedientsFailedAction());
    console.log('Error: ' + e.message);
  });
}

export const getOrderNumber: AppThunk = (ingredients: TIngredient[]) => (dispatch: AppDispatch) => {
  const API = 'https://norma.nomoreparties.space/api/orders';

  dispatch(getOrderNumberRequestAction());

  const data = {
    "ingredients": ingredients.map((item: TIngredient) => item._id)
  };
  token && fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': token
    },
    body: JSON.stringify(data),
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
  .then(data => {
    dispatch(getOrderNumberSuccessAction(data.order.number))
  })
  .catch((error) => {
    dispatch(getOrderNumberFailedAction())
    console.error('Error:', error);
  });
}

export const replaceItems: AppThunk = (dragIndex: number, hoverIndex: number) => (dispatch: AppDispatch) => {
  dispatch(replaceIngredientsAction(dragIndex, hoverIndex));
}