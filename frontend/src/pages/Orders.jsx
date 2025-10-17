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
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredOrders = dummyOrders.filter((order) =>
    activeTab === "active" ? order.active : !order.active
  );

  return (
    <div className="pb-4">
      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-4 font-semibold transition-colors ${
              activeTab === "active"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {t("orders.active")}
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 py-4 font-semibold transition-colors ${
              activeTab === "past"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {t("orders.past")}
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FiPackage className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-center">
              {t("orders.noOrders")}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {t("orders.orderNumber")}
                    {order.id}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {t(`orders.${order.status}`)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDateTime(order.date, isArabic ? "ar-OM" : "en-OM")}
                </p>
              </div>

              {/* Order Items */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                {order.items.map((item, index) => (
                  <p
                    key={index}
                    className="text-sm text-gray-600 dark:text-gray-400 mb-1"
                  >
                    {item.quantity}x {isArabic ? item.nameAr : item.name}
                  </p>
                ))}
              </div>

              {/* Order Footer */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {t("cart.total")}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(order.total)}
                  </p>
                </div>

                <div className="flex gap-2">
                  {order.active && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTrackOrder(order)}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                    >
                      {t("orders.trackOrder")}
                    </motion.button>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <FiHelpCircle className="w-4 h-4" />
                    {t("orders.needHelp")}
                  </motion.button>
                </div>
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
