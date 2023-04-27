import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
    <ContentLoader
      speed={4}
      width={306}
      height={386}
      viewBox="0 0 306 386"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      title="Загрузка..."
      {...props}
    >
        <rect x="165" y="451" rx="4" ry="4" width="230" height="53" />
        <rect x="610" y="313" rx="0" ry="0" width="210" height="45" />
        <rect x="0" y="0" rx="12" ry="12" width="306" height="386" />
    </ContentLoader>
);

export default Skeleton;
