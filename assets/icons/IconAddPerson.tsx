import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export const IconAddPerson = ({ size = 24, color = 'white' }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.9935 20.9918V18.9926C15.9935 17.9321 15.5722 16.9151 14.8224 16.1653C14.0725 15.4154 13.0555 14.9941 11.9951 14.9941H5.99745C4.937 14.9941 3.91998 15.4154 3.17013 16.1653C2.42028 16.9151 1.99902 17.9321 1.99902 18.9926V20.9918"
        stroke={color}
        strokeWidth="1.99921"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.99647 10.9959C11.2047 10.9959 12.9949 9.20571 12.9949 6.99745C12.9949 4.78918 11.2047 2.99902 8.99647 2.99902C6.7882 2.99902 4.99805 4.78918 4.99805 6.99745C4.99805 9.20571 6.7882 10.9959 8.99647 10.9959Z"
        stroke={color}
        strokeWidth="1.99921"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.9927 7.99707V13.9947"
        stroke={color}
        strokeWidth="1.99921"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.9913 10.9956H15.9937"
        stroke={color}
        strokeWidth="1.99921"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
