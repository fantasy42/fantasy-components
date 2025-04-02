import {ChevronRightIcon} from '@radix-ui/react-icons';
import * as React from 'react';

import {Link} from '~/components/primitives/link';

import s from './home.module.css';

const titleText = 'Beautiful Components For Your Website';

export default function Page() {
  return (
    <div className={s.root}>
      <div className={s.light} data-light-left="" aria-hidden />
      <div className={s.light} data-light-right="" aria-hidden />
      <h1 className={s.title}>
        <span className="sr-only">{titleText}</span>
        <span aria-hidden>
          {titleText.split(' ').map((word, index) => (
            <React.Fragment key={word}>
              <AnimatedComponent className={s.word} delay={`${index * 0.15}s`}>
                {word}
              </AnimatedComponent>{' '}
            </React.Fragment>
          ))}
        </span>
      </h1>
      <AnimatedComponent className={s.description} delay="0.75s" as="h2">
        Open source, created with modern tools and optimized for good
        performance
      </AnimatedComponent>
      <AnimatedComponent className={s.row} delay="0.9s">
        <Chip color="blue">Portfolio</Chip>
        <Chip color="orange">Blog</Chip>
        <Chip color="white">Personal</Chip>
      </AnimatedComponent>
      <AnimatedComponent delay="1s">
        <Link className={s.link} href="/components">
          View Components
          <ChevronRightIcon aria-hidden />
        </Link>
      </AnimatedComponent>
    </div>
  );
}

interface AnimatedCompProps extends React.ComponentProps<'div'> {
  delay?: string;
  as?: React.ElementType;
}
function AnimatedComponent(props: AnimatedCompProps) {
  const {
    delay = '0s',
    as: Component = 'div',
    style,
    className,
    ...animatedCompProps
  } = props;

  return (
    <Component
      className={className}
      style={{'--delay': delay, ...style} as React.CSSProperties}
      data-animate=""
      {...animatedCompProps}
    />
  );
}

interface ChipProps extends React.ComponentProps<'div'> {
  color: 'blue' | 'orange' | 'white';
}
function Chip({color, ...props}: ChipProps) {
  return <div className={s.chip} data-color={color} {...props} />;
}
