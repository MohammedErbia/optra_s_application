import React, { useEffect, useState } from 'react';

const Counter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    let animationFrame;
    const step = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    step();
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default Counter; 