import React from 'react';
import styles from './App.module.css';
import AppHeader from '../src/components/AppHeader/AppHeader';
import BurgerIngredients from '../src/components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../src/components/BurgerConstuctor/BurgerConstructor';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
