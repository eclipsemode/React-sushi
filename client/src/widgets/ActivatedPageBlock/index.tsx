import React from "react";
import styles from './index.module.css';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Button } from "shared/UI";
import { Link, useNavigate } from "react-router-dom";

const ActivatedPageBlock: React.FC = () => {
  const [ timer, setTimer ] = React.useState<number>(5);
  const navigate = useNavigate();

  React.useEffect(() => {
    setInterval(() => {
      setTimer(prevState => prevState - 1);
    }, 1000)

  }, []);

  React.useEffect(() => {
    if (timer === 0) {
      navigate('/login');
    }
  }, [timer, navigate]);

  return (
    <section className={styles.root}>
      <div className={styles.root__title}><BsFillCheckCircleFill/><h2>Аккаунт успешно активирован.</h2></div>
      <Link to={"/login"}>
      <Button>Войти в аккаунт</Button>
      </Link>
      <h3>Автоматическая переадресация через: {timer} секунд</h3>
    </section>
  );
};

export default ActivatedPageBlock;