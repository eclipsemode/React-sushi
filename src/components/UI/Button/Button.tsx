import React from "react";
import styles from './Button.module.css';

type Button = {
  children: React.ReactNode
}

const Button: React.FC<Button> = (props) => {
  return (
    <button className={styles.root}>
      <span>{props.children}</span>
    </button>
  );
};

export default Button;