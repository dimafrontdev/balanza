import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const IconDollar = ({ color = '#615FFF', size = 20 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 0.833374V19.1667"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.75 4.16663H8.125C7.2962 4.16663 6.50134 4.49579 5.91529 5.08184C5.32924 5.66789 5 6.46275 5 7.29163C5 8.1205 5.32924 8.91536 5.91529 9.50141C6.50134 10.0875 7.2962 10.4166 8.125 10.4166H11.875C12.7038 10.4166 13.4987 10.7458 14.0847 11.3318C14.6708 11.9179 15 12.7127 15 13.5416C15 14.3705 14.6708 15.1654 14.0847 15.7514C13.4987 16.3375 12.7038 16.6666 11.875 16.6666H5"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
