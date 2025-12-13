import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const IconAnalytics = ({ color = '#4A5565', size = 24 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.99817 2.99805V18.9884C2.99817 19.5185 3.20875 20.0269 3.5836 20.4017C3.95845 20.7766 4.46685 20.9871 4.99696 20.9871H20.9873"
        stroke={color}
        strokeWidth="1.99879"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.9891 16.9898V8.99463"
        stroke={color}
        strokeWidth="1.99879"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.9921 16.9898V4.99707"
        stroke={color}
        strokeWidth="1.99879"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.99518 16.9899V13.9917"
        stroke={color}
        strokeWidth="1.99879"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
