import React, { useId } from "react";
import { motion } from "motion/react";
import {
  SearchCheck,
  PackageCheck,
  Activity,
} from "lucide-react";

const FLOW_CYCLE = 4.2;
const LEFT_FLOW_DELAY = 0;
const API_OUT_DELAY = 1.35;
const FINAL_OUT_DELAY = 1.75;
const VERTICAL_FLOW_DELAY = 1.35;

const useSafeId = (prefix) => {
  const id = useId().replace(/:/g, "");
  return `${prefix}-${id}`;
};

const getTimes = (delay, moveDuration) => {
  const start = Math.max(delay / FLOW_CYCLE, 0.001);
  const end = Math.min((delay + moveDuration) / FLOW_CYCLE, 0.98);
  return [0, start, end, 1];
};

const MotionGradient = ({
  id,
  direction = "horizontal",
  color = "var(--color-blue-500)",
  delay = 0,
  moveDuration = 1.05,
  reverse = false,
}) => {
  const times = getTimes(delay, moveDuration);

  if (direction === "vertical") {
    return (
      <motion.linearGradient
        id={id}
        gradientUnits="userSpaceOnUse"
        x1="0%"
        x2="0%"
        initial={
          reverse
            ? { y1: "105%", y2: "135%" }
            : { y1: "-35%", y2: "-5%" }
        }
        animate={
          reverse
            ? {
                y1: ["105%", "105%", "-35%", "-35%"],
                y2: ["135%", "135%", "-5%", "-5%"],
              }
            : {
                y1: ["-35%", "-35%", "95%", "95%"],
                y2: ["-5%", "-5%", "125%", "125%"],
              }
        }
        transition={{
          duration: FLOW_CYCLE,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          times,
        }}
      >
        <stop stopColor="var(--color-line)" />
        <stop offset="0.33" stopColor={color} />
        <stop offset="0.66" stopColor={color} />
        <stop offset="1" stopColor="var(--color-line)" />
      </motion.linearGradient>
    );
  }

  return (
    <motion.linearGradient
      id={id}
      gradientUnits="userSpaceOnUse"
      y1="0%"
      y2="0%"
      initial={{
        x1: "-35%",
        x2: "-5%",
      }}
      animate={{
        x1: ["-35%", "-35%", "95%", "95%"],
        x2: ["-5%", "-5%", "125%", "125%"],
      }}
      transition={{
        duration: FLOW_CYCLE,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        times,
      }}
    >
      <stop stopColor="var(--color-line)" />
      <stop offset="0.33" stopColor={color} />
      <stop offset="0.66" stopColor={color} />
      <stop offset="1" stopColor="var(--color-line)" />
    </motion.linearGradient>
  );
};


const MeetingSummarizerIcon = () => (
  <SearchCheck className="size-4" strokeWidth={1.9} />
);

const LiveTrafficIcon = () => (
  <IconWithLabel
    label="Traffic"
    icon={
      <img
        className="h-7"
        src="https://cdn-icons-png.freepik.com/256/17076/17076762.png?semt=ais_white_label"
        alt="Traffic"
      />
    }
  />
);

const CodeReviewerIcon = () => (
  <PackageCheck className="size-4" strokeWidth={1.9} />
);

const CustomerSupportIcon = () => (
  <Activity className="size-4" strokeWidth={1.9} />
);

const ApiIcon = () => (
  <div className="flex flex-col items-center justify-center gap-0.5 text-black dark:text-white">
    <img
      className="h-7"
      src="https://www.pngmart.com/files/23/Link-Icon-PNG-Photos.png"
      alt="API"
    />
    <span className="text-[8px] font-bold leading-none tracking-tight">
      API
    </span>
  </div>
);

const IconWithLabel = ({ icon, label }) => (
  <div className="flex flex-col items-center justify-center gap-0.5 text-black dark:text-white">
    {icon}
    {label && (
      <span className="text-[8px] font-semibold leading-none tracking-tight">
        {label}
      </span>
    )}
  </div>
);

const PSAIcon = () => (
  <IconWithLabel
    label="PSA"
    icon={
      <img
        className="h-7"
        src="https://cdn-icons-png.flaticon.com/512/6223/6223711.png"
        alt="PSA"
      />
    }
  />
);

const BillingIcon = () => (
  <IconWithLabel
    label="Billing"
    icon={
      <img
        className="h-7"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-rQ7MgZsDLfc71M7SSt6xQB8IEdhcn11llg&s"
        alt="Billing"
      />
    }
  />
);

const PortalIcon = () => (
  <IconWithLabel
    label="Portal"
    icon={
      <img
        className="h-7"
        src="https://cdn-icons-png.freepik.com/512/8661/8661352.png"
        alt="Portal"
      />
    }
  />
);

const AIIcon = () => (
  <IconWithLabel
    label="AI"
    icon={
      <img
        className="h-10"
        src="https://static.vecteezy.com/system/resources/previews/006/662/139/non_2x/artificial-intelligence-ai-processor-chip-icon-symbol-for-graphic-design-logo-web-site-social-media-mobile-app-ui-illustration-free-vector.jpg"
        alt="AI"
      />
    }
  />
);

const WebhookIcon = () => (
  <IconWithLabel
    label="Webhook"
    icon={
      <img
        className="h-7"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXGQWBgPLNmjfNp-yvEt92o40TQiuoe4Iojw&s"
        alt="Webhook"
      />
    }
  />
);

const IconBox = ({ children, className = "" }) => (
  <div
    className={`relative flex size-13 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-50 bg-white shadow-small2 dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
  >
    {children}
  </div>
);

const ApiNode = ({ className = "" }) => (
  <div
    className={`relative h-16 w-16 overflow-hidden rounded-md bg-gray-200 p-px shadow-xl dark:bg-neutral-700 ${className}`}
  >
    <div className="absolute inset-0 scale-[1.4] animate-spin rounded-full bg-conic [background-image:conic-gradient(at_center,transparent,var(--color-blue-500)_20%,transparent_30%)] [animation-duration:2s]" />
    <div className="absolute inset-0 scale-[1.4] animate-spin rounded-full [background-image:conic-gradient(at_center,transparent,var(--color-brand)_20%,transparent_30%)] [animation-delay:1s] [animation-duration:2s]" />

    <div className="relative z-20 flex h-full w-full items-center justify-center rounded-[5px] bg-white dark:bg-neutral-900">
      <ApiIcon />
    </div>
  </div>
);

const VerticalLine = ({
  color = "var(--color-brand)",
  delay = VERTICAL_FLOW_DELAY,
  reverse = false,
}) => {
  const gradientId = useSafeId("vertical-line-gradient");

  return (
    <svg
      width="1"
      height="81"
      viewBox="0 0 1 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <line
        x1="0.5"
        y1="0.5"
        x2="0.5"
        y2="80.5"
        stroke="var(--color-line)"
      />

      <line
        x1="0.5"
        y1="0.5"
        x2="0.5"
        y2="80.5"
        stroke={`url(#${gradientId})`}
      />

      <defs>
        <MotionGradient
          id={gradientId}
          direction="vertical"
          color={color}
          delay={delay}
          moveDuration={1}
          reverse={reverse}
        />
      </defs>
    </svg>
  );
};

const HorizontalLine = ({
  color = "var(--color-blue-500)",
  delay = API_OUT_DELAY,
}) => {
  const gradientId = useSafeId("horizontal-line-gradient");

  return (
    <svg
      width="314"
      height="2"
      viewBox="0 0 314 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0.5"
        y1="1"
        x2="313.5"
        y2="1"
        stroke="var(--color-line)"
        strokeLinecap="round"
      />

      <line
        x1="0.5"
        y1="1"
        x2="313.5"
        y2="1"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
      />

      <defs>
        <MotionGradient
          id={gradientId}
          direction="horizontal"
          color={color}
          delay={delay}
          moveDuration={1}
        />
      </defs>
    </svg>
  );
};

const ServiceQualificationLine = () => {
  const horizontalId = useSafeId("line-one-horizontal-gradient");
  const verticalId = useSafeId("line-one-vertical-gradient");

  return (
    <svg
      width="312"
      height="33"
      viewBox="0 0 312 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-2 -right-84"
    >
      <line
        x1="0.5"
        y1="1"
        x2="311.5"
        y2="1"
        stroke="var(--color-line)"
        strokeLinecap="round"
      />
      <line
        x1="311.5"
        y1="1"
        x2="311.5"
        y2="32"
        stroke="var(--color-line)"
        strokeLinecap="round"
      />

      <line
        x1="0.5"
        y1="1"
        x2="311.5"
        y2="1"
        stroke={`url(#${horizontalId})`}
        strokeLinecap="round"
      />
      <line
        x1="311.5"
        y1="1"
        x2="311.5"
        y2="32"
        stroke={`url(#${verticalId})`}
        strokeLinecap="round"
      />

      <defs>
        <MotionGradient
          id={horizontalId}
          direction="horizontal"
          color="var(--color-brand)"
          delay={LEFT_FLOW_DELAY}
          moveDuration={1}
        />
        <MotionGradient
          id={verticalId}
          direction="vertical"
          color="var(--color-brand)"
          delay={LEFT_FLOW_DELAY + 0.75}
          moveDuration={0.45}
        />
      </defs>
    </svg>
  );
};

const OrderProvisioningLine = () => {
  const gradientId = useSafeId("line-two-gradient");

  return (
    <svg
      width="323"
      height="2"
      viewBox="0 0 323 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-2 -right-84"
    >
      <line
        x1="0.5"
        y1="1"
        x2="322.5"
        y2="1"
        stroke="var(--color-line)"
        strokeLinecap="round"
      />

      <line
        x1="0.5"
        y1="1"
        x2="322.5"
        y2="1"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
      />

      <defs>
        <MotionGradient
          id={gradientId}
          direction="horizontal"
          color="var(--color-blue-500)"
          delay={LEFT_FLOW_DELAY}
          moveDuration={1}
        />
      </defs>
    </svg>
  );
};

const SupportDiagnosticsLine = () => {
  const horizontalId = useSafeId("line-three-horizontal-gradient");
  const verticalId = useSafeId("line-three-vertical-gradient");

  return (
    <svg
      width="326"
      height="32"
      viewBox="0 0 326 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -right-84 bottom-2"
    >
      <line y1="31" x2="325" y2="31" stroke="var(--color-line)" />

      <line
        x1="325.5"
        y1="1"
        x2="325.5"
        y2="31"
        stroke="var(--color-line)"
        strokeLinecap="round"
      />

      <line
        y1="31"
        x2="325"
        y2="31"
        stroke={`url(#${horizontalId})`}
      />

      <line
        x1="325.5"
        y1="1"
        x2="325.5"
        y2="31"
        stroke={`url(#${verticalId})`}
        strokeLinecap="round"
      />

      <defs>
        <MotionGradient
          id={horizontalId}
          direction="horizontal"
          color="var(--color-yellow-500)"
          delay={LEFT_FLOW_DELAY}
          moveDuration={1}
        />
        <MotionGradient
          id={verticalId}
          direction="vertical"
          reverse
          color="var(--color-yellow-500)"
          delay={LEFT_FLOW_DELAY + 0.75}
          moveDuration={0.45}
        />
      </defs>
    </svg>
  );
};

const MobileFlowLine = ({
  color = "var(--color-brand)",
  delay = 0,
  height = "h-9",
}) => (
  <div
    className={`relative mx-auto w-px overflow-hidden rounded-full bg-[var(--color-line)] ${height}`}
  >
    <motion.div
      className="absolute left-0 top-0 h-1/2 w-px rounded-full"
      style={{
        background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
      }}
      animate={{
        y: ["-100%", "220%"],
      }}
      transition={{
        duration: 1.45,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  </div>
);

const MobileServiceItem = ({ icon, label, color }) => (
  <div className="flex items-center gap-3 rounded-2xl  bg-white/80 px-3 py-2 shadow-border dark:border-neutral-800 dark:bg-neutral-900">
    <div
      className="flex size-6 shrink-0 items-center justify-center rounded-xl text-white"
      style={{ backgroundColor: color }}
    >
      {icon}
    </div>

    <span className="text-xs  text-neutral-800 dark:text-neutral-100">
      {label}
    </span>
  </div>
);

const MobileIntegrationCard = ({ children }) => (
  <div className="flex h-13 items-center justify-center rounded-2xl  bg-white/80 p-1 shadow-border dark:border-neutral-800 dark:bg-neutral-900">
    {children}
  </div>
);

const MobileAPI = () => {
  return (
    <div className="md:hidden mx-auto my-10 w-full max-w-sm px-4">

       

        <div className="relative z-10">
         

          <div className="space-y-2.5">
            <MobileServiceItem
              icon={<MeetingSummarizerIcon />}
              label="Service Qualification"
              color="var(--color-brand)"
            />
            <MobileServiceItem
              icon={<CodeReviewerIcon />}
              label="Order Provisioning"
              color="var(--color-blue-500)"
            />
            <MobileServiceItem
              icon={<CustomerSupportIcon />}
              label="Support & Diagnostics"
              color="var(--color-yellow-500)"
            />
          </div>

          <MobileFlowLine color="var(--color-brand)" delay={0.1} />

          <div className="flex justify-center">
            <ApiNode />
          </div>

          <MobileFlowLine color="var(--color-blue-500)" delay={0.35} />

          <div className="flex justify-center">
            <span className="rounded-full border border-green-500/30 bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-950/40 dark:text-green-400">
              Connected
            </span>
          </div>

          <MobileFlowLine
            color="var(--color-yellow-500)"
            delay={0.55}
            height="h-7"
          />

          <div className="grid grid-cols-2 gap-3">
            <MobileIntegrationCard>
              <PSAIcon />
            </MobileIntegrationCard>

            <MobileIntegrationCard>
              <BillingIcon />
            </MobileIntegrationCard>

            <MobileIntegrationCard>
              <PortalIcon />
            </MobileIntegrationCard>

            <MobileIntegrationCard>
              <AIIcon />
            </MobileIntegrationCard>

            <MobileIntegrationCard>
              <LiveTrafficIcon />
            </MobileIntegrationCard>

            <MobileIntegrationCard>
              <WebhookIcon />
            </MobileIntegrationCard>
          </div>
        </div>
      
    </div>
  );
};

const DesktopAPI = () => {
  return (
    <div className="relative mx-auto my-12 hidden h-full max-h-70 min-h-80 max-w-[67rem] grid-cols-2 p-4 md:grid">
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-10">
         
          <div className="relative flex items-center gap-2">
            <MeetingSummarizerIcon />
            <span className="text-charcoal-700 text-sm dark:text-neutral-200">
              Service Qualification
            </span>

            <ServiceQualificationLine />
          </div>

         
          <div className="relative flex items-center gap-2">
            <CodeReviewerIcon />
            <span className="text-charcoal-700 text-sm dark:text-neutral-200">
              Order Provisioning
            </span>

            <OrderProvisioningLine />
          </div>

        
          <div className="relative flex items-center gap-2">
            <CustomerSupportIcon />
            <span className="text-charcoal-700 text-sm dark:text-neutral-200">
              Support & Diagnostics
            </span>

            <SupportDiagnosticsLine />
          </div>
        </div>

        
        <ApiNode className="-mr-4" />
      </div>

     
      <div className="relative flex h-full w-full items-center justify-start">
        <HorizontalLine color="var(--color-brand)" delay={API_OUT_DELAY} />

        <div className="relative flex flex-col items-center gap-2">
          <span className="relative z-20 rounded-sm border border-green-500 bg-green-50 px-2 py-0.5 text-xs text-green-500 dark:bg-blue-900 dark:text-white">
            Connected
          </span>

        
          <div className="absolute inset-x-0 -top-30 flex h-full flex-col items-center">
            <IconBox>
              <PSAIcon />
            </IconBox>

            <VerticalLine
              color="var(--color-brand)"
              delay={VERTICAL_FLOW_DELAY}
            />

            <VerticalLine
              color="var(--color-blue-500)"
              delay={VERTICAL_FLOW_DELAY + 0.25}
              reverse
            />

            <IconBox>
              <BillingIcon />
            </IconBox>
          </div>
        </div>

       
        <div className="absolute -top-4 right-30 flex h-full flex-col items-center">
          <IconBox>
            <PortalIcon />
          </IconBox>

          <VerticalLine
            color="var(--color-yellow-500)"
            delay={VERTICAL_FLOW_DELAY}
          />

          <IconBox>
            <AIIcon />
          </IconBox>

          <VerticalLine
            color="var(--color-brand)"
            delay={VERTICAL_FLOW_DELAY + 0.25}
            reverse
          />

          <IconBox>
            <LiveTrafficIcon />
          </IconBox>
        </div>

        <HorizontalLine color="var(--color-blue-500)" delay={FINAL_OUT_DELAY} />

     
        <IconBox>
          <WebhookIcon />
        </IconBox>
      </div>
    </div>
  );
};

export default function ApiVisual() {
  return (
    <div
      style={{
        "--color-line": "#e5e7eb",
        "--color-blue-500": "#3b82f6",
        "--color-brand": "#F17463",
        "--color-yellow-500": "#eab308",
      }}
    >
      <MobileAPI />
      <DesktopAPI />
    </div>
  );
}