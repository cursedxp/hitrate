import AuthButton from "../authButton/authButton";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const router = useRouter();

  useEffect(() => {
    // Check if there's a hash in the URL when the component mounts
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Small delay to ensure the page has rendered
    }
  }, []);

  const handleNavigation = (section) => {
    if (window.location.pathname === "/") {
      // If on home page, scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on different page, navigate to home with hash
      router.push(`/#${section}`);
    }
  };

  const navigationItems = [
    { name: "Home", action: "/" },
    { name: "Features", action: () => handleNavigation("features") },
    { name: "Pricing", action: () => handleNavigation("pricing") },
    { name: "Contact", action: "mailto:hello@hitmagnet.app" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="flex items-center justify-center h-20">
        <nav className="flex items-center justify-between h-full w-full max-w-7xl px-4">
          <div className="text-2xl font-bold uppercase tracking-widest">
            <Image
              src="/images/logo.svg"
              alt="HitMagnet"
              width={200}
              height={40}
              priority
            />
          </div>
          <ul className="flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {typeof item.action === "function" ? (
                  <button
                    onClick={item.action}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    href={item.action}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}
