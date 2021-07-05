import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal(props) {
    return (
      <ModalOverlay onClick={props.onClick}>
        <div className={`${styles.root} pt-10 pr-10 pb-15 pl-10`} onClick={e => e.stopPropagation()}>
          <div className={styles.header}>
            { props.header && <h2 className="text_type_main-large">{props.header}</h2>}
            <button className={styles.closeButton} onClick={props.onClick}>
              <CloseIcon type="primary" />
            </button>
          </div>
            {props.children}
        </div>
      </ModalOverlay>
  );
};

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Modal;