import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiHome,
  FiStar,
  FiCheck,
} from "react-icons/fi";

const SavedAddresses = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "home",
      label: isArabic ? "المنزل" : "Home",
      name: "John Doe",
      street: "Sultan Qaboos Street",
      area: "Al Khuwair",
      city: "Muscat",
      state: "Muscat Governorate",
      zip: "100",
      phone: "+968 9123 4567",
      isDefault: true,
    },
    {
      id: 2,
      type: "work",
      label: isArabic ? "العمل" : "Work",
      name: "John Doe",
      street: "Al Mouj Boulevard",
      area: "Al Mouj",
      city: "Muscat",
      state: "Muscat Governorate",
      zip: "103",
      phone: "+968 9123 4567",
      isDefault: false,
    },
    {
      id: 3,
      type: "other",
      label: isArabic ? "آخر" : "Other",
      name: "Jane Doe",
      street: "Al Ghubrah Street",
      area: "Al Ghubrah",
      city: "Muscat",
      state: "Muscat Governorate",
      zip: "112",
      phone: "+968 9876 5432",
      isDefault: false,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDelete = (id) => {
    if (addresses.find((addr) => addr.id === id)?.isDefault) {
      alert(t("address.cannotDeleteDefault"));
      return;
    }
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "home":
        return FiHome;
      case "work":
        return FiMapPin;
      default:
        return FiMapPin;
    }
  };

  return (
    <div className="pb-4">
      <div className="p-3">
        {/* Add New Address Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="w-full mb-4 p-4 bg-primary text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <FiPlus className="w-5 h-5" />
          {t("address.addNew")}
        </motion.button>

        {/* Address List */}
        <div className="space-y-3">
          <AnimatePresence>
            {addresses.map((address) => {
              const Icon = getTypeIcon(address.type);
              return (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden ${
                    address.isDefault ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {address.label}
                          </p>
                          {address.isDefault && (
                            <div className="flex items-center gap-1 text-xs text-primary">
                              <FiStar className="w-3 h-3 fill-primary" />
                              <span>{t("address.default")}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(address.id)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 mb-3">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {address.name}
                      </p>
                      <p>
                        {address.street}, {address.area}
                      </p>
                      <p>
                        {address.city}, {address.state} - {address.zip}
                      </p>
                      <p className="font-medium text-gray-700 dark:text-gray-300">
                        {address.phone}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {!address.isDefault && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSetDefault(address.id)}
                          className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-1"
                        >
                          <FiCheck className="w-3 h-3" />
                          {t("address.setDefault")}
                        </motion.button>
                      )}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 bg-primary bg-opacity-10 text-primary rounded-lg text-xs font-semibold hover:bg-opacity-20 transition-colors flex items-center justify-center gap-1"
                      >
                        <FiEdit2 className="w-3 h-3" />
                        {t("address.edit")}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SavedAddresses;
