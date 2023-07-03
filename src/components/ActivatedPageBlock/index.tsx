import React from "react";
import { Button, Result } from "antd";
import {useRouter} from "next/navigation";
import MenuPath from "@shared/utils/menuPath";

const ActivatedPageBlock: React.FC = () => {
  const [ timer, setTimer ] = React.useState<number>(5);
  const router = useRouter();

  React.useEffect(() => {
    setInterval(() => {
      setTimer(prevState => prevState - 1);
    }, 1000)

  }, []);

  React.useEffect(() => {
    if (timer === 0) {
      router.push(MenuPath.LOGIN);
    }
  }, [timer, router]);

  return (
    <Result
      status="success"
      title="Аккаунт успешно активирован."
      subTitle={`Автоматическая переадресация через: ${timer} секунд`}
      extra={[
        <Button onClick={() => router.push(MenuPath.LOGIN)} type="primary" key="entry">Войти</Button>
      ]}
    />
  );
};

export default ActivatedPageBlock;