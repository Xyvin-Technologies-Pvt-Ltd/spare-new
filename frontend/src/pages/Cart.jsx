import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiTruck,
  FiClock,
  FiMapPin,
  FiGift,
  FiTag,
  FiChevronRight,
} from "react-icons/fi";
import { useCartStore } from "../store/cartStore";
import { useRewardsStore } from "../store/rewardsStore";
import { formatCurrency } from "../utils/currency";
import { bankOffers } from "../data/offers";
import { getFeaturedProducts } from "../data/products";
import OfferCard from "../components/OfferCard";
import ProductCard from "../components/ProductCard";

const Cart = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const items = useCartStore((state) => state.items);
  const appliedOffer = useCartStore((state) => state.appliedOffer);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const applyOffer = useCartStore((state) => state.applyOffer);
  const removeOffer = useCartStore((state) => state.removeOffer);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getDiscount = useCartStore((state) => state.getDiscount);
  const getTotal = useCartStore((state) => state.getTotal);

  const points = useRewardsStore((state) => state.points);

  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState("morning");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const vatRate = 0.05; // 5% VAT
  const vat = (subtotal - discount) * vatRate;
  const deliveryFee = subtotal > 10 ? 0 : 1.5; // Free delivery over 10 OMR
  const total = subtotal - discount + vat + deliveryFee;

  // Points to earn (1 point per OMR)
  const pointsToEarn = Math.floor(total);

  const deliverySlots = [
    {
      id: "morning",
      label: t("cart.morning"),
      time: "8:00 AM - 12:00 PM",
      icon: "🌅",
    },
    {
      id: "afternoon",
      label: t("cart.afternoon"),
      time: "12:00 PM - 4:00 PM",
      icon: "☀️",
    },
    {
      id: "evening",
      label: t("cart.evening"),
      time: "4:00 PM - 8:00 PM",
      icon: "🌙",
    },
  ];

  const recommendedProducts = getFeaturedProducts().slice(0, 4);

  const handleApplyOffer = (offer) => {
    if (appliedOffer?.id === offer.id) {
      removeOffer();
    } else {
      applyOffer({ ...offer, type: "percentage" });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] px-4">
          <FiShoppingBag className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("cart.empty")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
            {t("cart.continueShopping")}
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/home")}
            className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
          >
            {t("cart.startShopping")}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Cart Title */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("cart.title")} ({items.length})
        </h1>
      </div>

      <div className="pb-48">
        {/* Cart Items */}
        <div className="p-3 space-y-2">
          <AnimatePresence>
            {items.map((item) => {
              const name = isArabic ? item.nameAr : item.name;
              const unit = isArabic ? item.unitAr : item.unit;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {formatCurrency(item.price)} / {unit}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => decrementQuantity(item.id)}
                            className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                          >
                            <FiMinus className="w-3 h-3 text-gray-700 dark:text-gray-200" />
                          </motion.button>
                          <span className="font-semibold text-gray-900 dark:text-white min-w-[1.5rem] text-center text-sm">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => incrementQuantity(item.id)}
                            className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                          >
                            <FiPlus className="w-3 h-3 text-gray-700 dark:text-gray-200" />
                          </motion.button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary text-sm">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Price Breakdown */}
        <div className="px-3 py-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
              {t("cart.orderSummary")}
            </h3>

            <div className="space-y-2 text-sm">
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
                <span
                  className={
                    deliveryFee === 0 ? "text-green-600 font-semibold" : ""
                  }
                >
                  {deliveryFee === 0
                    ? t("cart.free")
                    : formatCurrency(deliveryFee)}
                </span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                <span>{t("cart.total")}</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
            </div>

            {subtotal < 10 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2 mt-3">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  {t("cart.freeDeliveryNote", {
                    amount: formatCurrency(10 - subtotal),
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Points to Earn */}
        <div className="px-3 py-2">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
            onClick={() => navigate("/rewards")}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FiGift className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {t("cart.earnPoints")}
                </p>
                <p className="text-white text-opacity-90 text-xs">
                  +{pointsToEarn} {t("cart.points")} •{" "}
                  {t("cart.currentBalance")}: {points}
                </p>
              </div>
            </div>
            <FiChevronRight className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        {/* Bank Offers */}
        <div className="px-3 py-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <FiTag className="w-4 h-4 text-primary" />
            {t("cart.applyOffer")}
          </h3>
          <div className="space-y-2">
            {bankOffers.slice(0, 2).map((offer) => (
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

        {/* Delivery Slots */}
        <div className="px-3 py-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FiClock className="w-4 h-4 text-primary" />
            {t("cart.scheduleDelivery")}
          </h3>
          <div className="space-y-2">
            {deliverySlots.map((slot) => (
              <motion.div
                key={slot.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDeliverySlot(slot.id)}
                className={`bg-white dark:bg-gray-800 rounded-xl p-3 cursor-pointer border-2 transition-colors ${
                  selectedDeliverySlot === slot.id
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{slot.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">
                        {slot.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {slot.time}
                      </p>
                    </div>
                  </div>
                  {selectedDeliverySlot === slot.id && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="px-3 py-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FiMapPin className="w-4 h-4 text-primary" />
            {t("cart.deliveryAddress")}
          </h3>
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/checkout")}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 cursor-pointer border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                  <FiMapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    {selectedAddress
                      ? selectedAddress
                      : t("cart.selectAddress")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t("cart.tapToChange")}
                  </p>
                </div>
              </div>
              <FiChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </motion.div>
        </div>

        {/* You May Like */}
        <div className="px-3 py-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            {t("cart.youMayLike")}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {recommendedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showQuantitySelector={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Proceed to Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 safe-bottom z-50">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/checkout")}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg text-sm flex items-center justify-between px-4"
        >
          <span>{t("cart.proceedToCheckout")}</span>
          <span className="flex items-center gap-2">
            <span className="font-bold">{formatCurrency(total)}</span>
            <FiTruck className="w-5 h-5" />
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default Cart;
