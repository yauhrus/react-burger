import { FC } from 'react';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-item.module.css';
import dataConverter from '../../utils/dataConverter';
import { TOrder, TIngredient } from '../../services/types/data';
import { RootState } from '../../services/types';

interface IOrderItemProps {
  order: TOrder;
  showStatus: boolean;
}

const OrderItem: FC<IOrderItemProps> = ({ order, showStatus = false }) => {
  const ingredients = useSelector((store: RootState) => store.burger.ingredients);
  let icons: Array<string> = [];
  let totalValue = 0;

  const showMore = order.ingredients.length > 6;
  const extraValue = order.ingredients.length - 6;

  order.ingredients.slice(0, 6).forEach(ingredientItem => {
    let ingredient = ingredients.find((component: TIngredient) => component._id === ingredientItem);

    if (!ingredient) {
      return;
    }

    totalValue += ingredient.price;
    icons.push(ingredient.image_mobile);
  });

  const statusValue = (status: 'created' | 'pending' | 'done') => {
    const style: any = {};
    let text = '';

    switch (status) {
      case 'created':
        text = 'Создан';
        break;
      case 'pending':
        text = 'Готовится';
        break;
      case 'done':
        text = 'Выполнен';
        style.color = '#00CCCC';
        break;
      default:
    }

    return (
      <p className={`${styles.status} text text_type_main-default mb-6`} style={style}>{text}</p>
    );
  }

  return (
    <div className={`${styles.root} mb-4  p-6`}>
      <div className={`${styles.header} mb-6`}>
        <span className={`${styles.number} text text_type_main-default`}>#{order.number}</span>
        <span
          className={'text text_type_main-default text_color_inactive'}>{dataConverter(new Date(order.createdAt))}</span>
      </div>
      <p className={`${styles.name} text text_type_main-medium ${showStatus ? 'mb-2' : 'mb-6'}`}>{order.name}</p>
      {showStatus && statusValue(order.status)}
      <div className={styles.container}>
        <div className={styles.icons}>
        {icons.map((src, index) => (
            <img
              className={`${styles.icon} ${index === 5 && showMore && styles.iconMore}`}
              src={src}
              key={index}
              style={{zIndex: 10 - index}}
              alt=""
            />
          ))}
          {showMore && 
            <div className={`text text_type_main-default ${styles.moreItems}`}>+{extraValue}</div>
          }
        </div>
        <div className={styles.total}>
          <p className={`${styles.totalValue} text text_type_digits-default mr-2`}>{totalValue}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}

export default OrderItem;