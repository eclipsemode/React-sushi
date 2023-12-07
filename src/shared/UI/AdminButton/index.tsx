import React from 'react';
import styles from './index.module.scss'

interface IProps {
    text: string,
    clickEvent?: () => void
}

const AdminButton = ({text, clickEvent}: IProps) => {
    return (
        <button className={styles.root} onClick={clickEvent}>
            {text}
        </button>
    );
};

export default AdminButton;