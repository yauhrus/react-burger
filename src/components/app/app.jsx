import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
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
import {  getIngredients } from '../../services/actions';

function App() {
  const [orderVisible, setOrderVisible] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  let background = location.state;

  if (location.state) {
    background = location.state.background;
  }

  if (history.action !== 'PUSH') {
    background = undefined;
  }

  const closeOrderModal = () => {
    setOrderVisible(false);
  };

  const openOrderModal = () => {
    setOrderVisible(true);
  };

  const closeIngredientModal = useCallback(() => {
    history.push('/');
  },[history]);

  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        if(background) {
          closeIngredientModal();
        }
        else if(orderVisible) {
          setOrderVisible(false);
        }
      }
    }

    window.addEventListener('keydown', close);

    return () => window.removeEventListener('keydown', close);

  },[orderVisible, history, background, closeIngredientModal]);
  
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              <BurgerIngredients />
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
        <Route path={"/ingredients/:ingredientId"}>
          <IngredientDetails header="Детали ингредиента"/>
        </Route>
      </Switch>
      { orderVisible && 
        (
          <Modal onClick={closeOrderModal} header="">
            <OrderDetails />
          </Modal>
        )
      }
      { background && 
        ( 
          <Route path={"/ingredients/:ingredientId"}>
            <Modal onClick={closeIngredientModal} header="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          </Route>
        )
      }
    </div>
  );
}

export default App;
