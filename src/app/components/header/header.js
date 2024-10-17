import AuthButton from "../authButton/authButton";
import { motion } from "framer-motion";
import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-white">
      <div className="flex items-center justify-center h-20 ">
        <nav className="flex items-center justify-between h-full w-full max-w-7xl">
          <div className="text-2xl font-bold uppercase tracking-widest">
            HitMagnet
          </div>
          <ul className="flex items-center space-x-8">
            {["Home", "Features", "Pricing", "Contact"].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  href={`/${item.toLowerCase()}`}
                >
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}
