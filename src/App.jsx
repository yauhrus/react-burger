import React from 'react';
import styles from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import data from './utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={data}/>
        <BurgerConstructor constructor={data}/>
      </main>
    </div>
  );
}

export default App;
