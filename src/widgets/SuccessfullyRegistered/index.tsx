import React from 'react';
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const SuccessfullyRegistered: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      title="Вам отправлено письмо на почтовый ящик для активации аккаунта"
      extra={
        <Button onClick={() => navigate('/')} type="primary" key="home">
          На главную
        </Button>
      }
    />
  );
};

export default SuccessfullyRegistered;