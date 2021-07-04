import React from 'react';
import styles from './order-details.module.css';
import doneIcon from '../../images/done.svg';

function OrderDetails() {
  return (
    <section className={`${styles.root}`}>
      <span className={`${styles.title} text_type_digits-large mt-4 mb-8`}>034536</span>
      <p className={`${styles.subTitle} text_type_main-medium mb-15`}>идентификатор заказа</p>
      <img src={doneIcon} alt="" className="mb-15"/>
      <p className={`${styles.orderInfo} text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
      <p className={`${styles.orderInfo} ${styles.textColor} text_type_main-default mb-2`}>Дождитесь готовности на орбитальной станции</p>
    </section>
  )
};

export default OrderDetails;