import { SVGAttributes } from 'react';

type IconName = 'moon' | 'sun';

type IconProps = {
  name: IconName;
} & SVGAttributes<SVGSVGElement>;

export default function Icon({ name, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" {...props}>
      <use href={`/sprites.svg#icon-${name}`} />
    </svg>
  );
}
