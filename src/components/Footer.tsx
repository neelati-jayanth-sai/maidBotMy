import { FC } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export const Footer: FC = () => {
  return (
    <section className="py-4 bg-primary text-primary-foreground">
      <div className="container flex justify-between items-center">
        <p>
          &copy; {new Date().getFullYear()} Maid-O-Bot. All rights reserved.
        </p>
        <Link href={"/privacy"} passHref>
          <Button>Privacy Policy</Button>
        </Link>
      </div>
    </section>
  );
};
