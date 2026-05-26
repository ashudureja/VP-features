import React from "react";
import PluginVisual from "./Visuals/Plugin-Engine-Visual";

import MobileBento from "./Visuals/Mobile-App-Visual";
import SecurityVisual from "./Visuals/Security-Visual";
import OnboardCard from "./Visuals/Lifecycle-Managemant-Visual";
import TelecomVisual from "./Visuals/Telecom-Visuals";
import ApiVisual from "./Visuals/Api-Integration-Visual";
import ProviderVisual from "./Visuals/Provider-Qualification-Visual";
import MobileVisual from "./Visuals/Mobile-App-Visual";
import CoreVisual from "./Visuals/Core-MSP-Visual";
import LifecycleVisual from "./Visuals/Lifecycle-Managemant-Visual";
import { DotPattern } from "./Components/DotPattern";

const TEXT_POSITIONS = {
  topLeft: "absolute left-5 right-5 top-5 z-20 ",
  bottomLeft: "absolute bottom-5 left-5 right-5 z-20",
};

const CardText = ({ title, description, position = "bottomLeft" }) => {
  return (
    <div className={TEXT_POSITIONS[position]}>
      <h3 className=" text-sm md:text-[16px]  tracking-tight text-black font-sans">
        {title}
      </h3>

      <p className="mt-1 max-w-3xl text-[12px] md:text-[13px] font-light leading-tight  text-neutral-600">
        {description}
      </p>
    </div>
  );
};

const BottomFade = () => {
  return (
    <div className="absolute bottom-0 left-0 block h-32 w-full rounded-b-lg bg-[linear-gradient(to_top,#f5f5f5_60%,transparent_100%)] sm:h-40 xl:h-47.5 dark:hidden" />
  );
};

const BentoCard = ({
  children,
  className = "",
  showFade = false,
  showPattern = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative cursor-pointer rounded-xl bg-[#f7f8f9] shadow-border ${className}`}
    >
      {showFade && <BottomFade />}

      {showPattern && (
        <DotPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
      )}

      {children}
    </div>
  );
};

const handleOrbitMouseEnter = (e) => {
  e.currentTarget
    .querySelectorAll(".animate-orbit, .animate-orbit-reverse")
    .forEach((el) => {
      el.style.animationPlayState = "running";
    });
};

const handleOrbitMouseLeave = (e) => {
  e.currentTarget
    .querySelectorAll(".animate-orbit, .animate-orbit-reverse")
    .forEach((el) => {
      el.style.animationPlayState = "paused";
    });
};



const FeaturesGrid = () => {
  return (
    <div
      className="
        flex min-h-screen w-full flex-col gap-8 overflow-x-hidden bg-white
        px-4 py-8
        sm:px-6 sm:py-10
        lg:px-8
        xl:gap-12 xl:p-16 xl:pt-10
      "
    >
      <div className="flex flex-col    max-w-[1600px] mx-auto w-full  gap-2">
        <h1
          className="
            bg-linear-to-b from-black to-gray-300/80 bg-clip-text 
            text-3xl font-light tracking-tight text-transparent
            sm:text-4xl
            xl:text-4xl
         
            
          "
        >
          Virtual <span className="text-blue-600">Platform</span>
        </h1>
      </div>

      <div
        className="
       grid h-full w-full  max-w-[1600px]
               mx-auto   grid-cols-1 gap-3
          sm:gap-4
          md:grid-cols-2
          xl:grid-cols-12 xl:gap-2
        "
      >
        <BentoCard
          className="
            overflow-hidden
            h-[480px]
            sm:h-[480px]
            md:col-span-2
            xl:col-span-7 xl:h-100
          "
        >
          <CardText
            position="topLeft"
            title="Plugin Engine"
            description="Our Plug-In Engine takes different supplier APIs, workflows, and logic, and normalises them into one standard format. Everything works the same way behind one clean experience."
          />

          <PluginVisual />
        </BentoCard>

        <BentoCard
          className="
            h-[380px] overflow-hidden
            sm:h-[430px]
            md:col-span-2
            xl:col-span-5 xl:h-100
          "
        >
          <ProviderVisual />

          <CardText
            position="topLeft"
            title="Real-Time Service Qualification"
            description="Qualify services, compare carrier availability, and view plans and pricing in real time from a single search."
          />
        </BentoCard>

        <BentoCard
          showFade={false}
          className="
            h-[450px] overflow-hidden
            sm:h-[550px]
            md:col-span-1
            xl:col-span-6 xl:h-130
          "
        >
          <MobileVisual />

          <CardText
            position="bottomLeft"
            title="White Label MSP Portal"
            description="End customers get a branded portal and mobile app experience to view services, usage, connection status, and support."
          />
        </BentoCard>

        <BentoCard
          showPattern
          onMouseEnter={handleOrbitMouseEnter}
          onMouseLeave={handleOrbitMouseLeave}
          className="
            group flex h-[440px] w-full items-center justify-center overflow-hidden
            sm:h-[550px]
            md:col-span-1
            xl:col-span-6 xl:h-130
          "
        >
          <div
            className="
              absolute left-1/2 top-1/2 z-10 flex size-10 -translate-x-1/2 -mt-15 md:-mt-10
              -translate-y-1/2 items-center justify-center rounded-md bg-black
              shadow-brand
              sm:size-12
            "
          >
            <img
              className="h-4 invert sm:h-5"
              src="https://www.pngmart.com/files/23/Link-Icon-PNG-Photos.png"
              alt="Link icon"
            />
          </div>

          <CoreVisual/>

          <CardText
            position="bottomLeft"
            title="Core MSP Products"
            description="Get connectivity, voice, cloud, web, backup, Microsoft 365, SSL, and SMS services all in one place."
          />

         
        </BentoCard>

        <BentoCard
          className="
          h-[680px]
            overflow-hidden
            md:col-span-2
            xl:col-span-12 xl:h-115
          "
        >
          <ApiVisual />

          <CardText
            position="bottomLeft"
            title="API-First Platform"
            description="Automate sales, provisioning, support, billing, live traffic monitoring, and customer workflows through one unified API layer."
          />
        </BentoCard>

        <BentoCard
          className="
            h-[280px] overflow-hidden
            sm:h-[300px]
            md:col-span-1
            xl:col-span-4 xl:h-70
          "
        >
          <CardText
            position="bottomLeft"
            title="Secure Access"
            description="Adds an extra layer of security via two-factor authentication to protect end-customer data and account access."
          />

          <SecurityVisual />
        </BentoCard>

        <BentoCard
          className="
            h-[280px] overflow-hidden
            sm:h-[300px]
            md:col-span-1
            xl:col-span-4 xl:h-70
          "
        >
          <LifecycleVisual duration={3000} className="-mt-10" />

          <CardText
            position="bottomLeft"
            title="Lifecycle Management"
            description="Qualify, order, manage, support and bill services from one connected portal
"
          />
        </BentoCard>

        <BentoCard
          className="
            h-[280px] overflow-hidden
            sm:h-[300px]
            md:col-span-2
            xl:col-span-4 xl:h-70
          "
        >
          <TelecomVisual />
          <CardText
            position="bottomLeft"
            title="Wholesale Carrier Access"
            description="Access leading connectivity providers through one wholesale platform built for MSPs.
"
          />
        </BentoCard>
      </div>
    </div>
  );
};

export default FeaturesGrid;