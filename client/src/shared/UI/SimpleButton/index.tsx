import React from "react";
import styles from './index.module.css';

interface ISimpleButton {
  children: React.ReactNode,
  clickEvent: () => void;
}

const SimpleButton: React.FC<ISimpleButton> = (props) => {
  return (
    <button className={styles.root} onClick={props.clickEvent}>
      {
        props.children
      }
    </button>
  );
};

export default SimpleButton;