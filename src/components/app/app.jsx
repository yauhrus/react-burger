import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import Registration from '../../pages/registration/registration';
import Login from '../../pages/login/login';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ProtectedRoute from '../protected-route/protected-route';
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
      {/* <Router> */}
        <Switch>
          <Route path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
              <main className={styles.main}>
                <BurgerIngredients openModal={openIngredientModal}/>
                <BurgerConstructor openModal={openOrderModal} />
              </main>
            </DndProvider>
          </Route>
          <Route path="/register" exact={true}>
            <Registration />
          </Route>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPassword />
          </Route>
          <ProtectedRoute path="/profile" exact={true}>
            <Profile />
          </ProtectedRoute>
        </Switch>
      {/* </Router> */}
      { orderVisible && 
        (
          <Modal onClick={closeOrderModal} header="">
            <OrderDetails />
          </Modal>
        )
      }
      { ingredientVisible && 
        ( 
          <Route path={"/ingredients/:ingredientId"}>
            <Modal onClick={closeIngredientModal} header="Детали ингредиента">
              <IngredientDetails currentIngredient={currentIngredient}/>
            </Modal>
          </Route>
        )
      }
    </div>
  );
}

export default App;
