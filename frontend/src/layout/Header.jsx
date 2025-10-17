import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "../store/cartStore";
import { motion } from "framer-motion";
import logoImage from "../assets/logo.jpg";

const Header = ({ showSearch = true, title, onBack }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 safe-top">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo / Back Button / Title */}
        <div className="flex items-center gap-3 flex-1">
          {onBack ? (
            <button
              onClick={onBack}
              className="tap-target flex items-center justify-center"
              aria-label={t("common.back")}
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <img
                src={logoImage}
                alt="SPAR Oman"
                className="w-10 h-10 object-contain rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold text-primary">SPAR</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Oman</p>
              </div>
            </div>
          )}

          {title && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}
        </div>

        {/* Search Icon */}
        {showSearch && !title && (
          <button
            onClick={() => navigate("/search")}
            className="tap-target p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            aria-label={t("home.search")}
          >
            <FiSearch className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
        )}

        {/* Cart Icon with Badge */}
        <button
          onClick={() => navigate("/cart")}
          className="tap-target relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          aria-label={t("nav.cart")}
        >
          <FiShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          {itemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {itemCount > 9 ? "9+" : itemCount}
            </motion.span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
