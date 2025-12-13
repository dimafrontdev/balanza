import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const IconTrash = ({ color = '#FB2C36', size = 20 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M8.33005 9.16309V14.1611"
        stroke={color}
        strokeWidth="1.66601"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.662 9.16309V14.1611"
        stroke={color}
        strokeWidth="1.66601"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.8271 4.99805V16.6601C15.8271 17.102 15.6515 17.5257 15.3391 17.8382C15.0267 18.1506 14.6029 18.3261 14.1611 18.3261H5.83102C5.38916 18.3261 4.96541 18.1506 4.65297 17.8382C4.34053 17.5257 4.16501 17.102 4.16501 16.6601V4.99805"
        stroke={color}
        strokeWidth="1.66601"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.49902 4.99805H17.4931"
        stroke={color}
        strokeWidth="1.66601"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66403 4.99803V3.33202C6.66403 2.89017 6.83956 2.46642 7.152 2.15398C7.46443 1.84154 7.88819 1.66602 8.33004 1.66602H11.6621C12.1039 1.66602 12.5277 1.84154 12.8401 2.15398C13.1525 2.46642 13.3281 2.89017 13.3281 3.33202V4.99803"
        stroke={color}
        strokeWidth="1.66601"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
