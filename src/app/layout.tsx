import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maid-O-Bot",
  description:
    "Welcome to our AI-powered website builder with an integrated chatbot feature, revolutionizing how you connect and communicate. Our cutting-edge platform streamlines on-demand services, allowing you to find nearby maids, babysitters, and service providers effortlessly. Whether you're a homeowner seeking services or a service provider showcasing your expertise, our user-friendly registration process caters to all. Our chatbot, backed by advanced NLP technology, offers personalized experiences, providing real-time information and assistance. Empowering local communities, our platform fosters connections and offers safety through verification processes. Create stunning websites easily with our customizable templates. Join us on this transformative journey, unlocking the future of website building and communication. Experience convenience, efficiency, and seamless interactions with our AI-powered website builder and chatbot today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
