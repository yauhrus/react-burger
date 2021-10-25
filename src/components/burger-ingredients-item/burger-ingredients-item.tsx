import { FC } from 'react';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link } from 'react-router-dom';
import styles from './burger-ingredients-item.module.css';
import { RootState } from '../../services/types';
import { TIngredient } from '../../services/types/data';

interface IBurgerIngredientsItemProps {
  data: TIngredient;
}

const BurgerIngredientsItem: FC<IBurgerIngredientsItemProps> = ({ data }) => {
  const location = useLocation();
  const ingredients = useSelector((store: RootState) => store.burger.constructorIngredients).filter((item: TIngredient) => item._id === data._id);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: data
  });

  return (
    <li 
      key={data._id} 
      className="mb-8" 
      ref={dragRef}
      >
        <Link 
          to={{
            pathname: `/ingredients/${data._id}`,
            state: { background: location }
          }}
          className={styles.link}
        >
          {
            ingredients.length > 0 && (
              <span className={`${styles.count} text_type_digits-default`}>{ingredients.length}</span>
            )
          }
          <img src={data.image} alt=""/>
          <span className={`${styles.price} mt-2 mb-1 text_type_digits-default`}>
            {data.price}
            <CurrencyIcon type="primary" />
          </span>
          <p className={`${styles.name} text_type_main-default`}>{data.name}</p>
        </Link>
    </li>
  );
}

export default BurgerIngredientsItem;