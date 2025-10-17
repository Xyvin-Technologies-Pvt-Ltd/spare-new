import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiPackage, FiHelpCircle } from "react-icons/fi";
import { formatCurrency, formatDateTime } from "../utils/currency";
import TrackOrderModal from "../components/TrackOrderModal";

// Dummy orders data
const dummyOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-10-15T14:30:00",
    status: "shipped",
    items: [
      { name: "Fresh Milk", nameAr: "حليب طازج", quantity: 2 },
      { name: "Bread", nameAr: "خبز", quantity: 1 },
    ],
    total: 3.45,
    active: true,
  },
  {
    id: "ORD-2024-002",
    date: "2024-10-12T10:15:00",
    status: "pending",
    items: [
      { name: "Fresh Bananas", nameAr: "موز طازج", quantity: 1 },
      { name: "Greek Yogurt", nameAr: "زبادي يوناني", quantity: 2 },
    ],
    total: 2.9,
    active: true,
  },
  {
    id: "ORD-2024-003",
    date: "2024-10-08T16:45:00",
    status: "delivered",
    items: [
      { name: "Chicken Breast", nameAr: "صدور دجاج", quantity: 1 },
      { name: "Fresh Vegetables", nameAr: "خضروات طازجة", quantity: 1 },
    ],
    total: 5.65,
    active: false,
  },
  {
    id: "ORD-2024-004",
    date: "2024-10-05T12:20:00",
    status: "delivered",
    items: [{ name: "Mixed Groceries", nameAr: "بقالة متنوعة", quantity: 10 }],
    total: 25.45,
    active: false,
  },
];

const Orders = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("active");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const isArabic = i18n.language === "ar";

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setIsTrackingModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400";
      case "shipped":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400";
      case "delivered":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const filteredOrders = dummyOrders.filter((order) =>
    activeTab === "active" ? order.active : !order.active
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Tabs */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {t("orders.title")}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("active")}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-colors ${
                activeTab === "active"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {t("orders.active")}
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-colors ${
                activeTab === "past"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {t("orders.past")}
            </button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-3 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <FiPackage className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
              {t("orders.noOrders")}
            </p>
          </div>
        ) : (
          filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {t("orders.orderNumber")}
                      {order.id}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDateTime(order.date, isArabic ? "ar-OM" : "en-OM")}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {t(`orders.${order.status}`)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                  {t("orders.items")}:
                </p>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <p
                      key={index}
                      className="text-xs text-gray-700 dark:text-gray-300"
                    >
                      {item.quantity}x {isArabic ? item.nameAr : item.name}
                    </p>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                      {t("cart.total")}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                  {order.active && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTrackOrder(order)}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors shadow-sm"
                    >
                      {t("orders.trackOrder")}
                    </motion.button>
                  )}
                </div>

                {/* Help Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FiHelpCircle className="w-4 h-4" />
                  {t("orders.needHelp")}
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Track Order Modal */}
      <TrackOrderModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default Orders;
