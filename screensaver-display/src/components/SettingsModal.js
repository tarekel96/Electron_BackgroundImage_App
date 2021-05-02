import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './modal.module.css';

const SettingsModal = props => {
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className={styles['modal']} onClick={props.onClose}>
        <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
          <div className={styles['modal-header']}>
            <h4 className={styles['modal-title']}>{props.title}</h4>
          </div>
          <div className={styles['modal-body']}>{props.children}</div>
          <div className={styles['modal-footer']}>
            <button onClick={props.onClose} className='button'>
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root')
  );
};

export default SettingsModal;