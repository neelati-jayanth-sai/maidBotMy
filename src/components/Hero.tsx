import Image from "next/image";
import { FC } from "react";
import { Icon } from "./ui/icon";

export const Hero: FC = () => {
  return (
    <div className="flex justify-between items-center gap-10">
      <h1 className="text-8xl font-extrabold leading-tight">
        Your next <span className="text-sky-600">Maid</span> is just one{" "}
        <span className="text-emerald-500">WhatsApp</span> message away
      </h1>
      <Image src="/assets/ui.png" width={309} height={386} alt={""} />
    </div>
  );
};
