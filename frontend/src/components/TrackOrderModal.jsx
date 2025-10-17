import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiX,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiMapPin,
  FiPhone,
  FiClock,
  FiUser,
} from "react-icons/fi";
import { formatCurrency, formatDateTime } from "../utils/currency";

const TrackOrderModal = ({ isOpen, onClose, order }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  if (!order) return null;

  // Order tracking steps
  const getTrackingSteps = () => {
    const allSteps = [
      {
        id: 1,
        status: "confirmed",
        title: t("tracking.orderConfirmed"),
        titleAr: "تم تأكيد الطلب",
        time: order.date,
        icon: FiCheckCircle,
        completed: true,
      },
      {
        id: 2,
        status: "processing",
        title: t("tracking.processing"),
        titleAr: "قيد التجهيز",
        time:
          order.processingTime ||
          new Date(new Date(order.date).getTime() + 30 * 60000).toISOString(),
        icon: FiPackage,
        completed: order.status !== "pending",
      },
      {
        id: 3,
        status: "shipped",
        title: t("tracking.outForDelivery"),
        titleAr: "في الطريق للتوصيل",
        time:
          order.shippedTime ||
          new Date(
            new Date(order.date).getTime() + 2 * 60 * 60000
          ).toISOString(),
        icon: FiTruck,
        completed: order.status === "shipped" || order.status === "delivered",
      },
      {
        id: 4,
        status: "delivered",
        title: t("tracking.delivered"),
        titleAr: "تم التوصيل",
        time: order.deliveredTime,
        icon: FiCheckCircle,
        completed: order.status === "delivered",
      },
    ];

    return allSteps;
  };

  const steps = getTrackingSteps();
  const currentStepIndex = steps.findIndex((step) => !step.completed);
  const activeStep =
    currentStepIndex === -1 ? steps.length - 1 : currentStepIndex;

  // Delivery info
  const deliveryInfo = {
    driver: "Ahmed Al Balushi",
    driverAr: "أحمد البلوشي",
    phone: "+968 9123 4567",
    vehicle: "Toyota Hilux - 12345",
    estimatedTime: "30-45 min",
    estimatedTimeAr: "30-45 دقيقة",
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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-0 top-0 bottom-0 z-50 overflow-y-auto"
          >
            <div className="min-h-screen px-4 py-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg mx-auto overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-green-600 p-6 text-white relative">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <FiPackage className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">
                        {t("tracking.orderId")}
                      </p>
                      <p className="text-lg font-bold">{order.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">
                        {t("tracking.orderDate")}
                      </p>
                      <p className="font-semibold">
                        {formatDateTime(
                          order.date,
                          isArabic ? "ar-OM" : "en-OM"
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90">
                        {t("tracking.totalAmount")}
                      </p>
                      <p className="text-xl font-bold">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tracking Steps */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                    {t("tracking.trackingStatus")}
                  </h3>

                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

                    {/* Steps */}
                    <div className="space-y-8">
                      {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === activeStep;
                        const isCompleted = step.completed;

                        return (
                          <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex gap-4"
                          >
                            {/* Icon Circle */}
                            <div
                              className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                                isCompleted
                                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                                  : isActive
                                  ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/30 animate-pulse"
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                              }`}
                            >
                              <Icon className="w-6 h-6" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-1">
                              <div className="flex items-start justify-between mb-1">
                                <h4
                                  className={`font-semibold ${
                                    isCompleted || isActive
                                      ? "text-gray-900 dark:text-white"
                                      : "text-gray-400 dark:text-gray-500"
                                  }`}
                                >
                                  {isArabic ? step.titleAr : step.title}
                                </h4>
                                {isActive && (
                                  <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                                    {t("tracking.inProgress")}
                                  </span>
                                )}
                              </div>

                              {step.time && isCompleted && (
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                  <FiClock className="w-3 h-3" />
                                  <span>
                                    {formatDateTime(
                                      step.time,
                                      isArabic ? "ar-OM" : "en-OM"
                                    )}
                                  </span>
                                </div>
                              )}

                              {isActive && order.status === "shipped" && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
                                >
                                  <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold mb-2">
                                    {t("tracking.estimatedArrival")}
                                  </p>
                                  <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                                    <FiClock className="w-4 h-4" />
                                    <span>
                                      {isArabic
                                        ? deliveryInfo.estimatedTimeAr
                                        : deliveryInfo.estimatedTime}
                                    </span>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Delivery Driver Info (Only show when shipped) */}
                {order.status === "shipped" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-6 mb-6 p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border border-green-100 dark:border-gray-600"
                  >
                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FiUser className="w-5 h-5 text-primary" />
                      {t("tracking.deliveryDriver")}
                    </h4>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t("tracking.driver")}
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {isArabic
                              ? deliveryInfo.driverAr
                              : deliveryInfo.driver}
                          </p>
                        </div>
                        <motion.a
                          whileTap={{ scale: 0.95 }}
                          href={`tel:${deliveryInfo.phone}`}
                          className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                        >
                          <FiPhone className="w-5 h-5" />
                        </motion.a>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {t("tracking.vehicle")}
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {deliveryInfo.vehicle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Delivery Address */}
                <div className="mx-6 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FiMapPin className="w-5 h-5 text-primary" />
                    {t("tracking.deliveryAddress")}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isArabic
                      ? "شارع السلطان قابوس، الخوير، مسقط، عمان"
                      : "Sultan Qaboos Street, Al Khuwair, Muscat, Oman"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    +968 9123 4567
                  </p>
                </div>

                {/* Order Items */}
                <div className="mx-6 mb-6">
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3">
                    {t("tracking.orderItems")} ({order.items.length})
                  </h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                            <span className="text-primary font-bold">
                              {item.quantity}x
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {isArabic ? item.nameAr : item.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiMapPin className="w-5 h-5" />
                    {t("tracking.viewOnMap")}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TrackOrderModal;
