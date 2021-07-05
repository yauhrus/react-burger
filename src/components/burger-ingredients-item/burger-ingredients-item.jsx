import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.css';

function BurgerIngredientsItem(props) {
  return (
    <>
      <h2 className={`${styles.sectionTitle} text_type_main-medium mt-2 mb-6`}>{props.title}</h2>
      <ul className={`${styles.cardContainer} pl-4 pr-2`}>
        {
          props.data.map((item) => (
            <li key={item._id} className={`${styles.card} mb-8`} onClick={() => props.openModal(item)}>
              <img src={item.image} alt=""/>
              <span className={`${styles.price} mt-2 mb-1 text_type_digits-default`}>
                {item.price}
                <CurrencyIcon type="primary" />
              </span>
              <p className={`${styles.name} text_type_main-default`}>{item.name}</p>
            </li>
          ))
        }
      </ul>
    </>
  );
}

BurgerIngredientsItem.propTypes = { 
  data: PropTypes.arrayOf(PropTypes.shape({  
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

export default BurgerIngredientsItem;