import React from "react";
import styles from "./ClearButton.module.css";

type ClearButtonProps = {
  children: React.ReactNode
  handleClick: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = (props) => {
  return (
    <button className={styles.root} onClick={() => props.handleClick()}>
      <span>{props.children}</span>
    </button>
  );
};

export default ClearButton;