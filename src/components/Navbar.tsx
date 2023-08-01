import { FC } from "react";
import List from "./navbar/List";
import Logo from "./navbar/Logo";
import { navList1 } from "./navbar/navList";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <div className="sticky z-10 top-0 text-sm bg-primary text-primary-foreground w-full py-5">
      <div className="container flex justify-between ">
        <div className="flex items-center gap-10">
          <Logo />
          <List list={navList1} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
