import React, { useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Reveal = ({
  as: Component = 'div',
  className = '',
  children,
  delay = 0,
  once = true,
  rootMargin,
  threshold,
  style,
  ...rest
}) => {
  const ref = useRef(null);

  useScrollReveal(ref, { delay, once, rootMargin, threshold });

  const combinedClassName = ['scroll-reveal', className].filter(Boolean).join(' ').trim();

  return (
    <Component
      ref={ref}
      className={combinedClassName}
      style={{ ...style, '--reveal-delay': `${delay ?? 0}ms` }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Reveal;
