import React from "react";
import ContentLoader from "react-content-loader";

const CategoriesSkeleton: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={206}
      height={70}
      viewBox="0 0 206 70"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      >
      <rect x="0" y="0" rx="40" ry="40" width="206" height="70" />
    </ContentLoader>
  );
};

export default CategoriesSkeleton;