import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const IconGroup = ({ color = '#4A5565', size = 24 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.9903 20.9871V18.9883C15.9903 17.9281 15.5691 16.9113 14.8194 16.1616C14.0697 15.4119 13.0529 14.9907 11.9927 14.9907H5.99636C4.93613 14.9907 3.91933 15.4119 3.16964 16.1616C2.41995 16.9113 1.99878 17.9281 1.99878 18.9883V20.9871"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.9903 3.12598C16.8475 3.34821 17.6067 3.8488 18.1487 4.54918C18.6906 5.24955 18.9847 6.11006 18.9847 6.99563C18.9847 7.88121 18.6906 8.74171 18.1487 9.44209C17.6067 10.1425 16.8475 10.6431 15.9903 10.8653"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.9866 20.9871V18.9883C21.986 18.1025 21.6912 17.2421 21.1485 16.5421C20.6059 15.842 19.8461 15.342 18.9885 15.1206"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.99453 10.9932C11.2023 10.9932 12.9921 9.20343 12.9921 6.99562C12.9921 4.78782 11.2023 2.99805 8.99453 2.99805C6.78672 2.99805 4.99695 4.78782 4.99695 6.99562C4.99695 9.20343 6.78672 10.9932 8.99453 10.9932Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
