import { AppMockups } from "@/components/AppMockups";
import { ContactUsForm } from "@/components/ContactUsForm";
import { Container } from "@/components/ui/container";
import React, { FC } from "react";

const ContactUsPage: FC = () => {
  return (
    <Container>
      <ContactUsForm />
    </Container>
  );
};

export default ContactUsPage;
