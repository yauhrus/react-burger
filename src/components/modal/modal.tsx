import { FC } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

interface IModalProps {
  header?: string
  onClick: () => void
}

const Modal: FC<IModalProps> = ({ header, children, onClick }) => {
  return (
    <ModalOverlay onClick={onClick}>
      <div className={`${styles.root} pt-10 pr-10 pb-15 pl-10`} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          { header && <h2 className="text_type_main-large">{header}</h2>}
          <button className={styles.closeButton} onClick={onClick}>
            <CloseIcon type="primary" />
          </button>
        </div>
          {children}
      </div>
    </ModalOverlay>
  );
};

export default Modal;