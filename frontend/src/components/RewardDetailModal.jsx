import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiX,
  FiCheck,
  FiAlertCircle,
  FiGift,
  FiCalendar,
  FiMapPin,
  FiInfo,
  FiLock,
} from "react-icons/fi";
import { useRewardsStore } from "../store/rewardsStore";

const RewardDetailModal = ({ isOpen, onClose, reward }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const points = useRewardsStore((state) => state.points);
  const redeemReward = useRewardsStore((state) => state.redeemReward);

  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [pinError, setPinError] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redemptionStatus, setRedemptionStatus] = useState(null); // 'success' or 'error'

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!isOpen) {
      // Reset states when modal closes
      setShowPinModal(false);
      setPin(["", "", "", ""]);
      setPinError("");
      setRedemptionStatus(null);
    }
  }, [isOpen]);

  if (!reward) return null;

  const canRedeem = points >= reward.points && !reward.redeemed;

  const handleRedeemClick = () => {
    if (!canRedeem) return;
    setShowPinModal(true);
  };

  const handlePinChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setPinError("");

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d+$/.test(pastedData)) {
      const newPin = pastedData.split("").concat(["", "", "", ""]).slice(0, 4);
      setPin(newPin);
      const lastFilledIndex = Math.min(pastedData.length - 1, 3);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleSubmitPin = async () => {
    const enteredPin = pin.join("");

    if (enteredPin.length !== 4) {
      setPinError(t("rewards.enterCompletePIN"));
      return;
    }

    setIsRedeeming(true);
    setPinError("");

    // Simulate PIN verification (in real app, this would be API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Dummy validation: accept "1234" or any 4-digit PIN for demo
    const isValidPin = enteredPin === "1234" || enteredPin.length === 4;

    if (isValidPin) {
      // Redeem the reward
      redeemReward(reward.id);
      setRedemptionStatus("success");
      setTimeout(() => {
        setShowPinModal(false);
        setTimeout(() => {
          onClose();
        }, 2000);
      }, 2000);
    } else {
      setRedemptionStatus("error");
      setPinError(t("rewards.incorrectPIN"));
      setPin(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    }

    setIsRedeeming(false);
  };

  const closePinModal = () => {
    setShowPinModal(false);
    setPin(["", "", "", ""]);
    setPinError("");
    setRedemptionStatus(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Main Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-0 top-0 bottom-0 z-50 overflow-y-auto"
          >
            <div className="min-h-screen px-4 py-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg mx-auto overflow-hidden">
                {/* Header with Gradient */}
                <div className="relative">
                  <div
                    className="h-48 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 relative"
                    style={{
                      backgroundImage: reward.image
                        ? `linear-gradient(rgba(139, 92, 246, 0.8), rgba(219, 39, 119, 0.8)), url(${reward.image})`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <button
                      onClick={onClose}
                      className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
                    >
                      <FiX className="w-6 h-6 text-white" />
                    </button>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {isArabic ? reward.titleAr : reward.title}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-semibold">
                          {reward.points} {t("rewards.points")}
                        </span>
                        {reward.redeemed && (
                          <span className="bg-green-500 px-3 py-1 rounded-full text-white text-xs font-semibold">
                            {t("rewards.redeemed")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <FiInfo className="w-5 h-5 text-primary" />
                      {t("rewards.details")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {isArabic ? reward.descriptionAr : reward.description}
                    </p>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {t("rewards.termsConditions")}
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <FiCalendar className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                        <span>
                          {t("rewards.validUntil")}:{" "}
                          {reward.validUntil || "Dec 31, 2024"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiMapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                        <span>
                          {isArabic
                            ? "صالح في جميع فروع عمان"
                            : "Valid at all Oman locations"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiGift className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                        <span>
                          {isArabic
                            ? "لا يمكن استخدامه مع عروض أخرى"
                            : "Cannot be combined with other offers"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiInfo className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                        <span>
                          {isArabic
                            ? "غير قابل للاسترداد النقدي"
                            : "Non-refundable and non-transferable"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Your Points */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t("rewards.yourPoints")}
                        </p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {points} {t("rewards.points")}
                        </p>
                      </div>
                      {canRedeem ? (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <FiCheck className="w-5 h-5" />
                          <span className="font-semibold text-sm">
                            {t("rewards.eligible")}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <FiAlertCircle className="w-5 h-5" />
                          <span className="font-semibold text-sm">
                            {reward.redeemed
                              ? t("rewards.alreadyRedeemed")
                              : t("rewards.insufficientPoints")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleRedeemClick}
                      disabled={!canRedeem}
                      className={`w-full py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                        canRedeem
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <FiGift className="w-5 h-5" />
                      {t("rewards.redeemNow")}
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {t("common.close")}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PIN Modal */}
          <AnimatePresence>
            {showPinModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4"
                onClick={(e) => {
                  if (e.target === e.currentTarget && !isRedeeming) {
                    closePinModal();
                  }
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  {redemptionStatus === "success" ? (
                    // Success State
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <FiCheck className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {t("rewards.redemptionSuccess")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t("rewards.couponSentToEmail")}
                      </p>
                    </motion.div>
                  ) : redemptionStatus === "error" ? (
                    // Error State
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="w-20 h-20 mx-auto mb-6 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <FiAlertCircle className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {t("rewards.redemptionFailed")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {pinError}
                      </p>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRedemptionStatus(null)}
                        className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                      >
                        {t("rewards.tryAgain")}
                      </motion.button>
                    </motion.div>
                  ) : (
                    // PIN Entry State
                    <>
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                          <FiLock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {t("rewards.enterPIN")}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t("rewards.pinDescription")}
                        </p>
                      </div>

                      {/* PIN Input */}
                      <div
                        className="flex justify-center gap-3 mb-6"
                        onPaste={handlePaste}
                      >
                        {pin.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="tel"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handlePinChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            disabled={isRedeeming}
                            className={`w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all ${
                              pinError
                                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                : digit
                                ? "border-primary bg-green-50 dark:bg-green-900/20"
                                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                            } focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none`}
                          />
                        ))}
                      </div>

                      {/* Error Message */}
                      <AnimatePresence>
                        {pinError && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2"
                          >
                            <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                            <p className="text-sm text-red-600 dark:text-red-400">
                              {pinError}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Hint */}
                      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-6">
                        {t("rewards.pinHint")}
                      </p>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSubmitPin}
                          disabled={pin.some((d) => !d) || isRedeeming}
                          className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                            pin.every((d) => d) && !isRedeeming
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {isRedeeming ? (
                            <span className="flex items-center justify-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                              {t("rewards.verifying")}
                            </span>
                          ) : (
                            t("rewards.confirm")
                          )}
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={closePinModal}
                          disabled={isRedeeming}
                          className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                        >
                          {t("common.cancel")}
                        </motion.button>
                      </div>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default RewardDetailModal;
