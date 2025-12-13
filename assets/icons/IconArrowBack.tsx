import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const IconArrowBack = ({ color = '#364153', size = 20 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M9.9955 15.826L4.16479 9.99525L9.9955 4.16455"
        stroke={color}
        strokeWidth="1.66592"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.8262 9.99561H4.16479"
        stroke={color}
        strokeWidth="1.66592"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
