import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

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
    <Result
      status="success"
      title="Аккаунт успешно активирован."
      subTitle={`Автоматическая переадресация через: ${timer} секунд`}
      extra={[
        <Button onClick={() => navigate('/login')} type="primary" key="entry">Войти</Button>
      ]}
    />
  );
};

export default ActivatedPageBlock;