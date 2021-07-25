import React from 'react';
import PropTypes from 'prop-types';
import { 
  ConstructorElement, 
  Button, 
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-constructor.module.css';
import { 
  ADD_INGREDIENT_TO_CONSTRUCTOR, 
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  getOrderNumber
} from '../../services/actions';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';

function BurgerConstructor(props) {
  const constructorIngredients = useSelector(store => store.burger.constructorIngredients);
  let total = useSelector(store => store.burger.constructorIngredients).reduce((accumulator, { price }) =>  { 
    return  accumulator + parseInt(price)
  }, 0);
  const dispatch = useDispatch();
  const burgerBun = useSelector(store => store.burger.constructorIngredients).filter(item => item.type === 'bun');

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if(item.type === 'bun') { 
        for(let i = 0; i < 2; i++) {
          if(burgerBun.length > 0) {
            let id = burgerBun[0]._id;  
            dispatch({
              type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
              id: id
            });
          }
          dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            draggedIngredient: item
          });
        }
      }
      else {
        dispatch({
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          draggedIngredient: item
        });
      }
    },
  });

  return (
    <section className={styles.root}>
      <div className={`${styles.container} `} ref={dropTarget}>
        {
          burgerBun.length > 0 && (
            <div className={`${styles.item} mb-4 pr-8`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={burgerBun[0].name}
                price={burgerBun[0].price}
                thumbnail={burgerBun[0].image}
              />
            </div>
          )
        }
        <div className={`${styles.scrollable} mb-4 pr-4`}>
          {
            constructorIngredients.map((item,index) => item.type !== 'bun' && (
                <BurgerConstructorItem item={item} key={index} index={index}/>
              )
            )
          }
        </div>
        {
          burgerBun.length > 0 && (
            <div className={`${styles.item} mb-4 pr-8`}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={burgerBun[0].name}
                price={burgerBun[0].price}
                thumbnail={burgerBun[0].image}
              />
            </div>
          )
        }
      </div>
      <div className={`${styles.total} mt-10 pr-8`}>
        <span className={`${styles.totalSum} mr-10 text_type_digits-medium`}>
          {total}
          <CurrencyIcon type="primary" />
        </span>
        <Button 
          type="primary" 
          size="large" 
          onClick={() => { 
            dispatch(getOrderNumber(constructorIngredients)); 
            props.openModal();
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
}

export default BurgerConstructor;