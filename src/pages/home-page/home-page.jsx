import React from 'react';
import PropTypes from 'prop-types';
import styles from './home-page.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

export function HomePage(props) {
  return (
    <main className={styles.main}>
      <BurgerIngredients />
      <BurgerConstructor openModal={props.openModal} />
    </main>
  );
}

HomePage.propTypes = {
  openModal: PropTypes.func.isRequired,
}