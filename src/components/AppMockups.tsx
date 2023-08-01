import Image from "next/image";
import { FC } from "react";

export const AppMockups: FC = () => {
  return (
    <div className="flex bg-emerald-100 p-16 rounded-xl mt-16 gap-16 flex-col">
      <div className="flex justify-between">
        <Image
          src="/assets/ui1.png"
          width={375}
          height={812}
          alt=""
          className="rounded-lg"
        />
        <Image
          src="/assets/ui2.png"
          width={375}
          height={812}
          alt=""
          className="rounded-lg"
        />
        <Image
          src="/assets/ui3.png"
          width={375}
          height={812}
          alt=""
          className="rounded-lg"
        />
      </div>
      <h1 className="text-center text-4xl font-extrabold">
        It&apos;s never been this easy to get a{" "}
        <span className="text-sky-600">Maid</span>
      </h1>
    </div>
  );
};
