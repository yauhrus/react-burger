import React from 'react';
import styles from './App.module.css';
import AppHeader from '../src/components/AppHeader/AppHeader';
import BurgerIngredients from '../src/components/BurgerIngredients/BurgerIngredients';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
      </main>
    </div>
  );
}

export default App;
