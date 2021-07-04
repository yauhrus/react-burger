import React, { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../components/app-header/app-header';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Modal from '../components/modal/modal';
import OrderDetails from '../components/order-details/order-details';
import IngredientDetails from '../components/ingredient-details/ingredient-details';

const API = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [apiData, setApiData] = React.useState([]);
  const [orderVisible, setOrderVisible] = React.useState(false);
  const [ingredientVisible, setIngredientVisible] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});

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
    fetch(API)
        .then(res => res.json())
        .then(data => setApiData(data.data))
        .catch(e => {
          console.log('Error: ' + e.message);
        });
  }, []);

  const closeOrderModal = () => {
    setOrderVisible(false);
  };

  const openOrderModal = () => {
    setOrderVisible(true);
  };

  const closeIngredientModal = () => {
    setIngredientVisible(false);
  }

  const openIngredientModal = (item) => {
    setCurrentIngredient({...item});
    setIngredientVisible(true);
  }

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={apiData} openModal={openIngredientModal}/>
        <BurgerConstructor constructor={apiData} openModal={openOrderModal}/>
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
      </main>
    </div>
  );
}

export default App;
