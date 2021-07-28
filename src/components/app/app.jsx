import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { 
  getIngredients,
  SET_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT
} from '../../services/actions';

function App() {
  const [orderVisible, setOrderVisible] = React.useState(false);
  const [ingredientVisible, setIngredientVisible] = React.useState(false);

  const currentIngredient = useSelector(store => store.burger.currentIngredient);
  const dispatch = useDispatch();

  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        if(ingredientVisible) {
          setIngredientVisible(false)
        }
        else if(orderVisible) {
          setOrderVisible(false);
        }
      }
    }

    window.addEventListener('keydown', close);

    return () => window.removeEventListener('keydown', close);

  },[ingredientVisible, orderVisible]);
  
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeOrderModal = () => {
    setOrderVisible(false);
  };

  const openOrderModal = () => {
    setOrderVisible(true);
  };

  const closeIngredientModal = () => {
    setIngredientVisible(false);
    dispatch({
      type: DELETE_CURRENT_INGREDIENT
    })
  }

  const openIngredientModal = (item) => {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      currentIngredient: item
    })
    setIngredientVisible(true);
  }

  return (
    <div className="App">
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients openModal={openIngredientModal}/>
          <BurgerConstructor openModal={openOrderModal} />
        </main>
      </DndProvider>
      { orderVisible && 
        (
            <Modal onClick={closeOrderModal} header="">
              <OrderDetails />
            </Modal>
        )
      }
      { ingredientVisible && 
        (
            <Modal onClick={closeIngredientModal} header="Детали ингредиента">
              <IngredientDetails currentIngredient={currentIngredient}/>
            </Modal>
        )
      }
    </div>
  );
}

export default App;
