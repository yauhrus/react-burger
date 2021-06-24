import React from 'react';
import styles from './BurgerConstructor.module.css';
import { 
  ConstructorElement, 
  Button, 
  CurrencyIcon,
  DragIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';

function BurgerConstructor() {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        
        <div className={styles.item}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        <div className={styles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data[1].name}
            price={data[1].price}
            thumbnail={data[1].image}
          />
        </div>
        <div className={styles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data[2].name}
            price={data[2].price}
            thumbnail={data[2].image}
          />
        </div>
        <div className={styles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data[3].name}
            price={data[3].price}
            thumbnail={data[3].image}
          />
        </div>
        <div className={styles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data[4].name}
            price={data[4].price}
            thumbnail={data[4].image}
          />
        </div>
        <div className={styles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data[5].name}
            price={data[5].price}
            thumbnail={data[5].image}
          />
        </div>
        <div className={styles.item}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[6].name}
            price={data[6].price}
            thumbnail={data[6].image}
          />
        </div>
        <div className={styles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data[7].name}
            price={data[7].price}
            thumbnail={data[7].image}
          />
        </div>
        <div className={styles.item}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={data[8].name}
            price={data[8].price}
            thumbnail={data[8].image}
          />
        </div>
        <div className={styles.item}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[9].name}
            price={data[9].price}
            thumbnail={data[9].image}
          />
        </div>
      </div>
      <div className={styles.total}>
      <span className={styles.totalSum}>
        600 
        <CurrencyIcon type="primary" />
      </span>
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;