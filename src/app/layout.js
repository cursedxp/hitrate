import "./globals.css";
import ThemeProvider from "./components/themeProvider/themeProvider";
import NextAuthSessionProvider from "./components/sessionProvider/sessionProvider";
import StoreProvider from "./redux/storeProvider";

export const metadata = {
  title: "HitMagnet - YouTube Thumbnail & Title A/B Testing Tool",
  description:
    "Preview YouTube thumbnails and titles in real-time, generate AI-powered titles, and organize content with our Chrome extension. Compare with competitors and maximize your click-through rates.",
  keywords: [
    // Core Preview Features
    "YouTube thumbnail preview",
    "YouTube title testing",
    "real-time content preview",
    "YouTube layout comparison",

    // Search & Compare Features
    "YouTube search preview",
    "competitor analysis",
    "niche research",
    "content comparison",

    // Shuffle Features
    "thumbnail layout testing",
    "content arrangement",
    "visual optimization",

    // AI Features
    "AI title generation",
    "engagement optimization",
    "click-through rate improvement",

    // Chrome Extension Features
    "thumbnail collection",
    "content organization",
    "competitor tracking",
    "YouTube research tool",
  ].join(", "),
  openGraph: {
    title: "HitMagnet - YouTube Content Optimization Platform",
    description:
      "Create better YouTube content with real-time previews, AI title generation, and competitor analysis. Test thumbnails across multiple formats.",
    url: "https://hitmagnet.app",
    siteName: "HitMagnet",
    images: [
      {
        url: "/hitrate/public/images/og-image.jpg", // Make sure to create this image
        width: 1200,
        height: 630,
        alt: "HitMagnet YouTube Optimization Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HitMagnet - YouTube Content Optimization Platform",
    description:
      "Create better YouTube content with real-time previews, AI title generation, and competitor analysis. Test thumbnails across multiple formats.",
    images: ["/hitrate/public/images/og-image.jpg"],
    creator: "@hitmagnet",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://hitmagnet.app",
  },
  other: {
    "google-site-verification": "Ye1ckVo1MOqy_SYVNeK2CQEmPGO_LVKgx6npHBiy7Hg",
    "msvalidate.01": "FA7B586FDCEED385CE54AF4BD29BBEB8", // Add your Bing verification code if needed
  },
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <NextAuthSessionProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </NextAuthSessionProvider>
    </StoreProvider>
  );
}
