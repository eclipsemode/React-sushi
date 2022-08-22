import React from 'react';
import styles from './NotFoundBlock.module.css';
import ContentLoader from 'react-content-loader';

const NotFoundBlockLoader: React.FC = () => (
    <div className={styles.root}>
        <ContentLoader
            speed={4}
            width={500}
            height={140}
            viewBox="0 0 500 140"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="165" y="451" rx="4" ry="4" width="230" height="53" />
            <rect x="610" y="313" rx="0" ry="0" width="210" height="45" />
            <rect x="220" y="0" rx="4" ry="4" width="30" height="66" />
            <rect x="19" y="71" rx="4" ry="4" width="463" height="66" />
        </ContentLoader>
    </div>
);

export default NotFoundBlockLoader;
