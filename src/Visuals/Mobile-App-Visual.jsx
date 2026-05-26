import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

import { Check } from "lucide-react";

const MobileVisual = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const update = () => {
      setIsMdUp(media.matches);
    };

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
    } else {
      media.addListener(update);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update);
      } else {
        media.removeListener(update);
      }
    };
  }, []);

  useEffect(() => {
    let timer;

    if (isHovered) {
      setIsConnected(false);

      timer = setTimeout(() => {
        setIsConnected(true);
      }, 850);
    } else {
      timer = setTimeout(() => {
        setIsConnected(false);
      }, 350);
    }

    return () => clearTimeout(timer);
  }, [isHovered]);

  const phoneVariant = {
    open: {
      y: isMdUp ? -35 : -22,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    close: {
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const notificationVariant = {
    open: {
      y: isMdUp ? 48 : 40,
      scale: 1,
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: "easeInOut",
        delay: 0.1,
      },
    },
    close: {
      y: isMdUp ? -72 : -56,
      scale: isMdUp ? 0.75 : 0.82,
      filter: "blur(10px)",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const islandVariant = {
    open: {
      width: isMdUp ? 96 : 84,
      height: isMdUp ? 30 : 28,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 22,
      },
    },
    close: {
      width: isMdUp ? 76 : 64,
      height: isMdUp ? 26 : 24,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 24,
      },
    },
  };

  const parentVariant = {
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
    close: {
      transition: {
        staggerChildren: 0.075,
        delayChildren: 0.15,
      },
    },
  };

  return (
    <motion.div
      onClick={() => setIsHovered((prev) => !prev)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="close"
      animate={isHovered ? "open" : "close"}
      variants={parentVariant}
      className={cn(
        "relative flex h-full  w-full items-center justify-center overflow-hidden sm:p-5 md:p-6",
        "font-sans dark:bg-neutral-950 dark:ring-neutral-800/60",
      )}
    >
      <motion.div
        variants={phoneVariant}
        className="
          relative mx-auto h-[300px] w-[260px] rounded-t-[34px] bg-neutral-950 p-1.5
          sm:h-[370px] sm:w-[300px] sm:rounded-t-[40px]
          md:h-100 md:w-85 md:rounded-t-[44px]
          dark:bg-neutral-800
        "
      >
        <div
          className="
            relative h-full overflow-hidden rounded-t-[29px] bg-neutral-100
            sm:rounded-t-[35px]
            md:rounded-t-[38px]
            dark:bg-neutral-950/50
          "
        >
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://cdn.osxdaily.com/wp-content/uploads/2017/06/get-ios-11-default-wallpaper.jpg"
            alt=""
          />

          <div className="absolute left-4 top-4 z-20 text-[13px] font-light tracking-tight text-white md:left-6 md:text-[15px]">
            9:41
          </div>

          <motion.div
            variants={islandVariant}
            className="absolute left-1/2 top-3 z-30 flex -translate-x-1/2 items-center justify-center rounded-full bg-black shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
          >
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0.55,
                scale: isHovered ? 1 : 0.9,
              }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
              <span className="h-2 w-2 rounded-full bg-neutral-800" />
            </motion.div>
          </motion.div>

          <div className="absolute right-4 top-4 z-20 flex origin-top-right scale-[0.86] items-center gap-1 text-white sm:scale-95 md:right-6 md:scale-100">
            <NetworkIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>

          <motion.div
            variants={notificationVariant}
            className="
              absolute left-1/2 top-4 z-10 w-[92%] -translate-x-1/2 overflow-hidden
              rounded-[18px] bg-black/30 px-3 py-3 shadow-2xl backdrop-blur-xl
              sm:top-5 sm:w-[93%] sm:rounded-[21px] sm:px-4 sm:py-3.5
              md:rounded-[22px] md:px-4 md:py-4
            "
          >
            {!isConnected ? <ActivatingCard /> : <ServiceActiveCard />}
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 block h-50 w-full rounded-b-lg bg-[linear-gradient(to_top,#f5f5f5_60%,transparent_100%)] sm:h-44 md:h-47.5 dark:hidden" />
    </motion.div>
  );
};

export default MobileVisual;

const ActivatingCard = () => {
  return (
    <motion.div
      key="activating"
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
      transition={{ type: "spring", stiffness: 100, damping: 35 }}
    >
      <p className="text-[12px] leading-none text-white/70 md:text-[13px]">
        Activating service
      </p>

      <div className="mt-3 flex items-center gap-2 md:mt-4">
        <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full text-sm">
          <img
            className="h-full w-full object-cover"
            src="https://static.vecteezy.com/system/resources/thumbnails/004/712/102/small/australia-3d-rounded-national-flag-button-icon-illustration-vector.jpg"
            alt=""
          />
        </div>

        <p className="text-sm leading-none tracking-tight text-white md:text-sm">
          NBN Service
        </p>

        <div className="ml-1 h-5 w-5 animate-spin rounded-full border-[2px] border-white/15 border-t-green-500" />
      </div>
    </motion.div>
  );
};

const ServiceActiveCard = () => {
  return (
    <motion.div
      key="service-active"
      initial={{ opacity: 0, y: 4, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -4, filter: "blur(6px)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="pb-1 md:pb-2"
    >
      <div className="flex items-start justify-between gap-2 md:gap-3">
        <div>
          <p className="text-[12px] leading-none text-white/70 md:text-[13px]">
            Service active
          </p>

          <div className="mt-3 flex items-center gap-2 md:mt-4 md:gap-2.5">
            <div className="flex size-4 md:size-5 items-center justify-center overflow-hidden rounded-full text-sm">
              <img
                className="h-full w-full object-cover"
                src="https://static.vecteezy.com/system/resources/thumbnails/004/712/102/small/australia-3d-rounded-national-flag-button-icon-illustration-vector.jpg"
                alt=""
              />
            </div>

            <p className="text-xs  leading-none tracking-tight text-white md:text-sm">
              NBN Service
            </p>

            <div className=" flex  p-1 items-center justify-center rounded-full bg-green-500">
              <Check className="size-2 text-white" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-white md:gap-2">
          <SignalBars />
          <span className="text-[11px] leading-none tracking-tight sm:text-[12px] md:text-[13px]">
            936 Mbps
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 md:mt-4 md:gap-3">
        <button className="rounded-sm bg-white px-2.5 py-2 text-[12px] tracking-tight text-neutral-900 shadow-sm md:px-4 md:text-sm">
          View Details
        </button>

        <button className="rounded-sm bg-white/15 px-2.5 py-2 text-[12px] tracking-tight text-white shadow-sm ring-1 ring-white/5 md:px-4 md:text-sm">
          Get Support
        </button>
      </div>
    </motion.div>
  );
};

const NetworkIcon = () => {
  return (
    <svg width="19" height="14" viewBox="0 0 19 14" fill="none">
      <rect x="1" y="8" width="3" height="5" rx="1" fill="currentColor" />
      <rect x="6" y="6" width="3" height="7" rx="1" fill="currentColor" />
      <rect x="11" y="3" width="3" height="10" rx="1" fill="currentColor" />
      <rect x="16" y="1" width="3" height="12" rx="1" fill="currentColor" />
    </svg>
  );
};

const WifiIcon = () => {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
      <path
        d="M2 4.7C5.9 1.5 12.1 1.5 16 4.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 8C7.3 6.2 10.7 6.2 13 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8.2 11.1C8.7 10.7 9.3 10.7 9.8 11.1"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
};

const BatteryIcon = () => {
  return (
    <svg width="25" height="13" viewBox="0 0 25 13" fill="none">
      <rect
        x="1"
        y="1.5"
        width="20"
        height="10"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="3.5" y="4" width="15" height="5" rx="1.5" fill="currentColor" />
      <rect x="22" y="4.5" width="2" height="4" rx="1" fill="currentColor" />
    </svg>
  );
};

const SignalBars = () => {
  return (
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
      <rect x="2" y="11" width="3" height="6" rx="1" fill="#22c55e" />
      <rect x="7" y="8" width="3" height="9" rx="1" fill="#22c55e" />
      <rect x="12" y="5" width="3" height="12" rx="1" fill="#22c55e" />
    </svg>
  );
};

const CheckIcon = () => {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M3.2 6.7L5.4 8.9L9.9 4.2"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
