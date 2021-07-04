import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
const modalRoot = document.getElementById("modals");

function ModalOverlay(props) {
    return ReactDOM.createPortal(
        (
          <div className={styles.root} onClick={props.onClick}>
              {props.children} 
          </div>
        ), 
        modalRoot
    );
};

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
}

export default ModalOverlay;