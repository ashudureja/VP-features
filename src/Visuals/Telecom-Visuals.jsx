import { cn } from "../lib/utils";
import { useState, useEffect } from "react";

const TelecomVisual = () => {
  return (
    <div
      className={cn(
        "relative",
        "flex flex-col justify-between",
        "h-full w-full space-y-4",
        "rounded-md ",
      )}
    >
      <TelecomCard />
    </div>
  );
};

export default TelecomVisual;

const TelecomCard = () => {
  const [nextJsTransform, setNextJsTransform] = useState("none");
  const [reactTransform, setReactTransform] = useState("none");
  const [htmlTransform, setHtmlTransform] = useState("none");

  useEffect(() => {
    let isMounted = true;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const cycleAnimations = async () => {
      const upStyle = "translateY(-3.71px) rotateX(10.71deg) translateZ(20px)";
      const downStyle = "none";

      const transitionDuration = 1100;
      const durationOfUpState = 1200;
      const delayBetweenCards = 600;

      while (isMounted) {
        setReactTransform(upStyle);
        await sleep(durationOfUpState);
        if (!isMounted) return;
        setReactTransform(downStyle);
        await sleep(transitionDuration + delayBetweenCards);

        if (!isMounted) return;
        setNextJsTransform(upStyle);
        await sleep(durationOfUpState);
        if (!isMounted) return;
        setNextJsTransform(downStyle);
        await sleep(transitionDuration + delayBetweenCards);

        if (!isMounted) return;
        setHtmlTransform(upStyle);
        await sleep(durationOfUpState);
        if (!isMounted) return;
        setHtmlTransform(downStyle);
        await sleep(transitionDuration + delayBetweenCards);
      }
    };

    cycleAnimations();

    return () => {
      isMounted = false;
    };
  }, []);

  const cardClasses =
    "flex aspect-square items-center justify-center rounded-md bg-white shadow-border p-4 " +
    "transition-transform duration-1000 ease-out will-change-transform";

  return (
    <div
      className={cn(
        "",
        "relative",
        "flex flex-col items-center justify-center gap-1",
        "h-40 w-full",
      )}
    >
      <div className="absolute flex h-full w-full items-center justify-center">
        <div className="h-full w-60">
          <svg
            className="h-full w-full"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
          >
            <g stroke="#737373" strokeWidth="0.1">
              <path d="M 1 0 v 5 q 0 5 5 5 h 39 q 5 0 5 5 v 71 q 0 5 5 5 h 39 q 5 0 5 5 v 5" />
            </g>

            <g mask="url(#framework-mask)">
              <circle
                className="frameworkline framework-line"
                cx="0"
                cy="0"
                r="12"
                fill="url(#framework-blue-grad)"
              />
            </g>

            <defs>
              <mask id="framework-mask">
                <path
                  d="M 1 0 v 5 q 0 5 5 5 h 39 q 5 0 5 5 v 71 q 0 5 5 5 h 39 q 5 0 5 5 v 5"
                  strokeWidth="1"
                  stroke="gray"
                />
              </mask>

              <radialGradient id="framework-blue-grad" fx="1">
                <stop offset="0%" stopColor="blue" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center justify-center gap-4",
          "perspective-[1000px] transform-3d",
        )}
      >
        <div className={cardClasses} style={{ transform: reactTransform }}>
          <img
            className="size-8  object-cover"
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-telstra-logo-icon-badge-blue.png"
          ></img>
        </div>

        <div className={cardClasses} style={{ transform: nextJsTransform }}>
          {" "}
          <img
            className="size-11  object-cover"
            src="https://andcorp.com.au/wp-content/uploads/2021/09/NBN-7.png"
          ></img>
        </div>

        <div className={cardClasses} style={{ transform: htmlTransform }}>
          <img
            className="size-8  object-cover"
            src="https://companieslogo.com/img/orig/SLC.AX-81ff7b37.png?t=1723227396"
          ></img>
        </div>
      </div>
    </div>
  );
};
