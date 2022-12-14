import React from "react";
import styles from './ActivatedPageBlock.module.css';
import { BsFillCheckCircleFill } from "react-icons/bs";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const ActivatedPageBlock: React.FC = () => {
  return (
    <section className={styles.root}>
      <div className={styles.root__title}><BsFillCheckCircleFill/><h2>Аккаунт успешно активирован.</h2></div>
      <Link to={"/"}>
      <Button>Перейти к товарам</Button>
      </Link>
    </section>
  );
};

export default ActivatedPageBlock;