import React from 'react';

export const FoodSoulScript = () => (
  <>
    <script
      dangerouslySetInnerHTML={{
        __html:
          'window.fsPromoterConfig = {"zone": "ru", "language": "ru", "chain_id": 5340};',
      }}
    />
    <script src="https://fs.me/pr/init.js" async />
  </>
);