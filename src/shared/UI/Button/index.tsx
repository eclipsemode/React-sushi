import React from "react";
import styles from './index.module.css';

type ButtonProps = {
  children: React.ReactNode,
  clickEvent?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className={styles.root} onClick={props.clickEvent}>
      <span>{props.children}</span>
    </button>
  );
};

export default Button;