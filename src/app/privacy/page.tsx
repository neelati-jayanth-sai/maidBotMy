import { AppMockups } from "@/components/AppMockups";
import { Container } from "@/components/ui/container";
import React, { FC } from "react";

const PrivacyPage: FC = () => {
  return (
    <Container>
      <div className="py-10 w-full flex">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and safeguard your personal information when you use
            our service. By accessing or using our service, you agree to the
            terms outlined in this Privacy Policy.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-gray-900">
            Information We Collect
          </h2>
          <p className="mt-2 text-gray-500">
            We collect personal information that you provide to us through
            WhatsApp, such as names, phone numbers, and location data. For
            maids, we collect Aadhar card details as part of verification.
            Additionally, we store chat data for research purposes.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-gray-900">
            How We Use Your Information
          </h2>
          <p className="mt-2 text-gray-500">
            We use your information to provide and personalize our services,
            including connecting users with maids. Chat data may be used for
            research and improvement purposes. We do not share your personal
            information with third parties.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-gray-900">
            Data Retention
          </h2>
          <p className="mt-2 text-gray-500">
            We retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy. This includes
            providing services, resolving disputes, and maintaining accurate
            records.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-gray-900">
            Data Security
          </h2>
          <p className="mt-2 text-gray-500">
            We implement security measures to protect your personal information
            from unauthorized access, alteration, disclosure, or destruction.
            Sensitive information is stored in encrypted form.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-gray-900">
            User Rights
          </h2>
          <p className="mt-2 text-gray-500">
            You have the right to access, modify, or delete your personal
            information. If you wish to do so, please contact us at
            info@maid-o-bot.com. We will respond to your request within 30 days.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-gray-900">
            Children&apos;s Privacy
          </h2>
          <p className="mt-2 text-gray-500">
            Our service is not intended for children. We do not knowingly
            collect personal information from individuals under the age of 18.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-gray-900">
            Third-Party Services
          </h2>
          <p className="mt-2 text-gray-500">
            We use Twilio for WhatsApp integration. They may collect or process
            user data. Please refer to Twilio&apos;s Privacy Policy for more
            information.
          </p>

          {/* Add more sections as needed */}
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPage;
