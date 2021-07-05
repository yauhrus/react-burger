import React from 'react';
import PropTypes from 'prop-types';
import { 
  ConstructorElement, 
  Button, 
  CurrencyIcon,
  DragIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

function BurgerConstructor(props) {
  return (
    <section className={styles.root}>
      <div className={`${styles.container} `}>
        <div className={`${styles.item} mb-4 pr-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price="200"
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
        <div className={`${styles.scrollable} mb-4 pr-4`}>
          {
            props.constructor.slice(1, -1).map(item => 
              (
                <div className={`${styles.item} mb-4`} key={item.name}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    isLocked={false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              )
            )
          }
        </div>
        <div className={`${styles.item} mb-4 pr-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price="200"
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </div>
      <div className={`${styles.total} mt-10 pr-8`}>
        <span className={`${styles.totalSum} mr-10 text_type_digits-medium`}>
          600 
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={() => props.openModal()}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = { 
  constructor: PropTypes.arrayOf(PropTypes.shape({  
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })).isRequired,
};

export default BurgerConstructor;