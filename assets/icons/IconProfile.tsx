import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const IconProfile = ({ color = '#615FFF', size = 20 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M15.8271 17.4931V15.8271C15.8271 14.9434 15.476 14.0959 14.8511 13.471C14.2263 12.8462 13.3788 12.4951 12.4951 12.4951H7.49703C6.61332 12.4951 5.76581 12.8462 5.14093 13.471C4.51606 14.0959 4.16501 14.9434 4.16501 15.8271V17.4931"
        stroke={color}
        strokeWidth="1.66601"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99605 9.16306C11.8363 9.16306 13.3281 7.67126 13.3281 5.83104C13.3281 3.99082 11.8363 2.49902 9.99605 2.49902C8.15583 2.49902 6.66403 3.99082 6.66403 5.83104C6.66403 7.67126 8.15583 9.16306 9.99605 9.16306Z"
        stroke={color}
        strokeWidth="1.66601"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
