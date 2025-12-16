import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const IconTrack = ({ color = '#4F39F6', size = 14 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M9.33331 4.08334H12.8333V7.58334"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.8334 4.08334L7.87502 9.04168L4.95835 6.12501L1.16669 9.91668"
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
