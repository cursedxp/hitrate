"use client";
import Link from "next/link";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Legal Notice (Impressum)
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Information pursuant to § 5 TMG
          </h2>
          <div className="text-gray-600 dark:text-gray-300">
            <p>HitMagnet</p>
            <p>Email: hello@hitmagnet.app</p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact
          </h2>
          <div className="text-gray-600 dark:text-gray-300">
            <p>Email: hello@hitmagnet.app</p>
            <p>Website: www.hitmagnet.app</p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Disclaimer
          </h2>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Liability for Content
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The content of this website has been created with the utmost care.
            However, no guarantee is given for the accuracy, completeness, or
            timeliness of the content. Any content that violates applicable laws
            will be removed immediately upon notification.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Liability for Links
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This website may contain links to external websites. We have no
            influence over the content of those external websites and,
            therefore, cannot accept any liability for their content. If you
            notice any issues with linked websites, please inform us so we can
            review and potentially remove those links.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The protection of our users' personal data is very important to us.
            For detailed information about how we collect, process, and store
            personal data, please refer to our{" "}
            <Link
              href="/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Copyright
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The content and works on this website are subject to German
            copyright law. Duplication, processing, distribution, or any other
            use outside the scope of copyright law requires the written consent
            of the respective author or creator.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Online Dispute Resolution
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The European Commission provides a platform for online dispute
            resolution between consumers and businesses, which you can access
            at:{" "}
            <Link
              href="https://ec.europa.eu/consumers/odr/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr/
            </Link>
          </p>
        </section>
      </div>

      <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
        Last updated: April 2024
      </div>
    </div>
  );
}
