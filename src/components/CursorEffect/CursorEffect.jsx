import { useEffect, useRef, useState } from "react";

import styles from "./CursorEffect.module.css";


export const CursorEffect = () => {
  const dotRef = useRef(null);
  const middleRef = useRef(null);
  const outerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const middlePos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef(null);

  useEffect(() => {
    const animate = () => {
      // Center dot follows mouse almost instantly
      const dotSpeed = 0.3;
      const dotDx = mousePos.current.x - dotPos.current.x;
      const dotDy = mousePos.current.y - dotPos.current.y;

      dotPos.current.x += dotDx * dotSpeed;
      dotPos.current.y += dotDy * dotSpeed;

      // Middle circle follows with moderate delay
      const middleSpeed = 0.18;
      const middleDx = dotPos.current.x - middlePos.current.x;
      const middleDy = dotPos.current.y - middlePos.current.y;

      middlePos.current.x += middleDx * middleSpeed;
      middlePos.current.y += middleDy * middleSpeed;

      // Outer circle follows with much more delay
      const outerSpeed = 0.10;
      const outerDx = dotPos.current.x - outerPos.current.x;
      const outerDy = dotPos.current.y - outerPos.current.y;

      outerPos.current.x += outerDx * outerSpeed;
      outerPos.current.y += outerDy * outerSpeed;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px)`;
      }

      if (middleRef.current) {
        middleRef.current.style.transform = `translate(${middlePos.current.x}px, ${middlePos.current.y}px)`;
      }

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      setIsVisible(true);

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  if (!isVisible) return null;
  return (
    <div className={styles.cursorContainer}>
      <div ref={outerRef} className={styles.outerCircle} />
      <div ref={middleRef} className={styles.middleCircle} />
      <div ref={dotRef} className={styles.centerDot} />
    </div>
  );
};

export default CursorEffect;
