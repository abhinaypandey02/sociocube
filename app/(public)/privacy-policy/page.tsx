// PrivacyPolicy.js
import { Metadata } from "next";
import React from "react";

import { getSEO } from "@/constants/seo";

function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8 text-gray-800 sm:py-16 lg:px-8">
      <h2 className="mb-4 text-3xl font-semibold">Privacy Policy</h2>
      <p className="mb-8 text-sm text-gray-500">
        Last updated: 06 November 2024
      </p>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">1. Introduction</h2>
        <p>
          At Sociocube, accessible from{" "}
          <a
            className="text-blue-600 hover:underline"
            href="https://sociocube.com"
          >
            sociocube.com
          </a>
          , we are committed to protecting your privacy. This Privacy Policy
          outlines our practices regarding the collection, use, and disclosure
          of your information when you use our service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">
          2. Information We Collect
        </h2>
        <p>
          We collect both personal and non-personal information to provide and
          improve our services. This may include:
        </p>
        <ul className="ml-6 list-disc">
          <li>
            Personal details such as name, email, and location when you register
            on our platform.
          </li>
          <li>
            Account details from your Instagram account, if connected, including
            public profile information.
          </li>
          <li>
            Usage data such as interactions on our platform and IP address.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">
          3. How We Use Your Information
        </h2>
        <p>The information we collect is used to:</p>
        <ul className="ml-6 list-disc">
          <li>Provide, maintain, and improve our platform services.</li>
          <li>Facilitate collaborations between influencers and brands.</li>
          <li>
            Analyze user activity to improve user experience and platform
            performance.
          </li>
          <li>
            Communicate with you about updates, promotional offers, and other
            relevant information.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">
          4. Sharing of Information
        </h2>
        <p>
          We do not share your personal information with third parties except in
          the following cases:
        </p>
        <ul className="ml-6 list-disc">
          <li>
            With brands and influencers on the platform to facilitate
            connections and collaborations.
          </li>
          <li>
            With service providers who assist us in operating the platform
            (e.g., hosting, analytics).
          </li>
          <li>
            When required by law or to protect our rights and users’ safety.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">5. Data Security</h2>
        <p>
          We implement reasonable security measures to protect your personal
          information. However, please note that no method of transmission over
          the Internet or electronic storage is 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">
          6. Cookies and Tracking Technologies
        </h2>
        <p>
          Sociocube uses cookies and similar technologies to enhance your
          experience, analyze usage, and provide targeted content. You can
          manage cookie preferences through your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">7. Children's Privacy</h2>
        <p>
          Sociocube is not intended for users under the age of 13. We do not
          knowingly collect information from children under 13. If we discover
          that we have collected information from a child under 13, we will take
          steps to delete it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">
          8. Changes to This Privacy Policy
        </h2>
        <p>
          We may update our Privacy Policy from time to time. Any changes will
          be posted on this page, and we encourage you to review it
          periodically. Your continued use of Sociocube after changes are posted
          signifies your acceptance of the revised policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">9. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <a
            className="text-blue-600 hover:underline"
            href="mailto:hello@sociocube.com"
          >
            hello@sociocube.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
export const metadata: Metadata = getSEO("Privacy Policy");
