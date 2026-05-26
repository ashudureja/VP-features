import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { FiLoader } from "react-icons/fi";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

const LifecycleVisual = ({
  duration = 3000,
  
}) => {
  const steps = ["Qualifying Service", "Provisioning Order", "Service Activated"];

  const [activeStep, setActiveStep] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
      setCycleKey((prev) => prev + 1);
    }, duration);

    return () => clearTimeout(timer);
  }, [activeStep, duration, steps.length]);

  const getCardState = (index) => {
    const nextStep = (activeStep + 1) % steps.length;

    if (index === activeStep) return "active";
    if (index === nextStep) return "waiting";
    return "completed";
  };

  const getCardPosition = (state) => {
    if (state === "waiting") {
      return {
        y: -55,
        scale: 0.8,
        opacity: 0.7,
        zIndex: 1,
      };
    }

    if (state === "active") {
      return {
        y: 0,
        scale: 1,
        opacity: 1,
        zIndex: 3,
      };
    }

    return {
      y: 55,
      scale: 0.8,
      opacity: 0.7,
      zIndex: 1,
    };
  };

  const StepIcon = ({ state }) => {
    if (state === "completed") {
      return (
        <div className="relative">
          <svg width="20" height="20">
            <circle cx="10" cy="10" r="5" fill="#22c55e" />
          </svg>

          <div className="text-background absolute inset-0 flex items-center justify-center">
            <IoMdCheckmark className="size-2" />
          </div>
        </div>
      );
    }

    return (
      <div className={state === "active" ? "animate-spin" : ""}>
        <FiLoader />
      </div>
    );
  };

  return (
    <div
      className={cn(
        "relative h-full w-full ",
        "flex items-center  -mt-10 justify-center overflow-hidden p-1 "
      )}
    >
      {steps.map((label, index) => {
        const state = getCardState(index);
        const position = getCardPosition(state);

        return (
          <motion.div
            key={index}
            animate={position}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
              mass: 0.8,
            }}
            className={cn(
              "absolute flex min-w-[15.625rem] bg-white flex-col justify-center gap-2 rounded-md shadow-border ",
              "b py-2 px-4 pr-10",
              
            )}
          >
            <div className="text-primary flex items-center justify-start gap-2 text-xs">
              <StepIcon state={state} />
              <div>{label}</div>
            </div>

            <div className="ml-5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 ">
              <motion.div
                key={`${cycleKey}-${index}`}
                className="h-full bg-green-500"
                initial={{ width: "0%" }}
                animate={{
                  width:
                    state === "active" || state === "completed"
                      ? "100%"
                      : "0%",
                }}
                transition={{
                  duration: state === "active" ? duration / 1000 : 0.25,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        );
      })}

     
    </div>
  );
};

export default LifecycleVisual;