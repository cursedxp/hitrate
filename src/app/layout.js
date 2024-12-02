import "./globals.css";
import ThemeProvider from "./components/themeProvider/themeProvider";
import NextAuthSessionProvider from "./components/sessionProvider/sessionProvider";
import StoreProvider from "./redux/storeProvider";

export const metadata = {
  title: "HitMagnet",
  description: "YouTube thumbnail optimization tool",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: { url: "/favicon.ico" },
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
