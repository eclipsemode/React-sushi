import React from "react";
import styles from "./Input.module.css";
import { BsArrowRightShort } from "react-icons/bs";

const Input: React.FC = () => {
  return (
    <form className={styles.root}>
      <input type="email" placeholder="Введите email..."/>
      <BsArrowRightShort />
    </form>
  );
};

export default Input;