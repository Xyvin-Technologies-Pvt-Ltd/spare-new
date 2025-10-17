import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiCreditCard, FiCheck } from "react-icons/fi";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useRewardsStore } from "../store/rewardsStore";
import { formatCurrency } from "../utils/currency";
import { bankOffers } from "../data/offers";
import OfferCard from "../components/OfferCard";
import Header from "../layout/Header";

const Checkout = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const user = useAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const earnPoints = useRewardsStore((state) => state.earnPoints);
  const applyOffer = useCartStore((state) => state.applyOffer);
  const appliedOffer = useCartStore((state) => state.appliedOffer);

  const [selectedAddress, setSelectedAddress] = useState(
    user?.addresses[0]?.id || 1
  );
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = getTotal();

  const handleApplyOffer = (offer) => {
    if (appliedOffer?.id === offer.id) {
      // Remove offer if already applied
      applyOffer(null);
    } else {
      applyOffer({ ...offer, type: "percentage" });
    }
  };

  const handlePlaceOrder = () => {
    // Earn points (1 point per OMR)
    const points = Math.floor(total);
    earnPoints(points, "Purchase at SPAR", "شراء من سبار");

    setOrderPlaced(true);

    // Clear cart and navigate after animation
    setTimeout(() => {
      clearCart();
      navigate("/orders");
    }, 2000);
  };

  if (items.length === 0 && !orderPlaced) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title={t("checkout.title")} onBack={() => navigate("/cart")} />

      <AnimatePresence mode="wait">
        {orderPlaced ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-6"
            >
              <FiCheck className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("checkout.orderPlaced")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {t("orders.trackOrder")}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="checkout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-32"
          >
            {/* Order Summary */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t("checkout.orderSummary")}
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 space-y-3">
                {items.map((item) => {
                  const name = isArabic ? item.nameAr : item.name;
                  return (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.quantity}x {name}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  );
                })}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">
                    {t("cart.total")}
                  </span>
                  <span className="font-bold text-primary text-lg">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t("checkout.deliveryAddress")}
              </h3>
              <div className="space-y-3">
                {user?.addresses.map((address) => (
                  <motion.div
                    key={address.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedAddress(address.id)}
                    className={`bg-white dark:bg-gray-800 rounded-2xl p-4 cursor-pointer transition-all ${
                      selectedAddress === address.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <FiMapPin className="w-5 h-5 text-primary mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {isArabic ? address.nameAr : address.name}
                          </h4>
                          {address.isDefault && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {isArabic ? address.streetAr : address.street}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {isArabic ? address.cityAr : address.city}
                        </p>
                      </div>
                      {selectedAddress === address.id && (
                        <FiCheck className="w-6 h-6 text-primary" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Special Offers */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t("home.offers")}
              </h3>
              <div className="space-y-3">
                {bankOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className={`cursor-pointer ${
                      appliedOffer?.id === offer.id
                        ? "ring-2 ring-primary rounded-xl"
                        : ""
                    }`}
                    onClick={() => handleApplyOffer(offer)}
                  >
                    <OfferCard offer={offer} />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t("checkout.paymentMethod")}
              </h3>
              <div className="space-y-3">
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod("card")}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-4 cursor-pointer transition-all ${
                    paymentMethod === "card" ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FiCreditCard className="w-6 h-6 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t("checkout.creditCard")}
                      </h4>
                    </div>
                    {paymentMethod === "card" && (
                      <FiCheck className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod("cod")}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-4 cursor-pointer transition-all ${
                    paymentMethod === "cod" ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💵</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t("checkout.cashOnDelivery")}
                      </h4>
                    </div>
                    {paymentMethod === "cod" && (
                      <FiCheck className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod("points")}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-4 cursor-pointer transition-all ${
                    paymentMethod === "points" ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎁</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t("checkout.loyaltyPoints")}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        1,245 {t("rewards.points")}{" "}
                        {t("rewards.availablePoints")}
                      </p>
                    </div>
                    {paymentMethod === "points" && (
                      <FiCheck className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Place Order Button */}
      {!orderPlaced && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 safe-bottom z-50">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handlePlaceOrder}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            {t("checkout.placeOrder")} - {formatCurrency(total)}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
