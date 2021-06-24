import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsItem from './BurgerIngredientItem';

function BurgerIngredients() {
  const naming = [
    {
      name: 'bun',
      title: 'Булки',
    },
    {
      name: 'sauce',
      title: 'Соусы',
    },
    {
      name: 'main',
      title: 'Начинки',
    },
  ]
  const [current, setCurrent] = React.useState('0');

  return (
    <section className={styles.root}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <div style={{ display: 'flex' }} className={styles.tabContainer}>
        {
          naming.map((item,index) => (
            <Tab 
              value={index + ''} 
              active={current === index + ''} 
              onClick={setCurrent} 
              key={index}
            >
              {item.title}
            </Tab>)
          )
        }
      </div>
      <div className={styles.ingridients}>
        { 
          naming.map((item,index) => <BurgerIngredientsItem type={item.name} key={index} title={item.title}/>)
        }
      </div>
    </section>
  );
}

export default BurgerIngredients;