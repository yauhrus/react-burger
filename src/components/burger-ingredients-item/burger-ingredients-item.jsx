import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.css';

function BurgerIngredientsItem(props) {
  const ingredients = useSelector(store => store.burger.constructorIngredients).filter(item => item._id === props.data._id);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: props.data
  });

  return (
    <li 
      key={props.data._id} 
      className={`${styles.card} mb-8`} 
      onClick={() => props.openModal(props.data)}
      ref={dragRef}
      >
        {
          ingredients.length > 0 && (
            <span className={`${styles.count} text_type_digits-default`}>{ingredients.length}</span>
          )
        }
        <img src={props.data.image} alt=""/>
        <span className={`${styles.price} mt-2 mb-1 text_type_digits-default`}>
          {props.data.price}
          <CurrencyIcon type="primary" />
        </span>
        <p className={`${styles.name} text_type_main-default`}>{props.data.name}</p>
    </li>
  );
}

BurgerIngredientsItem.propTypes = { 
  data: PropTypes.shape({  
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
  }).isRequired,
};

export default BurgerIngredientsItem;