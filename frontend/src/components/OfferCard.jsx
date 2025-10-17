import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const OfferCard = ({ offer, onApply }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-4 border border-accent/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{offer.logo}</span>
            <h4 className="font-bold text-gray-900 dark:text-white">
              {isArabic ? offer.bankAr : offer.bank}
            </h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {isArabic ? offer.descriptionAr : offer.description}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-accent">
              {offer.discount}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              OFF
            </span>
          </div>
        </div>

        {onApply && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onApply(offer)}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            Apply
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default OfferCard;
