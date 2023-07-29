'use client'
import React from 'react';
import {Result} from "antd";
import SimpleButton from "@shared/UI/SimpleButton";
import RouterPath from "@shared/utils/menuPath";
import styles from './NotFoundBlock.module.scss';
import {useRouter} from "next/navigation";

const NotFoundBlock: React.FC = () => {
    const router = useRouter();
    return (
        <Result
            className={styles.root}
            status="404"
            title={<span className={styles.root__title}>404</span>}
            subTitle={<span className={styles.root__subtitle}>Извините, данная страница не существует.</span>}
            extra={<SimpleButton clickEvent={() => router.push(RouterPath.HOME)}>На главную</SimpleButton>}
        />
    );
};

export default NotFoundBlock;
