import { FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';

const modalRoot = document.getElementById("modals");

interface IModalOverlayProps {
  onClick: () => void
}

const ModalOverlay: FC<IModalOverlayProps> = ({ children, onClick }) => {
  if(modalRoot) {
    return ReactDOM.createPortal(
      (
        <div className={styles.root} onClick={onClick}>
            {children} 
        </div>
      ), 
      modalRoot
    );
  } else {
    return null;
  }
};

export default ModalOverlay;