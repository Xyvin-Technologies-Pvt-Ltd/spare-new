import { useState } from "react";
import { motion } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";

const QuantitySelector = ({
  initialQuantity = 1,
  onQuantityChange,
  min = 1,
  max = 99,
  size = "default",
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const sizeClasses = {
    small: "w-6 h-6 text-xs",
    default: "w-8 h-8 text-sm",
    large: "w-10 h-10 text-base",
  };

  const buttonSize = sizeClasses[size] || sizeClasses.default;

  return (
    <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={`${buttonSize} rounded-full flex items-center justify-center transition-colors ${
          quantity <= min
            ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
        }`}
      >
        <FiMinus className="w-3 h-3" />
      </motion.button>

      <span className="font-semibold text-gray-900 dark:text-white min-w-[1.5rem] text-center text-xs">
        {quantity}
      </span>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={`${buttonSize} rounded-full flex items-center justify-center transition-colors ${
          quantity >= max
            ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
        }`}
      >
        <FiPlus className="w-3 h-3" />
      </motion.button>
    </div>
  );
};

export default QuantitySelector;
