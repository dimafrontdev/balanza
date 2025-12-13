import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const IconLogout = ({ color = '#615FFF', size = 20 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M13.3281 14.1611L17.4931 9.99608L13.3281 5.83105"
        stroke={color}
        strokeWidth="1.66601"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.4931 9.99609H7.49704"
        stroke={color}
        strokeWidth="1.66601"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.49705 17.4931H4.16503C3.72318 17.4931 3.29942 17.3176 2.98699 17.0051C2.67455 16.6927 2.49902 16.2689 2.49902 15.8271V4.16503C2.49902 3.72318 2.67455 3.29942 2.98699 2.98699C3.29942 2.67455 3.72318 2.49902 4.16503 2.49902H7.49705"
        stroke={color}
        strokeWidth="1.66601"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
