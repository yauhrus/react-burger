import React from 'react';
import styles from './BurgerIngredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';

function BurgerIngredientsItem(props: any) {
  return (
    <>
      <h2 className={styles.sectionTitle}>Соусы</h2>
      <ul className={styles.cardContainer}>
        {
          data.filter(item => item.type === props.type ).map(item => (
            <li key={item._id} className={styles.card}>
              <img src={item.image} alt=""/>
              <span className={styles.price}>
                {item.price}
                <CurrencyIcon type="primary" />
              </span>
              <p className={styles.name}>{item.name}</p>
            </li>
          ))
        }
      </ul>
    </>
  );
}

export default BurgerIngredientsItem;