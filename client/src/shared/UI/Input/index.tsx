import React from "react";
import styles from "./index.module.css";
import { ArrowRightOutlined } from "@ant-design/icons";

const Input: React.FC = () => {
  return (
    <form className={styles.root}>
      <input type="email" placeholder="Введите email..."/>
      <ArrowRightOutlined />
    </form>
  );
};

export default Input;