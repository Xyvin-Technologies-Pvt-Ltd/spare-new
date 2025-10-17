import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiGift } from "react-icons/fi";

const RewardCard = ({ offer, onRedeem, userPoints }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const canRedeem = userPoints >= offer.pointsRequired;

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
    >
      <div className="relative h-32">
        <img
          src={offer.image}
          alt={isArabic ? offer.offerAr : offer.offer}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
          {offer.category}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-xl">{offer.logo}</span>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">
              {isArabic ? offer.merchantAr : offer.merchant}
            </h4>
            <p className="text-accent font-semibold text-sm">
              {isArabic ? offer.offerAr : offer.offer}
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {isArabic ? offer.descriptionAr : offer.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-primary">
            <FiGift className="w-4 h-4" />
            <span className="font-bold text-sm">{offer.pointsRequired}</span>
            <span className="text-xs">{t("rewards.points")}</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onRedeem(offer)}
            disabled={!canRedeem}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              canRedeem
                ? "bg-primary text-white hover:bg-green-700"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            {t("rewards.redeem")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RewardCard;
