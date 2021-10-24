import { FC } from 'react';
import { 
  ConstructorElement, 
  Button, 
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from "react-dnd";
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/hooks';
import { useHistory } from 'react-router-dom';
import styles from './burger-constructor.module.css';
import { getOrderNumber } from '../../services/actions';
import { deleteIngredientFromConstructor, addIngredientToConstructorAction } from '../../services/actions';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { RootState } from '../../services/types';
import { TIngredient } from '../../services/types/data';

interface IBurgerConstructorProps {
  openModal: () => void
}

const BurgerConstructor: FC<IBurgerConstructorProps> = ({ openModal }) => {
  const constructorIngredients = useSelector((store: RootState) => store.burger.constructorIngredients);
  let total = useSelector((store: RootState) => store.burger.constructorIngredients).reduce((accumulator: number, { price }: any) =>  { 
    return  accumulator + parseInt(price)
  }, 0);
  const dispatch = useDispatch();
  const burgerBun = useSelector((store: RootState) => store.burger.constructorIngredients).filter((item: TIngredient) => item.type === 'bun');
  const { isAuth } = useSelector((store: RootState) => store.user);
  const history = useHistory();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      if(item.type === 'bun') { 
        for(let i = 0; i < 2; i++) {
          if(burgerBun.length > 0) {
            let id = burgerBun[0]._id;  
            dispatch(deleteIngredientFromConstructor(id));
          }
          dispatch(addIngredientToConstructorAction(item));
        }
      }
      else {
        dispatch(addIngredientToConstructorAction(item));
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
                text={burgerBun[0].name + ' (верх)'}
                price={burgerBun[0].price}
                thumbnail={burgerBun[0].image}
              />
            </div>
          )
        }
        <div className={`${styles.scrollable} mb-4 pr-4`}>
          {
            constructorIngredients.map((item: TIngredient, index: number) => item.type !== 'bun' && (
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
                text={burgerBun[0].name + ' (низ)'}
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
            if(burgerBun && constructorIngredients.length > 2) {
              if (!isAuth) {
                history.push('/login');
                return;
              }

              dispatch(getOrderNumber(constructorIngredients)); 
              openModal();
            }
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;