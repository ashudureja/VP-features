import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
const digits = ["•", "•", "•", "•", "•", "•"];

const SecurityVisual = ({
  delay = 3500,
  cardTitle = "Secure Access",
  cardDescription = "Adds an extra layer of security via two-factor authentication to protect end-customer data and account access.",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const delayTime = Math.max(delay, 3500);

  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, delayTime);

    return () => clearInterval(interval);
  }, [isHovered, delayTime]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setAnimationKey((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <OTPinput
      isHovered={isHovered}
      animationKey={animationKey}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cardTitle={cardTitle}
      cardDescription={cardDescription}
    />
  );
};

export default SecurityVisual;

const OTPinput = ({
  isHovered,
  animationKey,
  onMouseEnter,
  onMouseLeave,
  cardTitle,
  cardDescription,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setFadeOut(false);
  }, [animationKey]);

  useEffect(() => {
    if (!isHovered) return;
    if (activeIndex > digits.length - 1) return;

    const timeout = setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
    }, 400);

    let fadeTimeout;

    if (activeIndex === digits.length - 1) {
      fadeTimeout = setTimeout(() => {
        setFadeOut(true);
      }, 450);
    }

    return () => {
      clearTimeout(timeout);
      clearTimeout(fadeTimeout);
    };
  }, [activeIndex, isHovered, animationKey]);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "relative flex h-full w-full items-center justify-center p-6",
        "font-sans",
      )}
    >
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2">
        <div className="flex w-full items-center justify-center gap-3">
          {digits.map((digit, idx) => (
            <div
              key={idx}
              className={cn(
                " relative bg-white  flex h-14 w-12 items-center justify-center rounded-md  ",
                "shadow-border",
              )}
            >
              {isHovered && (
                <motion.div
                  key={`pulse-${animationKey}-${idx}`}
                  className="absolute inset-0 rounded-md border border-black/15 "
                  initial={{
                    opacity: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.85, 1.5],
                    filter: "blur(1px)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    delay: 2.25,
                  }}
                />
              )}

              {isHovered && activeIndex === idx && (
                <motion.div
                  key={`glow-${animationKey}-${idx}`}
                  layoutId="glow"
                  className="absolute inset-0 rounded-md border border-black/70 "
                  initial={
                    idx === 0 ? { opacity: 0, scale: 1.7 } : { scale: 1.7 }
                  }
                  animate={idx === 0 ? { opacity: 1, scale: 1 } : { scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}

              {isHovered && (
                <motion.span
                  key={`dot-${animationKey}-${idx}`}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: fadeOut ? 0 : 1,
                  }}
                  transition={{
                    duration: fadeOut ? 0.2 : 0.3,
                    ease: "easeInOut",
                    delay: fadeOut ? 0 : idx * 0.43,
                  }}
                  className="absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  {digit}
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
