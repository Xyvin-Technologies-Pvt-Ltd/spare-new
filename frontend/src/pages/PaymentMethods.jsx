import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCreditCard,
  FiPlus,
  FiTrash2,
  FiStar,
  FiCheck,
} from "react-icons/fi";

const PaymentMethods = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [cards, setCards] = useState([
    {
      id: 1,
      cardNumber: "4532 **** **** 1234",
      cardHolder: "JOHN DOE",
      expiryDate: "12/25",
      cardType: "Visa",
      isDefault: true,
    },
    {
      id: 2,
      cardNumber: "5412 **** **** 9876",
      cardHolder: "JOHN DOE",
      expiryDate: "09/26",
      cardType: "Mastercard",
      isDefault: false,
    },
  ]);

  const handleSetDefault = (id) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  };

  const handleDelete = (id) => {
    if (cards.find((card) => card.id === id)?.isDefault) {
      alert(t("payment.cannotDeleteDefault"));
      return;
    }
    setCards(cards.filter((card) => card.id !== id));
  };

  const getCardBrandColor = (type) => {
    switch (type.toLowerCase()) {
      case "visa":
        return "from-blue-500 to-blue-600";
      case "mastercard":
        return "from-red-500 to-orange-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="pb-4">
      <div className="p-3">
        {/* Add New Card Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full mb-4 p-4 bg-primary text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <FiPlus className="w-5 h-5" />
          {t("payment.addCard")}
        </motion.button>

        {/* Cards List */}
        <div className="space-y-3">
          <AnimatePresence>
            {cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className={`rounded-xl shadow-sm overflow-hidden ${
                  card.isDefault ? "ring-2 ring-primary" : ""
                }`}
              >
                {/* Card Visual */}
                <div
                  className={`bg-gradient-to-br ${getCardBrandColor(
                    card.cardType
                  )} p-4 text-white relative overflow-hidden`}
                >
                  {/* Decorative Circles */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <FiCreditCard className="w-8 h-8" />
                      <p className="text-xs font-semibold uppercase tracking-wider">
                        {card.cardType}
                      </p>
                    </div>

                    <div className="mb-6">
                      <p className="text-xl font-bold tracking-wider mb-1">
                        {card.cardNumber}
                      </p>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs opacity-80 mb-1">
                          {t("payment.cardHolder")}
                        </p>
                        <p className="font-semibold text-sm">
                          {card.cardHolder}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-80 mb-1">
                          {t("payment.expires")}
                        </p>
                        <p className="font-semibold text-sm">
                          {card.expiryDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="bg-white dark:bg-gray-800 p-3">
                  {card.isDefault && (
                    <div className="flex items-center gap-1 text-xs text-primary mb-2">
                      <FiStar className="w-3 h-3 fill-primary" />
                      <span className="font-semibold">
                        {t("payment.defaultCard")}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {!card.isDefault && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSetDefault(card.id)}
                        className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-1"
                      >
                        <FiCheck className="w-3 h-3" />
                        {t("payment.setDefault")}
                      </motion.button>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(card.id)}
                      className={`${
                        card.isDefault ? "w-full" : "flex-1"
                      } py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-1`}
                    >
                      <FiTrash2 className="w-3 h-3" />
                      {t("payment.removeCard")}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            {t("payment.securityNote")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
