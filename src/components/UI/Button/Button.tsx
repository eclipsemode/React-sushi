import React from "react";
import styles from './Button.module.css';

type Button = {
  children: React.ReactNode
}

const ApplyButton: React.FC<Button> = (props) => {
  return (
    <button className={styles.root}>
      <span>{props.children}</span>
    </button>
  );
};

export default ApplyButton;