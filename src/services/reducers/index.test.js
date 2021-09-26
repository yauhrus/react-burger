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
} from '../actions';
import { getIngredientsReducer } from './index';

const initialState = {
  ingredients: [],
  constructorIngredients: [],
  order: {
    orderNumber: 0
  }
};

const initialStateWithIngredients = {
  ingredients: [],
  constructorIngredients: [
    {_id: "1", name: "Булка"},
    {_id: "2", name: "Соус"}
  ],
  order: {
    orderNumber: 0
  }
};

const testIngredients = [
 {
  _id:"60d3b41abdacab0026a733c6",
  name:"Краторная булка N-200i",
  type:"bun",
  proteins:80,
  fat:24,
  carbohydrates:53,
  calories:420,
  price:1255,
  image:"https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v:0
 },
 {
  _id:"60d3b41abdacab0026a733ca",
  name:"Говяжий метеорит (отбивная)",
  type:"main",
  proteins:800,
  fat:800,
  carbohydrates:300,
  calories:2674,
  price:3000,
  image:"https://code.s3.yandex.net/react/code/meat-04.png",
  image_mobile:"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
  image_large:"https://code.s3.yandex.net/react/code/meat-04-large.png",
  __v:0
 }
];

describe('Проверка редьюсера getIngredientsReducer', () => {
  it('Проверка начального состояния', () => {
    expect(getIngredientsReducer(undefined, { type: 'test' })).toEqual(initialState);
  })

  it('Проверка редьюсера. GET_INGREDIENTS_REQUEST', () => {
    expect(getIngredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual({
      ...initialState
    })
  })

  it('Проверка редьюсера. GET_INGREDIENTS_SUCCESS', () => {
    expect(getIngredientsReducer(initialState, { type: GET_INGREDIENTS_SUCCESS, data: testIngredients})).toEqual({
      ...initialState,
      ingredients: testIngredients
    })
  })

  it('Проверка редьюсера. GET_INGREDIENTS_FAILED', () => {
    expect(getIngredientsReducer(initialState, { type: GET_INGREDIENTS_FAILED })).toEqual({
      ...initialState,
      currentIngredient: {}
    })
  })

  it('Проверка редьюсера. SET_CURRENT_INGREDIENT', () => {
    expect(getIngredientsReducer(initialState, { type: SET_CURRENT_INGREDIENT, currentIngredient: testIngredients[0] })).toEqual({
      ...initialState,
      currentIngredient: testIngredients[0]
    })
  })

  it('Проверка редьюсера. DELETE_CURRENT_INGREDIENT', () => {
    expect(getIngredientsReducer(initialState, { type: DELETE_CURRENT_INGREDIENT })).toEqual({
      ...initialState,
      currentIngredient: {}
    })
  })

  it('Проверка редьюсера. ADD_INGREDIENT_TO_CONSTRUCTOR', () => {
    expect(getIngredientsReducer(initialState, { type: ADD_INGREDIENT_TO_CONSTRUCTOR, draggedIngredient: testIngredients[0] })).toEqual({
      ...initialState,
      constructorIngredients: [...initialState.constructorIngredients, testIngredients[0]]
    })
  })

  it('Проверка редьюсера. DELETE_INGREDIENT_FROM_CONSTRUCTOR', () => {
    expect(getIngredientsReducer(initialStateWithIngredients, { type: DELETE_INGREDIENT_FROM_CONSTRUCTOR, id: "1" })).toEqual({
      ...initialStateWithIngredients,
      constructorIngredients: [
        {_id: "2", name: "Соус"}
      ]
    })
  })

  it('Проверка редьюсера. GET_ORDER_NUMBER_REQUEST', () => {
    expect(getIngredientsReducer(initialState, { type: GET_ORDER_NUMBER_REQUEST })).toEqual({
      ...initialState
    })
  })

  it('Проверка редьюсера. GET_ORDER_NUMBER_SUCCESS', () => {
    expect(getIngredientsReducer(initialState, { type: GET_ORDER_NUMBER_SUCCESS, orderNumber: '123'})).toEqual({
      ...initialState,
      order: {
        orderNumber: '123'
      }
    })
  })

  it('Проверка редьюсера. GET_ORDER_NUMBER_FAILED', () => {
    expect(getIngredientsReducer(initialState, { type: GET_ORDER_NUMBER_FAILED })).toEqual({
      ...initialState,
      order: {
        orderNumber: 0
      }
    })
  })

  it('Проверка редьюсера. CLEAR_ORDER_NUMBER', () => {
    expect(getIngredientsReducer(initialState, { type: CLEAR_ORDER_NUMBER })).toEqual({
      ...initialState,
      order: {
        orderNumber: 0
      }
    })
  })

  it('Проверка редьюсера. REPLACE_INGREDIENTS', () => {
    expect(getIngredientsReducer(initialStateWithIngredients, { 
      type: REPLACE_INGREDIENTS, 
      payload: { 
        dragIndex: 0, 
        hoverIndex: 1
      } 
    })).toEqual({
      ...initialStateWithIngredients,
      constructorIngredients: [
        {_id: "2", name: "Соус"},
        {_id: "1", name: "Булка"}
      ],
    })
  })
});