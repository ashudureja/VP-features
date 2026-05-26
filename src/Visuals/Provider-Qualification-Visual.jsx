import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { AnimatePresence, motion } from "motion/react";

const ADDRESS = "11 Mebbin, NSW 2486";

const providers = [
  { name: "nbn®", plan: "NBN 100", price: 79 },
  { name: "Telstra", plan: "NBN 100", price: 89 },
  { name: "AAPT", plan: "NBN 50", price: 68 },
  { name: "Optus", plan: "NBN 100", price: 85 },
  { name: "Opticomm", plan: "Fibre 100", price: 70 },
];

const liveMarkers = [
  { id: "live-sf", location: [37.78, -122.44] },
  { id: "live-london", location: [51.51, -0.13] },
  { id: "live-tokyo", location: [35.68, 139.65] },
  { id: "live-paris", location: [48.86, 2.35] },
  { id: "live-sydney", location: [-33.87, 151.21] },
  { id: "live-nyc", location: [40.71, -74.01] },
  { id: "live-dubai", location: [25.2, 55.27] },
];

const qualificationMarker = {
  id: "vp-247",
  location: [-28.18, 153.49],
};

const providerBadges = liveMarkers.map((marker, i) => ({
  ...marker,
  provider: providers[i % providers.length],
}));

const lowestPrice = Math.min(...providers.map((p) => p.price));

const ease = [0.22, 1, 0.36, 1];

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function LoaderIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.polyline
        points="20 6 9 17 4 12"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 0.38, ease },
          opacity: { duration: 0.12 },
        }}
      />
    </motion.svg>
  );
}

function Chip({ provider }) {
  const isLowest = provider.price === lowestPrice;

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md whitespace-nowrap select-none bg-zinc-900 border border-zinc-700/40 shadow-lg">
      <span
        className={`w-[5px] h-[5px] rounded-full shrink-0 animate-[live-pulse_1.5s_ease-in-out_infinite] ${
          isLowest ? "bg-green-400" : "bg-red-500"
        }`}
      />

      <span
        className={`font-mono text-[0.58rem] font-bold tracking-wide uppercase ${
          isLowest ? "text-green-400" : "text-white/80"
        }`}
      >
        {provider.name}
      </span>

      <span className="w-px h-3 bg-white/20 shrink-0" />

      <span
        className={`font-mono text-[0.6rem] font-bold tabular-nums ${
          isLowest ? "text-green-400" : "text-red-400"
        }`}
      >
        ${provider.price}/mo
      </span>
    </div>
  );
}

export default function ProviderVisual({ className = "", size = 620 }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  const hoverRef = useRef(false);
  const stageRef = useRef("idle");
  const phiRef = useRef(0);
  const velocityRef = useRef(0);

  const [isHovered, setIsHovered] = useState(false);
  const [stage, setStage] = useState("idle");
  const [typedAddress, setTypedAddress] = useState("");

  const setStageValue = (value) => {
    stageRef.current = value;
    setStage(value);
  };

  useEffect(() => {
    hoverRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    if (!isHovered) {
      setStageValue("idle");
      setTypedAddress("");
      return;
    }

    setStageValue("typing");
    setTypedAddress("");

    let index = 0;
    let loadingTimer;

    const typingTimer = setInterval(() => {
      index += 1;
      setTypedAddress(ADDRESS.slice(0, index));

      if (index >= ADDRESS.length) {
        clearInterval(typingTimer);
        setStageValue("loading");

        loadingTimer = setTimeout(() => {
          if (!hoverRef.current) return;
          setStageValue("results");
        }, 700);
      }
    }, 42);

    return () => {
      clearInterval(typingTimer);
      clearTimeout(loadingTimer);
    };
  }, [isHovered]);

  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return;

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    let animationId;

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      window.innerWidth < 640 ? 1.8 : 2,
    );

    const getWidth = () => wrapper.offsetWidth || size;

    const getMarkers = () => {
      const base = providerBadges.map((marker) => ({
        id: marker.id,
        location: marker.location,
        size: 0.012,
      }));

      if (stageRef.current === "results") {
        return [
          ...base,
          {
            id: qualificationMarker.id,
            location: qualificationMarker.location,
            size: 0.035,
          },
        ];
      }

      return base;
    };

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: getWidth(),
      height: getWidth(),
      phi: phiRef.current,
      theta: 0.25,
      dark: 0,
      diffuse: 0.4,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [1, 0.23, 0.19],
      glowColor: [1, 1, 1],
      markerElevation: 0.04,
      opacity: 0.95,
      markers: getMarkers(),
    });

    function animate() {
      const targetVelocity = hoverRef.current ? 0.006 : 0;

      velocityRef.current += (targetVelocity - velocityRef.current) * 0.05;
      phiRef.current += velocityRef.current;

      globe.update({
        phi: phiRef.current,
        markers: getMarkers(),
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const resizeObserver = new ResizeObserver(() => {
      const width = getWidth();
      globe.update({
        width,
        height: width,
      });
    });

    resizeObserver.observe(wrapper);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      globe.destroy();
    };
  }, [size]);

  const iconState =
    stage === "loading"
      ? "loading"
      : stage === "results"
        ? "results"
        : "search";

  return (
    <div
      className={`relative p-4 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Search bar */}
      <motion.div
        className="
          absolute md:top-30  left-1/2 z-20 -translate-x-1/2
          md:w-[min(88%,220px)] h-[46px]
          flex items-center gap-2.5
          px-4 rounded-full
          bg-white/[0.88]
          shadow-sm border border-black/5
          backdrop-blur-[16px]
          top-30 w-53
        "
        initial={false}
        animate={
          isHovered
            ? {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }
            : {
                opacity: 0,
                y: -18,
                filter: "blur(8px)",
              }
        }
        transition={{
          duration: 0.45,
          ease,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={iconState}
            className={`w-[18px] h-[18px] grid place-items-center shrink-0 transition-colors duration-300 ${
              stage === "results" ? "text-zinc-900" : "text-zinc-900"
            }`}
            initial={{
              opacity: 0,
              rotate: stage === "loading" ? -90 : -24,
              scale: 0.78,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              rotate: stage === "results" ? 24 : 90,
              scale: 0.78,
              filter: "blur(4px)",
            }}
            transition={{
              duration: 0.22,
              ease,
            }}
          >
            {stage === "loading" ? (
              <LoaderIcon />
            ) : stage === "results" ? (
              <CheckIcon />
            ) : (
              <SearchIcon />
            )}
          </motion.span>
        </AnimatePresence>

        <span className="overflow-hidden whitespace-nowrap text-ellipsis text-[0.82rem] font-medium text-zinc-900">
          {typedAddress || "Search customer address"}

          {stage === "typing" && (
            <span className="inline-block w-px h-[14px] ml-[3px] bg-red-500 align-[-2px] animate-[caret-blink_0.8s_steps(2,start)_infinite]" />
          )}
        </span>
      </motion.div>

      <div
        ref={wrapperRef}
        className="
          absolute top-34 -translate-x-1/2 left-1/2
          aspect-square select-none [contain:layout_style]
          max-sm:right-[-170px] max-sm:bottom-[-90px]
        "
        style={{
          width: typeof size === "number" ? `${size}px` : size,
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block rounded-full touch-none"
        />

        <AnimatePresence>
          {stage === "results" &&
            providerBadges.map((marker, index) => (
              <motion.div
                key={marker.id}
                className="absolute pointer-events-none z-[15]"
                style={{
                  positionAnchor: `--cobe-${marker.id}`,
                  opacity: `var(--cobe-visible-${marker.id}, 0)`,
                  bottom: "anchor(top)",
                  left: "anchor(center)",
                  translate: "-50% 0",
                  marginBottom: "8px",
                }}
                initial={{
                  scale: 0.8,
                  opacity: 0,
                  filter: "blur(16px)",
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  scale: 0.8,
                  opacity: 0,
                  filter: "blur(12px)",
                }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.35,
                  ease,
                }}
              >
                <Chip provider={marker.provider} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes caret-blink {
          50% {
            opacity: 0;
          }
        }

        @keyframes live-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.6;
            transform: scale(0.85);
          }
        }

        @supports not (anchor-name: --test) {
          [style*="positionAnchor"],
          [style*="anchor(top)"] {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
