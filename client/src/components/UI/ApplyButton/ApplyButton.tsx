import React from "react";
import styles from './ApplyButton.module.css';

type ApplyButton = {
  children: React.ReactNode
}

const ApplyButton: React.FC<ApplyButton> = (props) => {
  return (
    <button className={styles.root}>
      <span>{props.children}</span>
    </button>
  );
};

export default ApplyButton;