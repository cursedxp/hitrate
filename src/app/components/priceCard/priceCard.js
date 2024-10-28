import { motion, AnimatePresence } from "framer-motion";
import { Check } from "react-feather";
import { loadStripe } from "@stripe/stripe-js";
import useSubscribe from "@/app/hooks/useSubscribe";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PriceCard({ isYearly }) {
  const { handleSubscribe, isLoading } = useSubscribe({
    monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    yearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
  });

  const features = [
    "Unlimited thumbnails",
    "Advanced analytics",
    "Priority support",
  ];

  const onSubscribeClick = () => {
    handleSubscribe(isYearly);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl  shadow-md p-10 max-w-sm w-full mt-10 mb-20 relative"
    >
      {isYearly && (
        <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-tr-2xl rounded-bl-2xl text-sm font-semibold">
          Most Popular
        </div>
      )}
      <h2 className="text-3xl text-left mb-4">HitMagnet Pro</h2>
      <p className="text-md text-gray-500 text-left mb-6">
        Unlock the full potential of HitMagnet and create eye-catching
        thumbnails that drive clicks and views.
      </p>
      <div className="text-left h-24 flex flex-col  ">
        <AnimatePresence mode="wait">
          <motion.span
            key={isYearly ? "yearly" : "monthly"}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="text-4xl flex items-center"
          >
            {isYearly ? "100$ " : "10$ "}
            <span className="text-gray-600 text-sm ml-2">
              /{isYearly ? " Year" : " Month"}
            </span>
          </motion.span>
        </AnimatePresence>

        <AnimatePresence>
          {isYearly && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-green-500 mt-1"
            >
              Save $20 per year
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <ul className="mb-10 space-y-4">
        {features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} />
        ))}
      </ul>
      <motion.button
        onClick={onSubscribeClick}
        disabled={isLoading}
        className={`w-full ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        } text-white rounded-2xl py-4 font-semibold transition duration-300`}
        whileHover={!isLoading ? { scale: 1.05 } : {}}
        whileTap={!isLoading ? { scale: 0.95 } : {}}
      >
        {isLoading ? "Processing..." : "Subscribe Now"}
      </motion.button>
    </motion.div>
  );
}

const FeatureItem = ({ feature }) => {
  return (
    <li className="flex items-center">
      <Check className="h-5 w-5 text-green-500 mr-3" />
      {feature}
    </li>
  );
};
