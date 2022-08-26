import React from "react";
import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className={styles.root}>
      <span>{props.children}</span>
    </button>
  );
};

export default Button;