import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container">
      <div className="flex flex-col gap-7 font-poppins my-16">{children}</div>
    </div>
  );
};
