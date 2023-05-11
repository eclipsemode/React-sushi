import React from 'react';
import {Result} from "antd";
import SimpleButton from "../../shared/UI/SimpleButton";
import {useNavigate} from "react-router-dom";
import RouterPath from "../../app/utils/menuPath";
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Result
            className={styles.root}
            status="404"
            title={<span className={styles.root__title}>404</span>}
            subTitle={<span className={styles.root__subtitle}>Извините, данная страница не существует.</span>}
            extra={<SimpleButton clickEvent={() => navigate(RouterPath.HOME)}>На главную</SimpleButton>}
        />
    );
};

export default NotFoundBlock;
