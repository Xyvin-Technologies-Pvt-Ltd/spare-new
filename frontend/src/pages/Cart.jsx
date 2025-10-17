import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiMapPin,
  FiEdit2,
  FiCalendar,
  FiCreditCard,
  FiDollarSign,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import { useCartStore } from "../store/cartStore";
import { useRewardsStore } from "../store/rewardsStore";
import { formatCurrency } from "../utils/currency";
import { bankOffers } from "../data/offers";
import { getFeaturedProducts } from "../data/products";
import OfferCard from "../components/OfferCard";

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
  const clearCart = useCartStore((state) => state.clearCart);

  const earnPoints = useRewardsStore((state) => state.earnPoints);
  const points = useRewardsStore((state) => state.points);

  // Default address (in real app, this would come from user store)
  const defaultAddress = {
    name: "Home",
    street: "Sultan Qaboos Street",
    area: "Al Khuwair",
    city: "Muscat",
    phone: "+968 9123 4567",
  };

  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("morning");
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const vatRate = 0.05;
  const vat = (subtotal - discount) * vatRate;
  const deliveryFee = subtotal > 10 ? 0 : 1.5;
  const total = subtotal - discount + vat + deliveryFee;

  const pointsToEarn = Math.floor(total);

  const deliveryDates = [
    {
      id: "today",
      label: t("cart.today"),
      date: new Date().toLocaleDateString(),
    },
    {
      id: "tomorrow",
      label: t("cart.tomorrow"),
      date: new Date(Date.now() + 86400000).toLocaleDateString(),
    },
  ];

  const timeSlots = [
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

  const paymentMethods = [
    { id: "cod", label: t("cart.cashOnDelivery"), icon: FiDollarSign },
    { id: "card", label: t("cart.creditCard"), icon: FiCreditCard },
  ];

  const recommendedProducts = getFeaturedProducts().slice(0, 6);

  const handleApplyOffer = (offer) => {
    if (appliedOffer?.id === offer.id) {
      removeOffer();
    } else {
      applyOffer({ ...offer, type: "percentage" });
    }
  };

  const handleProceedOrder = async () => {
    if (selectedPayment === "cod") {
      setIsProcessing(true);
      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Earn points
      earnPoints(pointsToEarn, "Purchase at SPAR", "شراء من سبار");

      setIsProcessing(false);
      clearCart();
      navigate("/orders", { replace: true });
    } else {
      // For card payment, navigate to payment page with order details
      navigate("/payment", {
        state: {
          total,
          subtotal,
          discount,
          vat,
          deliveryFee,
          pointsToEarn,
          selectedDate,
          selectedTimeSlot,
          items,
        },
      });
    }
  };

  const scrollCarousel = (direction) => {
    const container = document.getElementById("carousel-container");
    if (container) {
      const scrollAmount = 200;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
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

      <div className="">
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

        {/* You May Also Like Carousel */}
        <div className="px-3 py-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {t("cart.youMayLike")}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {isArabic ? (
                  <FiChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                ) : (
                  <FiChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                )}
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {isArabic ? (
                  <FiChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                ) : (
                  <FiChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>
          <div
            id="carousel-container"
            className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {recommendedProducts.map((product) => {
              const productName = isArabic ? product.nameAr : product.name;
              return (
                <motion.div
                  key={product.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="flex-shrink-0 w-32 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={productName}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2">
                    <h4 className="text-xs font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
                      {productName}
                    </h4>
                    <p className="text-sm font-bold text-primary">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="px-3 py-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {t("cart.orderSummary")}
            </h3>

            <div className="space-y-1.5 text-xs">
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

              <div className="border-t border-gray-200 dark:border-gray-700 pt-1.5 flex justify-between text-sm font-bold text-gray-900 dark:text-white">
                <span>{t("cart.total")}</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
            </div>

            {subtotal < 10 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2 mt-2">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  {t("cart.freeDeliveryNote", {
                    amount: formatCurrency(10 - subtotal),
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bank Offers */}
        <div className="px-3 py-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
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

        {/* Delivery Address */}
        <div className="px-3 py-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-primary" />
                {t("cart.deliveryAddress")}
              </h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/settings")}
                className="flex items-center gap-1 text-primary text-xs font-semibold"
              >
                <FiEdit2 className="w-3 h-3" />
                {t("cart.change")}
              </motion.button>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <p className="font-semibold text-gray-900 dark:text-white">
                {defaultAddress.name}
              </p>
              <p>
                {defaultAddress.street}, {defaultAddress.area}
              </p>
              <p>{defaultAddress.city}</p>
              <p className="mt-1">{defaultAddress.phone}</p>
            </div>
          </div>
        </div>

        {/* Schedule Delivery */}
        <div className="px-3 py-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FiCalendar className="w-4 h-4 text-primary" />
              {t("cart.scheduleDelivery")}
            </h3>

            {/* Date Selection */}
            <div className="mb-3">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {t("cart.selectDate")}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {deliveryDates.map((date) => (
                  <motion.button
                    key={date.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDate(date.id)}
                    className={`p-2 rounded-lg border-2 transition-colors ${
                      selectedDate === date.id
                        ? "border-primary bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      {date.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {date.date}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {t("cart.selectTime")}
              </p>
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <motion.button
                    key={slot.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTimeSlot(slot.id)}
                    className={`w-full p-2 rounded-lg border-2 transition-colors ${
                      selectedTimeSlot === slot.id
                        ? "border-primary bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{slot.icon}</span>
                      <div className="flex-1 text-left">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white">
                          {slot.label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {slot.time}
                        </p>
                      </div>
                      {selectedTimeSlot === slot.id && (
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-white"
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
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="px-3 py-2 mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FiCreditCard className="w-4 h-4 text-primary" />
              {t("cart.payment")}
            </h3>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <motion.button
                    key={method.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full p-2 rounded-lg border-2 transition-colors ${
                      selectedPayment === method.id
                        ? "border-primary bg-green-50 dark:bg-green-900/20"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon
                          className={`w-4 h-4 ${
                            selectedPayment === method.id
                              ? "text-primary"
                              : "text-gray-400"
                          }`}
                        />
                        <p className="text-xs font-semibold text-gray-900 dark:text-white">
                          {method.label}
                        </p>
                      </div>
                      {selectedPayment === method.id && (
                        <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-white"
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
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 z-50">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleProceedOrder}
          disabled={isProcessing}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              {t("cart.processing")}
            </>
          ) : (
            <>
              <span>
                {selectedPayment === "cod"
                  ? t("cart.placeOrder")
                  : t("cart.proceedToPayment")}
              </span>
              <span className="font-bold">{formatCurrency(total)}</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Cart;
