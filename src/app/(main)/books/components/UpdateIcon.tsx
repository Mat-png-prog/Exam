import React from 'react';

interface UpdateIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const UpdateIcon: React.FC<UpdateIconProps> = ({
  width = 64,
  height = 64,
  fill = "black"
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2V6L8 3L12 0V4C16.4183 4 20 7.58172 20 12H16C16 8.68629 13.3137 6 10 6V10L6 7L10 4V8C14.4183 8 18 11.5817 18 16H14C14 12.6863 11.3137 10 8 10V14L4 11L8 8V12C8 13.1046 8.89543 14 10 14H12V2Z"
      fill={fill}
    />
  </svg>
);

export default UpdateIcon;
