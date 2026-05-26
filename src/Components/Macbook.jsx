"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const wrapperVariants = {
  initial: {
    y: 0,
  },
  animate: {
    y: 40,
  },
};

const lidVariants = {
  initial: {
    rotateX: -70,
  },
  animate: {
    rotateX: 20,
  },
};

const islandVariants = {
  initial: {
    width: 48,
    height: 12,
  },
  loading: {
    width: 76,
    height: 18,
  },
  done: {
    width: 58,
    height: 14,
  },
};

const Spinner = () => {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.75,
        repeat: Infinity,
        ease: "linear",
      }}
      className="size-2.5 rounded-full border border-white/25 border-t-white"
    />
  );
};

const MacNotification = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 54,
        scale: 0.96,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: 24,
        scale: 0.96,
        filter: "blur(8px)",
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
        mass: 0.8,
      }}
      className="
        absolute inset-x-3 top-8 z-20
        overflow-hidden rounded-sm
        bg-black/30
        p-2
        backdrop-blur-xl
      "
    >
      <div className="relative z-10">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <div
              className="
                flex size-4 shrink-0 items-center justify-center
                rounded-[5px]
                bg-black
                shadow-[0_3px_8px_rgba(0,0,0,0.22)]
              "
            >
              <span className="text-[6px] font-black leading-none text-white">
                VP
              </span>
            </div>

            <p className="truncate text-[6.5px] leading-none text-white">
              Hi Stuart
            </p>
          </div>

          <span className="shrink-0 text-[5.5px] font-semibold leading-none text-white">
            now
          </span>
        </div>

        <p className="mt-0.5 text-[7px] leading-tight text-white/90">
          All your services are ready and running smoothly.
        </p>
      </div>
    </motion.div>
  );
};

const Macbook = ({ active }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let loadingTimer;

    if (active) {
      setIsLoading(true);
      setShowNotification(false);

      loadingTimer = setTimeout(() => {
        setIsLoading(false);
        setShowNotification(true);
      }, 1200);
    } else {
      setIsLoading(false);
      setShowNotification(false);
    }

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [active]);

  return (
    <motion.div
      initial="initial"
      animate={active ? "animate" : "initial"}
      variants={wrapperVariants}
      transition={{
        duration: 0.5,
        ease: "circOut",
      }}
      className="relative w-60 -ml-10 -mt-20 [perspective:1200px]"
    >
      
      <motion.div
        variants={lidVariants}
        transition={{ type: "spring", stiffness: 100, damping: 35 }}
        style={{
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="mx-auto h-38 w-[88%] rounded-tl-xl rounded-tr-xl bg-neutral-600 p-1 shadow-sm shadow-black/10 ring-1 ring-black/10"
      >
        <div className="relative h-full w-full overflow-hidden rounded-tl-[10px] rounded-tr-[10px] bg-black">
         
          <motion.img
            initial={{ opacity: 0, rotateY: -8, rotateX: 0, scale: 0.98 }}
            animate={
              active
                ? {
                    opacity: 1,
                    y: 0,
                    rotateY: -3,
                    rotateX: 2,
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    rotateY: -8,
                    rotateX: 0,
                    scale: 0.98,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 40,
              delay: active ? 0.65 : 0,
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
            className="h-full w-full object-cover"
            src="https://cdn.osxdaily.com/wp-content/uploads/2017/06/get-ios-11-default-wallpaper.jpg"
            alt=""
          />

         
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{
              duration: 0.3,
              delay: active ? 0.65 : 0,
            }}
            className="absolute inset-0 bg-black/8"
          />

       
          <motion.div
            variants={islandVariants}
            initial="initial"
            animate={active ? (isLoading ? "loading" : "done") : "initial"}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 24,
              mass: 0.8,
            }}
            className="
              absolute left-1/2 top-2 z-30
              flex -translate-x-1/2 items-center justify-center
              overflow-hidden rounded-full bg-black
              shadow-[0_8px_22px_rgba(0,0,0,0.45)]
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  className="flex w-full items-center justify-start gap-1.5 px-2"
                >
                  <Spinner />
                  <span className="text-[6px] font-medium leading-none text-white/70">
                    Checking
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{
                    opacity: active ? 0.75 : 0.55,
                    scale: active ? 1 : 0.9,
                  }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                  <span className="h-2 w-2 rounded-full bg-neutral-800" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          
          <AnimatePresence initial={false}>
            {showNotification && <MacNotification />}
          </AnimatePresence>

        
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.15),transparent_28%,transparent_72%,rgba(255,255,255,0.08))]" />
        </div>
      </motion.div>

     
      <div className="relative h-3 w-full rounded-bl-xl rounded-br-xl rounded-tl-sm rounded-tr-sm bg-linear-to-b from-neutral-50 to-neutral-300 shadow-[0px_1px_0px_0px_var(--color-neutral-300)_inset]">
        <div className="absolute inset-x-0 top-0 mx-auto h-2 w-10 rounded-bl-md rounded-br-md bg-neutral-300 shadow-[0px_-1px_0px_0px_var(--color-neutral-100)_inset,_1px_0px_5px_0px_var(--color-neutral-500)_inset]" />
      </div>

     
      <motion.div
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.7,
        }}
        transition={{
          duration: 0.4,
          delay: active ? 0.35 : 0,
        }}
        className="absolute -bottom-4 left-1/2 h-4 w-44 -translate-x-1/2 rounded-full bg-blue-400/20 blur-xl"
      />
    </motion.div>
  );
};

export default Macbook;