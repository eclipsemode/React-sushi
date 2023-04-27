import React from "react";
import styles from './index.module.scss'

type AlertType = 'error' | 'success' | 'warning'

interface IAlertProps {
  children: React.ReactNode;
  type: AlertType;
}

const Alert: React.FC<IAlertProps> = (props) => {
  return (
    <div className={styles.root + ' ' + (props.type === 'error' ? styles.root__error : props.type === 'warning' ? styles.root__warning : styles.root__success)}>
      {props.children}
    </div>
  );
};

export default Alert;