import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FiMessageCircle,
  FiPhone,
  FiMail,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
} from "react-icons/fi";

const HelpSupport = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [tickets, setTickets] = useState([
    {
      id: "TKT-001",
      orderId: "ORD-2024-001",
      subject: "Order Delivery Delay",
      subjectAr: "تأخير في توصيل الطلب",
      message: "My order hasn't arrived yet",
      messageAr: "لم يصل طلبي بعد",
      status: "open",
      date: "2024-10-17T10:30:00",
      response: null,
    },
    {
      id: "TKT-002",
      orderId: "ORD-2024-003",
      subject: "Wrong Item Delivered",
      subjectAr: "تم توصيل منتج خاطئ",
      message: "Received different product than ordered",
      messageAr: "استلمت منتج مختلف عن الطلب",
      status: "resolved",
      date: "2024-10-15T14:20:00",
      response:
        "We apologize for the inconvenience. A replacement has been sent.",
      responseAr: "نعتذر عن الإزعاج. تم إرسال بديل.",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400";
      case "resolved":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return FiClock;
      case "resolved":
        return FiCheckCircle;
      default:
        return FiAlertCircle;
    }
  };

  return (
    <div className="pb-4">
      <div className="p-3">
        {/* Contact Options */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 px-1">
            {t("support.contactUs")}
          </h2>
          <div className="grid grid-cols-3 gap-2">
            <motion.a
              whileTap={{ scale: 0.95 }}
              href="tel:+96824123456"
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <FiPhone className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {t("support.phone")}
              </p>
            </motion.a>

            <motion.a
              whileTap={{ scale: 0.95 }}
              href="mailto:support@spar.om"
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <FiMail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {t("support.email")}
              </p>
            </motion.a>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                <FiMessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                {t("support.chat")}
              </p>
            </motion.button>
          </div>
        </div>

        {/* New Ticket Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full mb-4 p-4 bg-primary text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <FiPlus className="w-5 h-5" />
          {t("support.newTicket")}
        </motion.button>

        {/* Tickets Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 px-1">
            {t("support.yourTickets")}
          </h2>

          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <FiMessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t("support.noTickets")}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => {
                const StatusIcon = getStatusIcon(ticket.status);
                return (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
                  >
                    {/* Ticket Header */}
                    <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs font-bold text-gray-900 dark:text-white">
                              {ticket.id}
                            </p>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(
                                ticket.status
                              )}`}
                            >
                              <StatusIcon className="w-3 h-3 inline mr-1" />
                              {t(`support.${ticket.status}`)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {t("support.order")}: {ticket.orderId}
                          </p>
                        </div>
                      </div>

                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                        {isArabic ? ticket.subjectAr : ticket.subject}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {isArabic ? ticket.messageAr : ticket.message}
                      </p>
                    </div>

                    {/* Response (if resolved) */}
                    {ticket.response && (
                      <div className="p-3 bg-green-50 dark:bg-green-900/20">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {t("support.response")}:
                        </p>
                        <p className="text-xs text-gray-700 dark:text-gray-300">
                          {isArabic ? ticket.responseAr : ticket.response}
                        </p>
                      </div>
                    )}

                    {/* Ticket Footer */}
                    <div className="p-3 flex items-center justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(ticket.date).toLocaleDateString(
                          isArabic ? "ar-OM" : "en-OM"
                        )}
                      </p>
                      {ticket.status === "open" && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors"
                        >
                          {t("support.viewDetails")}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 px-1">
            {t("support.faq")}
          </h2>
          <div className="space-y-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
              <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                {isArabic
                  ? "كيف يمكنني تتبع طلبي؟"
                  : "How can I track my order?"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic
                  ? "انتقل إلى صفحة الطلبات واضغط على 'تتبع الطلب' في الطلب النشط."
                  : "Go to Orders page and tap 'Track Order' on your active order."}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm">
              <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                {isArabic
                  ? "ما هي سياسة الإرجاع؟"
                  : "What is the return policy?"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {isArabic
                  ? "يمكنك إرجاع المنتجات خلال 7 أيام من تاريخ التسليم."
                  : "You can return products within 7 days of delivery."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
