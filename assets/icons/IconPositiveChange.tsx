import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { IconProps } from './types';

export const IconPositiveChange = ({ size = 10 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <G clip-path="url(#clip0_193_205)">
        <Path
          d="M6.66046 2.91406H9.15813V5.41173"
          stroke="#7BF1A8"
          strokeWidth="0.832555"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.15814 2.91406L5.61977 6.45242L3.53839 4.37103L0.832581 7.07684"
          stroke="#7BF1A8"
          strokeWidth="0.832555"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_193_205">
          <Rect width="9.99067" height="9.99067" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
