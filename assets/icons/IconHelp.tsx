import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { IconProps } from './types';

export const IconHelp = ({ color = '#615FFF', size = 20 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_45_1141)">
        <Path
          d="M9.99606 18.3261C14.5966 18.3261 18.3261 14.5966 18.3261 9.99606C18.3261 5.3955 14.5966 1.66602 9.99606 1.66602C5.3955 1.66602 1.66602 5.3955 1.66602 9.99606C1.66602 14.5966 5.3955 18.3261 9.99606 18.3261Z"
          stroke={color}
          strokeWidth="1.66601"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.57202 7.49701C7.76786 6.94028 8.15442 6.47084 8.66322 6.17181C9.17202 5.87278 9.77023 5.76347 10.3519 5.86325C10.9336 5.96302 11.4612 6.26543 11.8412 6.71692C12.2213 7.16841 12.4293 7.73985 12.4284 8.33001C12.4284 9.99602 9.92942 10.829 9.92942 10.829"
          stroke={color}
          strokeWidth="1.66601"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.99606 14.1611H10.0044"
          stroke={color}
          strokeWidth="1.66601"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_45_1141">
          <Rect width="19.9921" height="19.9921" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
