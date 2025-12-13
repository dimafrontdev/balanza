import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { IconProps } from './types';

export const IconGlobe = ({ color = '#615FFF', size = 20 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_45_1123)">
        <Path
          d="M9.99606 18.3261C14.5966 18.3261 18.3261 14.5966 18.3261 9.99606C18.3261 5.3955 14.5966 1.66602 9.99606 1.66602C5.3955 1.66602 1.66602 5.3955 1.66602 9.99606C1.66602 14.5966 5.3955 18.3261 9.99606 18.3261Z"
          stroke={color}
          strokeWidth="1.66601"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.99605 1.66602C7.85709 3.91192 6.66403 6.89457 6.66403 9.99606C6.66403 13.0976 7.85709 16.0802 9.99605 18.3261C12.135 16.0802 13.3281 13.0976 13.3281 9.99606C13.3281 6.89457 12.135 3.91192 9.99605 1.66602Z"
          stroke={color}
          strokeWidth="1.66601"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1.66602 9.99609H18.3261"
          stroke={color}
          strokeWidth="1.66601"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_45_1123">
          <Rect width="19.9921" height="19.9921" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
