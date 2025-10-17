import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiGift, FiInfo } from "react-icons/fi";
import { useRewardsStore } from "../store/rewardsStore";
import { merchantOffers } from "../data/rewards";
import RewardCard from "../components/RewardCard";
import RewardDetailModal from "../components/RewardDetailModal";

const Rewards = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [selectedReward, setSelectedReward] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const points = useRewardsStore((state) => state.points);
  const getCurrentTier = useRewardsStore((state) => state.getCurrentTier);
  const getPointsToNextTier = useRewardsStore(
    (state) => state.getPointsToNextTier
  );

  const currentTier = getCurrentTier();
  const pointsToNext = getPointsToNextTier();

  const handleRedeemClick = (offer) => {
    setSelectedReward(offer);
    setIsModalOpen(true);
  };

  return (
    <div className="pb-4">
      {/* Points Balance Card */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${currentTier.color} 0%, ${currentTier.color}CC 100%)`,
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <FiGift className="w-6 h-6" />
              <span className="text-white/80 text-sm font-semibold">
                {isArabic ? currentTier.nameAr : currentTier.name}{" "}
                {t("rewards.title")}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-5xl font-bold mb-1">
                {points.toLocaleString()}
              </p>
              <p className="text-white/80">{t("rewards.availablePoints")}</p>
            </div>
            {pointsToNext > 0 && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-sm text-white/90">
                  {pointsToNext} points to next tier
                </p>
              </div>
            )}
          </div>

          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full" />
        </motion.div>
      </div>

      {/* How to Earn Points */}
      <div className="px-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 flex items-start gap-3"
        >
          <FiInfo className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
              {t("rewards.howToEarn")}
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {t("rewards.earnDescription")}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Merchant Offers */}
      <div className="px-4 mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t("rewards.merchantOffers")}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {merchantOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <RewardCard
                offer={offer}
                onRedeem={() => handleRedeemClick(offer)}
                userPoints={points}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reward Detail Modal */}
      <RewardDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reward={selectedReward}
      />
    </div>
  );
};

export default Rewards;
