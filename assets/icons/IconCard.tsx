import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const IconCard = ({ color = '#4A5565', size = 24 }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.9879 4.99707H3.99757C2.89367 4.99707 1.99878 5.89196 1.99878 6.99586V16.9898C1.99878 18.0937 2.89367 18.9886 3.99757 18.9886H19.9879C21.0918 18.9886 21.9867 18.0937 21.9867 16.9898V6.99586C21.9867 5.89196 21.0918 4.99707 19.9879 4.99707Z"
        stroke={color}
        strokeWidth="1.99879"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.99878 9.99414H21.9867"
        stroke={color}
        strokeWidth="1.99879"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
