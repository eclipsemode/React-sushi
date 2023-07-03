import React from "react";
import styles from './index.module.scss'

interface IDoubleButton {
  leftBtnCallback: () => void;
  rightBtnCallback: () => void;
  leftBtnText: string;
  rightBtnText: string;
}

const DoubleButton: React.FC<IDoubleButton> = (props) => {
  return (
    <div className={styles.root}>
      <button className={styles.root__left}
              onClick={() => props.leftBtnCallback()}><span>{props.leftBtnText}</span>
      </button>
      <button className={styles.root__right}
              onClick={() => props.rightBtnCallback()}><span>{props.rightBtnText}</span>
      </button>
    </div>
  );
};

export default DoubleButton;