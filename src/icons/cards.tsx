import Svg, { Path, SvgProps } from 'react-native-svg';

const Cards = (props: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M2 8.50494H22"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 16.5049H8"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 16.5049H14.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.44 3.50494H17.55C21.11 3.50494 22 4.38494 22 7.89494V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89494C2 4.38494 2.89 3.50494 6.44 3.50494Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Cards;
