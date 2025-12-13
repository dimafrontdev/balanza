import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { IconProps } from './types';

export const IconNegativeChange = ({ size = 10 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <G clip-path="url(#clip0_73_827)">
        <Path
          d="M6.66366 7.08017H9.16253V4.5813"
          stroke="#FFA2A2"
          strokeWidth="0.832958"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.16253 7.08007L5.62246 3.54L3.54007 5.6224L0.832958 2.91528"
          stroke="#FFA2A2"
          strokeWidth="0.832958"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_73_827">
          <Rect width="9.99549" height="9.99549" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
