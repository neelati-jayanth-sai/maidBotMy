import { AppMockups } from "@/components/AppMockups";
import { Hero } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Container>
        <Hero />
        <Separator />
        <AppMockups />
      </Container>
    </>
  );
}
