import React from 'react';
import PropTypes from 'prop-types';
import { 
  ConstructorElement, 
  DragIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import {  
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  replaceItems
} from '../../services/actions';
import styles from './burger-constructor-item.module.css';

function BurgerConstructorItem(props) {
  const dispatch = useDispatch();

  const deleteIngredientFromConstructor = (e, item) => {
    e.preventDefault();

    dispatch({
      type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
      id: item._id
    })
  }; 

  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: 'constructorIngredient',
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
 
      dispatch(replaceItems(dragIndex, hoverIndex));

      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorIngredient',
    item: () => {
      return { id: props.item._id, index: props.index };
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
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image}
        handleClose={(e) => deleteIngredientFromConstructor(e, props.item)}
      />
    </div>
  );
}

BurgerConstructorItem.propTypes = { 
  item: PropTypes.shape({  
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
  index: PropTypes.number.isRequired
};

export default BurgerConstructorItem;