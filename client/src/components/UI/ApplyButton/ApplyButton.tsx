import React from "react";
import styles from './ApplyButton.module.css';

type ApplyButtonProps = {
  children: React.ReactNode
}

const ApplyButton: React.FC<ApplyButtonProps> = (props) => {
  return (
    <button className={styles.root} type="submit">
      <span>{props.children}</span>
    </button>
  );
};

export default ApplyButton;