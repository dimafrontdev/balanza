import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
import { IconProps } from './types';

export const IconCategory = ({ color = '#615FFF', size = 20 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip0_45_1109)">
        <Path
          d="M10.4842 2.15416C10.1718 1.8417 9.74815 1.66611 9.30633 1.66602H3.33202C2.89017 1.66602 2.46642 1.84154 2.15398 2.15398C1.84154 2.46642 1.66602 2.89017 1.66602 3.33202V9.30633C1.66611 9.74815 1.8417 10.1718 2.15416 10.4842L9.40463 17.7347C9.78324 18.1109 10.2953 18.3221 10.8291 18.3221C11.3628 18.3221 11.8749 18.1109 12.2535 17.7347L17.7347 12.2535C18.1109 11.8749 18.3221 11.3628 18.3221 10.8291C18.3221 10.2953 18.1109 9.78324 17.7347 9.40463L10.4842 2.15416Z"
          stroke={color}
          strokeWidth="1.66601"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.24753 6.66406C6.47755 6.66406 6.66403 6.47758 6.66403 6.24756C6.66403 6.01753 6.47755 5.83105 6.24753 5.83105C6.0175 5.83105 5.83102 6.01753 5.83102 6.24756C5.83102 6.47758 6.0175 6.66406 6.24753 6.66406Z"
          fill={color}
          stroke={color}
          strokeWidth="1.66601"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_45_1109">
          <Rect width="19.9921" height="19.9921" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
