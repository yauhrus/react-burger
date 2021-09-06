import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderInfo from '../order-info/order-info';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ProtectedRoute from '../protected-route/protected-route';
import { getIngredients, CLEAR_ORDER_NUMBER } from '../../services/actions';
import { 
  HomePage,
  Registration, 
  Login, 
  ForgotPassword, 
  ResetPassword, 
  Profile, 
  Orders, 
  PageNotFound 
} from '../../pages';

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
    dispatch({ type: CLEAR_ORDER_NUMBER });
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
            <HomePage openModal={openOrderModal}/>
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
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <Route path="/orders" exact={true}>
          <Orders />
        </Route>
        <Route path={"/orders/:orderId"} exact={true}>
          <OrderInfo className={"mt-30 test"} />
        </Route>
        <Route path={"/ingredients/:ingredientId"}>
          <IngredientDetails header="Детали ингредиента"/>
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      { background && 
        ( 
          <Switch>
            <Route path={"/ingredients/:ingredientId"}>
              <Modal onClick={closeIngredientModal} header="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            </Route>
            <Route path={"/orders/:orderId"} exact={true}>
              <Modal title={'Заказ'} onClick={() => {
                history.push('/orders');
              }}>
                <OrderInfo/>
              </Modal>
            </Route>
          </Switch>
        )
      }
      { orderVisible && 
        (
          <Modal onClick={closeOrderModal} header="">
            <OrderDetails />
          </Modal>
        )
      }
    </div>
  );
}

export default App;
