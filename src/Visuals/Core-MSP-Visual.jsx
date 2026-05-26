import React from "react";
import { OrbitingCircles } from "../Components/OrbitingCircles";
import {
  Router,
  PhoneCall,
  DatabaseBackup,
  Server,
  Globe2,
  ShieldCheck,
  HardDrive,
  Mail,
  RadioTower,
} from "lucide-react";

const CoreVisual = () => {
  return (
    <OrbitingCircles>
      <ServiceIcon icon={<Router className="size-5" strokeWidth={1.5} />} />
      <ServiceIcon icon={<PhoneCall className="size-5" strokeWidth={1.5} />} />
      <ServiceIcon
        icon={<DatabaseBackup className="size-5" strokeWidth={1.5} />}
      />
      <ServiceIcon icon={<Server className="size-5" strokeWidth={1.5} />} />
      <ServiceIcon icon={<Globe2 className="size-5" strokeWidth={1.5} />} />
      <ServiceIcon
        icon={<ShieldCheck className="size-5" strokeWidth={1.5} />}
      />
      <ServiceIcon icon={<HardDrive className="size-5" strokeWidth={1.5} />} />
      <ServiceIcon icon={<Mail className="size-5" strokeWidth={1.5} />} />
      <ServiceIcon icon={<RadioTower className="size-5" strokeWidth={1.5} />} />
    </OrbitingCircles>
  );
};

export default CoreVisual;

const ServiceIcon = ({ icon }) => {
  return (
    <div
      className="
        relative flex size-12 items-center justify-center rounded-full
        bg-white shadow-small2 ring-1 ring-white/80
        sm:size-14
        xl:size-15
      "
    >
      {icon}
    </div>
  );
};
