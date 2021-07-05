import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import styles from './burger-ingredients.module.css';

function BurgerIngredients(props) {
  const tabs = [
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
  
  const [current, setCurrent] = React.useState(tabs[0].name);

  return (
    <section className={`${styles.root} mr-10`}>
      <h1 className={`${styles.title} text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
      <div style={{ display: 'flex' }} className={`mb-8`}>
        {
          tabs.map((item) => (
            <Tab 
              value={item.name} 
              active={current === item.name} 
              onClick={setCurrent} 
              key={item.name}
            >
              {item.title}
            </Tab>)
          )
        }
      </div>
      <div className={styles.ingredients}>
        { 
          tabs.map( item => (
              <BurgerIngredientsItem 
                type={item.name} 
                key={item.name} 
                title={item.title}
                data={props.ingredients.filter((el) => el.type === item.name )}
                openModal={props.openModal}
              />
            )
          )
        }
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = { 
  ingredients: PropTypes.arrayOf(PropTypes.shape({  
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

export default BurgerIngredients;