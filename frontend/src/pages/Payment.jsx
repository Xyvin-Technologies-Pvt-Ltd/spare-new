import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCreditCard,
  FiLock,
  FiCheck,
  FiAlertCircle,
  FiEdit2,
} from "react-icons/fi";
import { useCartStore } from "../store/cartStore";
import { useRewardsStore } from "../store/rewardsStore";
import { formatCurrency } from "../utils/currency";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clearCart = useCartStore((state) => state.clearCart);
  const earnPoints = useRewardsStore((state) => state.earnPoints);

  // Get order details from navigation state
  const orderDetails = location.state || {};
  const {
    total = 0,
    subtotal = 0,
    discount = 0,
    vat = 0,
    deliveryFee = 0,
    pointsToEarn = 0,
  } = orderDetails;

  // Default saved card (in real app, this would come from backend/store)
  const defaultCard = {
    id: 1,
    cardNumber: "4532 **** **** 1234",
    cardHolder: "JOHN DOE",
    expiryDate: "12/25",
    cardType: "Visa",
  };

  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleCvvChange = (e) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
      setErrors({});
    }
  };

  const handlePayment = async () => {
    if (cvv.length !== 3) {
      setErrors({ cvv: t("payment.cvvRequired") });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success (90% success rate for demo)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      setPaymentStatus("success");
      earnPoints(pointsToEarn, "Purchase at SPAR", "شراء من سبار");

      setTimeout(() => {
        clearCart();
        navigate("/orders", { replace: true });
      }, 2000);
    } else {
      setPaymentStatus("error");
      setIsProcessing(false);
    }
  };

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
          >
            <FiCheck className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("payment.paymentSuccessful")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t("payment.orderConfirmed")}
          </p>
          <p className="text-primary font-semibold">
            {t("payment.redirecting")}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-4">
      <div className="p-3">
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-3 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            {t("cart.orderSummary")}
          </h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>{t("cart.subtotal")}</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400 font-semibold">
                <span>{t("cart.discount")}</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>{t("cart.vat")} (5%)</span>
              <span>{formatCurrency(vat)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>{t("cart.deliveryFee")}</span>
              <span>
                {deliveryFee === 0
                  ? t("cart.free")
                  : formatCurrency(deliveryFee)}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-1.5 flex justify-between text-sm font-bold text-gray-900 dark:text-white">
              <span>{t("cart.total")}</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Payment Error */}
        <AnimatePresence>
          {paymentStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-3 flex items-start gap-2"
            >
              <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-900 dark:text-red-200 mb-1">
                  {t("payment.paymentFailed")}
                </p>
                <p className="text-xs text-red-700 dark:text-red-300">
                  {t("payment.tryAgain")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Default Card Display */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {t("payment.paymentCard")}
            </h3>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/payment-methods")}
              className="flex items-center gap-1 text-primary text-xs font-semibold"
            >
              <FiEdit2 className="w-3 h-3" />
              {t("cart.change")}
            </motion.button>
          </div>

          {/* Default Card */}
          <div className="rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white relative overflow-hidden">
              {/* Decorative Circles */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-10 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white opacity-10 rounded-full" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <FiCreditCard className="w-6 h-6" />
                  <p className="text-xs font-semibold uppercase tracking-wider">
                    {defaultCard.cardType}
                  </p>
                </div>

                <p className="text-lg font-bold tracking-wider mb-4">
                  {defaultCard.cardNumber}
                </p>

                <div className="flex items-end justify-between text-xs">
                  <p className="font-semibold">{defaultCard.cardHolder}</p>
                  <p className="font-semibold">{defaultCard.expiryDate}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 px-3 py-2">
              <p className="text-xs text-primary font-semibold">
                {t("payment.defaultCard")}
              </p>
            </div>
          </div>
        </div>

        {/* CVV Entry */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FiLock className="w-4 h-4 text-primary" />
            {t("payment.enterCvv")}
          </h3>
          <div className="max-w-[200px] mx-auto">
            <input
              type="tel"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="***"
              maxLength={3}
              className={`w-full px-4 py-4 rounded-xl border-2 transition-colors ${
                errors.cvv
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-gray-200 dark:border-gray-700"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none text-center text-2xl font-bold tracking-widest`}
              autoFocus
            />
            {errors.cvv && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-2 text-center">
                {errors.cvv}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              {t("payment.cvvHelp")}
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <FiLock className="w-4 h-4 text-primary" />
          <p>{t("payment.secureNote")}</p>
        </div>
      </div>

      {/* Pay Button */}
      <div className="fixed bottom-20 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 z-40">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handlePayment}
          disabled={isProcessing || cvv.length !== 3}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              {t("payment.processing")}
            </>
          ) : (
            <>
              <FiLock className="w-5 h-5" />
              <span>
                {t("payment.payNow")} {formatCurrency(total)}
              </span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Payment;
