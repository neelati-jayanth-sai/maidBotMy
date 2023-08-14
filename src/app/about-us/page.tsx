import { AppMockups } from "@/components/AppMockups";
import { Container } from "@/components/ui/container";
import React, { FC } from "react";

const AboutUsPage: FC = () => {
  return (
    <Container>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Welcome to Our Revolutionary Service
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Say goodbye to traditional hassles and hello to a seamless and
          efficient process. Our cutting-edge chatbot, powered by advanced
          natural language processing (NLP), works seamlessly with WhatsApp,
          allowing you to communicate effortlessly. Whether you need a maid for
          home cleaning, babysitting, or elderly care, our chatbot streamlines
          the process by understanding your needs and locating nearby maids for
          you.
        </p>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Registering is simple and quick - just send us a WhatsApp message, and
          you're on your way to finding the perfect maid. Empowering local
          communities, our platform fosters connections and ensures safety
          through verification processes. Experience the ease of finding your
          next maid, all through a simple WhatsApp message. Join us today and
          discover the future of service connections!
        </p>
      </div>
      <AppMockups />
    </Container>
  );
};

export default AboutUsPage;
