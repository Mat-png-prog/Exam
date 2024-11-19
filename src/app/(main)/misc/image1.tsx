import React from 'react';

const Image1 = () => {
  return (
    <svg
      width="40vw"
      height="40vh"
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
     {/*   Bookshelf  */}
      <rect x="50" y="50" width="300" height="300" rx="10" fill="#F0E4CC" />
      <rect x="55" y="55" width="290" height="290" rx="10" fill="#FFFFFF" />
      
      {/* Books  */}
      <rect x="70" y="70" width="80" height="200" rx="5" fill="#8B9467" />
      <rect x="160" y="70" width="80" height="250" rx="5" fill="#6495ED" />
      <rect x="250" y="70" width="80" height="180" rx="5" fill="#DC143C" />
      
      {/* Lock and Key  */}
      <circle cx="200" cy="320" r="20" fill="#8B9467" />
      <path d="M200 340C200 350 190 360 180 360C170 360 160 350 160 340" stroke="#8B9467" strokeWidth="5" />
      
      {/*  Bookshelf details  */}
      <line x1="60" y1="320" x2="340" y2="320" stroke="#CCCCCC" strokeWidth="2" />
      <line x1="60" y1="280" x2="340" y2="280" stroke="#CCCCCC" strokeWidth="2" />
      <line x1="60" y1="240" x2="340" y2="240" stroke="#CCCCCC" strokeWidth="2" />
    </svg>
  );
};

export default Image1;