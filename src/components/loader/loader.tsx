import { CSSProperties } from 'react';

import './loader.css';

export type LoaderProps = {
  mainColor: string;
  secondaryColor: string;
  speed: number;
  still: boolean;
  thickness: number;
}

const ANIMATION_DURATION = 140;
const LOADER_ELEMENT_COORDS_COUNT = 5;
const circleSizeCoefficients = {
  default: 2.5,
  active: 3.5
};

const coords = [
  { x: 3, y: 48 },
  { x: 18, y: 33 },
  { x: 18, y: 48 },
  { x: 18, y: 63 },
  { x: 33, y: 48 },

  { x: 33, y: 18 },
  { x: 33, y: 33 },
  { x: 33, y: 63 },
  { x: 33, y: 78 },
  { x: 48, y: 3 },
  { x: 48, y: 18 },
  { x: 48, y: 33 },
  { x: 48, y: 48 },
  { x: 48, y: 63 },
  { x: 48, y: 78 },
  { x: 48, y: 93 },
  { x: 63, y: 18 },
  { x: 63, y: 33 },
  { x: 63, y: 48 },
  { x: 63, y: 63 },
  { x: 63, y: 78 },
  { x: 78, y: 33 },
  { x: 78, y: 48 },
  { x: 78, y: 63 },
  { x: 93, y: 48 },
];

export default function Loader({
  mainColor,
  secondaryColor,
  speed,
  still,
  thickness
}: LoaderProps): JSX.Element {
  const diamondStyle: CSSProperties = {
    animation: `spinners-react-diamond ${ANIMATION_DURATION / speed}s steps(2, end) infinite`,
  };

  if (still) {
    diamondStyle.animation = 'none';
  }

  return (
    <div style={{ width: '30%', margin: 'auto' }} data-testid="Loader">
      <svg fill={mainColor} viewBox="0 0 96 96">
        {coords.map((c) => (
          <circle key={`${c.x}-${c.y}`} cx={c.x} cy={c.y} fill={secondaryColor} r={circleSizeCoefficients.default * (thickness / 100)} />
        ))}
        <g style={diamondStyle}>
          {coords.slice(0, LOADER_ELEMENT_COORDS_COUNT).map((c) => (
            <circle key={`h-${c.x}-${c.y}`} cx={c.x} cy={c.y} r={circleSizeCoefficients.active * (thickness / 100)} />
          ))}
        </g>
      </svg>
    </div>
  );
}
