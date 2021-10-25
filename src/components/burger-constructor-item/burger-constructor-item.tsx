import { useRef, FC } from 'react';
import { 
  ConstructorElement, 
  DragIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { replaceItems } from '../../services/actions';
import { deleteIngredientFromConstructor } from '../../services/actions';
import styles from './burger-constructor-item.module.css';
import { TIngredient } from '../../services/types/data';

interface IBurgerConstructorItemProps {
  item: TIngredient;
  index: number;
}

const BurgerConstructorItem: FC<IBurgerConstructorItemProps> = ({ item, index}) => {
  const dispatch = useDispatch();

  const deleteIngredient = (item: TIngredient) => {
    dispatch(deleteIngredientFromConstructor(item._id))
  }; 

  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop({
    accept: 'constructorIngredient',
    hover: (hoverItem: TIngredient, monitor) => {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = hoverItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: any = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
 
      dispatch(replaceItems(dragIndex, hoverIndex));

      hoverItem.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorIngredient',
    item: () => {
      return { id: item._id, index: index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div 
      className={`${styles.item} mb-4`} 
      style={{ opacity }}
      ref={ref}
      draggable
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => deleteIngredient(item)}
      />
    </div>
  );
}

export default BurgerConstructorItem;