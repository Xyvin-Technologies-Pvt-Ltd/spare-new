import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiPlus, FiStar, FiMinus } from "react-icons/fi";
import { motion } from "framer-motion";
import { useCartStore } from "../store/cartStore";
import { formatCurrency } from "../utils/currency";

const ProductCard = ({ product, showQuantitySelector = false }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const items = useCartStore((state) => state.items);
  const isArabic = i18n.language === "ar";

  const cartItem = items.find((item) => item.id === product.id);
  const [showControls, setShowControls] = useState(!!cartItem);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (showQuantitySelector) {
      setShowControls(true);
      addItem(product, 1);
    } else {
      addItem(product);
    }
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    decrementQuantity(product.id);
    if (cartItem && cartItem.quantity <= 1) {
      setShowControls(false);
    }
  };

  const name = isArabic ? product.nameAr : product.name;
  const unit = isArabic ? product.unitAr : product.unit;

  return (
    <motion.div
      onClick={() => !showControls && navigate(`/product/${product.id}`)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow w-full"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {product.halal && (
          <div className="absolute top-1 right-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
            حلال
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {t("product.outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2.5">
        <h3 className="font-medium text-xs text-gray-900 dark:text-white line-clamp-2 mb-1 leading-tight">
          {name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <FiStar className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {product.rating}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-primary">
              {formatCurrency(product.price)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">/{unit}</p>
          </div>

          {product.inStock && (
            <div className="flex items-center gap-1 ml-2">
              {showControls ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  className="flex items-center gap-1 bg-primary rounded-full px-2 py-1"
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDecrement}
                    className="w-5 h-5 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors"
                  >
                    <FiMinus className="w-3 h-3 text-white" />
                  </motion.button>
                  <span className="font-semibold text-white min-w-[1.5rem] text-center text-xs px-1">
                    {cartItem?.quantity || 1}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleIncrement}
                    className="w-5 h-5 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors"
                  >
                    <FiPlus className="w-3 h-3 text-white" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToCart}
                  className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                  aria-label={t("product.addToCart")}
                >
                  <FiPlus className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
