import React, { forwardRef, useRef, createRef, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { AnimatedBeam } from "../Components/Beam";
import Macbook from "../Components/Macbook";
import { motion } from "motion/react";

const SUPPLIERS = [
  {
    name: "nbn®",
    color: "from-blue-500 to-cyan-400",
    gradientStartColor: "#F17463",
    gradientStopColor: "#F17463",
  },
  {
    name: "Telstra",
    color: "from-blue-600 to-indigo-500",
    gradientStartColor: "#F17463",
    gradientStopColor: "#F17463",
  },
  {
    name: "Opticomm",
    color: "from-emerald-500 to-teal-400",
    gradientStartColor: "#F17463",
    gradientStopColor: "#F17463",
  },
  {
    name: "Voice",
    color: "from-slate-400 to-slate-600",
    gradientStartColor: "#F17463",
    gradientStopColor: "#F17463",
  },
];

const SupplierCard = forwardRef(({ data, active, index }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.4, x: 0 }}
      animate={{
        opacity: active ? 1 : 0.4,
        x: active ? 10 : 0,
        boxShadow: active
          ? "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)"
          : "none",
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="relative z-10 w-28 sm:w-36 rounded-xl bg-white px-3 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-neutral-800 shadow-sm"
    >
      {data.name}
    </motion.div>
  );
});

SupplierCard.displayName = "SupplierCard";

const PluginVisual = () => {
  const [active, setActive] = useState(false);

  const containerRef = useRef(null);
  const vpRef = useRef(null);
  const macbookRef = useRef(null);

  const supplierRefs = useRef(SUPPLIERS.map(() => createRef()));

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="relative flex h-full w-full  flex-col justify-between overflow-hidden p-4 sm:p-6"
    >
     

      {/* Desktop / tablet layout */}
      <div className="hidden md:flex w-full items-center justify-center gap-40 2xl:gap-50  mt-30">
        <div className="relative z-10 flex flex-col gap-5">
          {SUPPLIERS.map((data, index) => (
            <SupplierCard
              key={data.name}
              ref={supplierRefs.current[index]}
              data={data}
              index={index}
              active={active}
            />
          ))}
        </div>

        <div
          ref={vpRef}
          className="shadow-brand relative z-20 flex size-15 items-center justify-center rounded-full border border-white/20 bg-black p-4 text-lg font-semibold text-white shadow-2xl"
        >
          <motion.div
            animate={active ? { rotate: 360 } : { rotate: 0 }}
            transition={
              active
                ? { duration: 0.8, ease: "linear", repeat: Infinity, repeatType: "loop" }
                : { duration: 0.25, ease: "easeOut" }
            }
            className="flex items-center justify-center"
          >
            <IoMdSettings className="text-2xl" />
          </motion.div>
        </div>

        <div ref={macbookRef} className="relative z-10">
          <Macbook active={active} />
        </div>

        <div className="pointer-events-none absolute inset-0 z-0">
          {SUPPLIERS.map((supplier, index) => (
            <AnimatedBeam
              key={`supplier-beam-${index}`}
              active={active}
              containerRef={containerRef}
              fromRef={supplierRefs.current[index]}
              toRef={vpRef}
              duration={1.8}
              delay={index * 0.12}
              pathColor="rgba(0,0,0,0.3)"
              pathWidth={1}
              pathOpacity={0.2}
              gradientStartColor="red"
            gradientStopColor="red"
              startXOffset={70}
              endXOffset={-25}
              endYOffset={(index - 2.5) * 4}
            />
          ))}

          <AnimatedBeam
            active={active}
            containerRef={containerRef}
            fromRef={vpRef}
            toRef={macbookRef}
            curvature={0}
            duration={1.8}
            delay={0.8}
            gradientStartColor="#10b981"
            gradientStopColor="#2dd4bf"
            pathColor="rgba(0,0,0,0.3)"
            pathWidth={1}
            pathOpacity={0.2}
            startXOffset={35}
            endXOffset={-120}
          />
        </div>
      </div>

      {/* Mobile layout — stacked vertically, no beams */}
      <div className="flex  md:hidden w-full flex-col items-center gap-5 mt-28 sm:mt-20">
        {/* Supplier pills row (2x2 grid on mobile) */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
          {SUPPLIERS.map((data, index) => (
            <motion.div
              key={data.name}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: active ? 1 : 0.4 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="rounded-xl bg-white px-3 py-2 text-center text-xs font-medium text-neutral-800 shadow-sm"
            >
              {data.name}
            </motion.div>
          ))}
        </div>

        
        <motion.div
          animate={{ opacity: active ? 1 : 0.3 }}
          className="flex flex-col items-center gap-0.5"
        >
          <div className="w-px h-4 bg-neutral-300" />
          <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-neutral-300" />
        </motion.div>


        <div
          className="relative z-20 flex size-12 items-center justify-center rounded-full border border-white/20 bg-black p-3 text-white shadow-xl"
        >
          <motion.div
            animate={active ? { rotate: 360 } : { rotate: 0 }}
            transition={
              active
                ? { duration: 0.8, ease: "linear", repeat: Infinity, repeatType: "loop" }
                : { duration: 0.25, ease: "easeOut" }
            }
            className="flex items-center justify-center"
          >
            <IoMdSettings className="text-xl" />
          </motion.div>
        </div>

      
        <motion.div
          animate={{ opacity: active ? 1 : 0.3 }}
          className="flex flex-col items-center gap-0.5"
        >
          <div className="w-px h-4 bg-neutral-300" />
          <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-neutral-300" />
        </motion.div>

        {/* Macbook — scaled down */}
        <div className="scale-[0.72] origin-top ml-5.5">
          <Macbook active={active} />
        </div>
      </div>
    </div>
  );
};

export default PluginVisual;