import Svg, { Circle } from 'react-native-svg';
import { IconProps } from './types';

export const IconDotsVertical = ({ color = '#6B7280', size = 20 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx="10" cy="3.33333" r="1.66667" fill={color} />
      <Circle cx="10" cy="10" r="1.66667" fill={color} />
      <Circle cx="10" cy="16.6667" r="1.66667" fill={color} />
    </Svg>
  );
};
