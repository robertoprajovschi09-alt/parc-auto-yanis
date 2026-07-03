import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/*
 * Animated count-up for stat figures ("9", "100+"). Renders the final value
 * on the server and for reduced-motion users; otherwise counts up once when
 * it scrolls into view. Suffix ("+", "h", " ani") stays static text.
 */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span className={className}>
      <span ref={ref}>{value}</span>
      {suffix}
    </span>
  );
}
