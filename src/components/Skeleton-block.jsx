import React from 'react';
import ContentLoader from 'react-content-loader';

function SkeletonBlock() {
  return (
    <li className="content--item skeleton">
      <ContentLoader
        speed={2}
        width={320}
        height={480}
        viewBox="0 0 320 480"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <rect x="5" y="340" rx="10" ry="10" width="310" height="65" />
        <rect x="5" y="430" rx="10" ry="10" width="310" height="50" />
        <rect x="5" y="0" rx="10" ry="10" width="310" height="310" />
      </ContentLoader>
    </li>
  );
}

export default SkeletonBlock;
