import React from 'react';
import { Button, Result } from "antd";
import {useRouter} from "next/navigation";
import MenuPath from "@shared/utils/menuPath";

const SuccessfullyRegistered: React.FC = () => {
  const router = useRouter();
  return (
    <Result
      title="Вам отправлено письмо на почтовый ящик для активации аккаунта"
      extra={
        <Button onClick={() => router.push(MenuPath.HOME)} type="primary" key="home">
          На главную
        </Button>
      }
    />
  );
};

export default SuccessfullyRegistered;