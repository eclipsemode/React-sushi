import React from "react";
import styles from './index.module.css';

type ApplyButtonProps = {
  children: React.ReactNode,
  clickEvent?: () => void
}

const ApplyButton: React.FC<ApplyButtonProps> = (props) => {
  return (
    <button className={styles.root} type="submit" onClick={() => props.clickEvent && props.clickEvent()}>
      <span>{props.children}</span>
    </button>
  );
};

export default ApplyButton;