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
  REPLACE_INGREDIENTS
} from '../actions';

const initialState = {
  ingredients: [],
  constructorIngredients: [],
  currentIngredient: {},
  order: {
    orderNumber: 0
  }
};

export const getIngredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.data
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ingredients: [],
        constructorIngredients: [],
        currentIngredient: {},
        order: {
          orderNumber: 0
        }
      }
    }
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.currentIngredient
      }
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: {}
      }
    }
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.draggedIngredient]
      }
    }
    case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {      
      let itemToDeleteIndex = state.constructorIngredients.map(item => item._id).indexOf(action.id);
      
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter((item,index) => index !== itemToDeleteIndex )
      }
    }
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state
      }
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        order: {
          orderNumber: action.orderNumber
        }
      }
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        order: {
          orderNumber: 0
        }
      }
    }
    case REPLACE_INGREDIENTS: {
      const replacedConstructorIngredients = [...state.constructorIngredients];
      const draggedIngredient = replacedConstructorIngredients[action.payload.dragIndex];
      replacedConstructorIngredients.splice(action.payload.dragIndex, 1);
      replacedConstructorIngredients.splice(action.payload.hoverIndex, 0, draggedIngredient);

      return {
        ...state,
        constructorIngredients: replacedConstructorIngredients
      }
    }
    default: {
      return state;
    }
  }
};