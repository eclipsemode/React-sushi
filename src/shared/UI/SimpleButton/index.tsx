import React from "react";
import styles from './index.module.css';

interface ISimpleButton {
  children: string,
  clickEvent?: () => void;
  type: React.HTMLInputTypeAttribute;
}

const SimpleButton: React.FC<ISimpleButton> = (props) => {
  return (
    <input type={props.type} className={styles.root} onClick={props.clickEvent} defaultValue={props.children} />
  );
};

export default SimpleButton;