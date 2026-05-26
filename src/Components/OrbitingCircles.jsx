import React from "react";
import { cn } from "../lib/utils";


function useResponsiveRadius(mobile = 80, tablet = 120, desktop = 160) {
  const [radius, setRadius] = React.useState(desktop);

  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setRadius(mobile);
      else if (w < 1024) setRadius(tablet);
      else setRadius(desktop);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [mobile, tablet, desktop]);

  return radius;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius,
  mobileRadius = 120,
  tabletRadius = 150,
  desktopRadius = 150,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}) {
  const responsiveRadius = useResponsiveRadius(mobileRadius, tabletRadius, desktopRadius);
  const resolvedRadius = radius ?? responsiveRadius;
  const calculatedDuration = duration / speed;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full  "
        >
          <circle
            className="stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={resolvedRadius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={{
              "--duration": calculatedDuration,
              "--radius": resolvedRadius,
              "--angle": angle,
              "--icon-size": `${iconSize}px`,
            }}
            className={cn(
              `absolute flex transform-gpu items-center justify-center rounded-full -mt-30 md:-mt-20`,
              reverse ? "animate-orbit-reverse" : "animate-orbit",
              className,
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}