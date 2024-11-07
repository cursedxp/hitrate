"use client";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              HitMagnet, located at{" "}
              <Link
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                https://hitmagnet.app
              </Link>
              , is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and share your information when you
              use our platform. By accessing HitMagnet, you agree to the
              practices described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We collect information to provide, improve, and protect our
              services. The types of information we collect include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>
                <strong>Personal Information:</strong> When you sign in using
                Google authentication, we collect your name, email address, and
                profile picture for account creation and identity verification.
              </li>
              <li>
                <strong>Uploaded Content:</strong> Any files (e.g., YouTube
                thumbnails) that you upload are stored securely in our cloud
                infrastructure for use within the platform.
              </li>
              <li>
                <strong>Usage Data:</strong> We collect information on how you
                interact with HitMagnet, including pages visited, features used,
                and interaction frequency, to improve user experience and
                optimize our services.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The information we collect is used for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>
                <strong>Platform Functionality:</strong> Your Google account
                data allows you to securely log in and access features. Uploaded
                content (e.g., thumbnails) is used within the platform for
                comparison purposes.
              </li>
              <li>
                <strong>Service Improvement:</strong> We analyze usage data and
                patterns to enhance our platform's performance, user experience,
                and functionality.
              </li>
              <li>
                <strong>AI-Based Features:</strong> For users utilizing our AI
                title generation feature, data entered is processed to provide
                title suggestions. This data is not stored beyond the generation
                process and is solely for your personal use within the platform.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use cookies and similar tracking technologies to enhance your
              experience on HitMagnet. Cookies are small files stored on your
              device that allow us to remember your preferences and provide a
              seamless experience. The types of cookies we use include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>Essential Cookies: Necessary for login and navigation.</li>
              <li>
                Performance Cookies: Help us understand how users interact with
                our platform.
              </li>
              <li>
                Functional Cookies: Store user preferences to personalize your
                experience.
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For detailed cookie preferences or to manage your cookies, you may
              refer to your browser settings. Please note that disabling cookies
              may impact your experience on our platform.
            </p>
          </section>

          {/* Continue with sections 5-10 using the same pattern... */}

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              For questions or concerns about this Privacy Policy, or if you
              wish to exercise your rights, please contact us at:
            </p>
            <ul className="list-none pl-6 text-gray-600 dark:text-gray-300 mb-4">
              <li>
                Email:{" "}
                <Link
                  href="mailto:hello@hitmagnet.app"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  hello@hitmagnet.app
                </Link>
              </li>
              <li>
                Website:{" "}
                <Link
                  href="/"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  https://hitmagnet.app
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          Last updated: April 2024
        </div>
      </div>
    </div>
  );
}
