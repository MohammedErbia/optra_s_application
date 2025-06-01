import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const OUTER_SIZE = 36;
const INNER_SIZE = 8;
const OUTER_COLOR = '#14B8A6';
const INNER_COLOR = '#14B8A6';
const OUTER_BORDER = `2px solid ${OUTER_COLOR}`;

const AnimatedCursor: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'grabbing' | 'hidden'>('default');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Mouse move tracking
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outerX = mouseX;
    let outerY = mouseY;
    let raf: number;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Instantly move the inner dot
      if (innerRef.current) {
        gsap.set(innerRef.current, {
          x: mouseX - INNER_SIZE / 2,
          y: mouseY - INNER_SIZE / 2,
        });
      }
    };

    // Fix: also update on mousedown and mouseup
    const handleMouseDown = (e: MouseEvent) => moveCursor(e);
    const handleMouseUp = (e: MouseEvent) => moveCursor(e);

    const animate = () => {
      // Make the outer ring follow the cursor more quickly
      outerX += (mouseX - outerX) * 0.35;
      outerY += (mouseY - outerY) * 0.35;
      if (outerRef.current) {
        gsap.set(outerRef.current, {
          x: outerX - OUTER_SIZE / 2,
          y: outerY - OUTER_SIZE / 2,
        });
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Detect hover on clickable elements
  useEffect(() => {
    const setPointer = (e: Event) => {
      if (!(e.target instanceof Element)) return;
      if (
        e.target.closest('a,button,[role="button"],input,textarea,select,label,.cursor-pointer')
      ) {
        setCursorState('pointer');
      } else {
        setCursorState('default');
      }
    };
    const setGrabbing = () => setCursorState('grabbing');
    const setDefault = () => setCursorState('default');
    document.addEventListener('mouseover', setPointer);
    document.addEventListener('mousedown', setGrabbing);
    document.addEventListener('mouseup', setPointer);
    document.addEventListener('mouseout', setDefault);
    return () => {
      document.removeEventListener('mouseover', setPointer);
      document.removeEventListener('mousedown', setGrabbing);
      document.removeEventListener('mouseup', setPointer);
      document.removeEventListener('mouseout', setDefault);
    };
  }, []);

  // Hide cursor when out of window
  useEffect(() => {
    const hide = () => setCursorState('hidden');
    const show = () => setCursorState('default');
    window.addEventListener('mouseleave', hide);
    window.addEventListener('mouseenter', show);
    return () => {
      window.removeEventListener('mouseleave', hide);
      window.addEventListener('mouseenter', show);
    };
  }, []);

  // Cursor styles
  let outerScale = 1, innerScale = 1, outerBorder = OUTER_BORDER, outerColor = OUTER_COLOR, innerColor = INNER_COLOR;
  if (cursorState === 'pointer') {
    outerScale = 1.5;
    innerScale = 1.2;
    outerBorder = `2.5px solid ${OUTER_COLOR}`;
    outerColor = OUTER_COLOR;
    innerColor = OUTER_COLOR;
  } else if (cursorState === 'grabbing') {
    outerScale = 1.7;
    innerScale = 1.3;
    outerBorder = `2.5px solid #0f0f13`;
    outerColor = '#0f0f13';
    innerColor = OUTER_COLOR;
  } else if (cursorState === 'hidden') {
    outerScale = 0;
    innerScale = 0;
    outerBorder = 'none';
    outerColor = 'transparent';
    innerColor = 'transparent';
  }

  // Hide cursor on small screens
  if (windowWidth < 768) {
    outerScale = 0;
    innerScale = 0;
  }

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: OUTER_SIZE,
          height: OUTER_SIZE,
          borderRadius: '50%',
          border: outerBorder,
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `scale(${outerScale})`,
          transition: 'border 0.18s, transform 0.18s',
          boxShadow: cursorState === 'pointer' ? '0 0 0 4px rgba(20,184,166,0.12)' : 'none',
          opacity: outerScale === 0 ? 0 : 1,
        }}
      />
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: INNER_SIZE,
          height: INNER_SIZE,
          borderRadius: '50%',
          background: innerColor,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `scale(${innerScale})`,
          transition: 'background 0.18s, transform 0.18s',
          opacity: innerScale === 0 ? 0 : 1,
        }}
      />
    </>
  );
};

export default AnimatedCursor; 