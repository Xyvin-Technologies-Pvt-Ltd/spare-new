import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FiUser,
  FiGlobe,
  FiMoon,
  FiSun,
  FiPackage,
  FiGift,
  FiMapPin,
  FiCreditCard,
  FiHelpCircle,
  FiInfo,
  FiFileText,
  FiShield,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";
import EditProfileModal from "../components/EditProfileModal";

const Settings = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      section: "Account",
      items: [
        {
          icon: FiPackage,
          label: t("settings.myOrders"),
          path: "/orders",
          color: "text-blue-600",
        },
        {
          icon: FiGift,
          label: t("nav.rewards"),
          path: "/rewards",
          color: "text-purple-600",
        },
        {
          icon: FiMapPin,
          label: t("settings.addresses"),
          path: "/addresses",
          color: "text-green-600",
        },
        {
          icon: FiCreditCard,
          label: t("settings.paymentMethods"),
          path: "/payment-methods",
          color: "text-orange-600",
        },
      ],
    },
    {
      section: "Support",
      items: [
        {
          icon: FiHelpCircle,
          label: t("settings.helpSupport"),
          path: "/help",
          color: "text-indigo-600",
        },
        {
          icon: FiInfo,
          label: t("settings.about"),
          path: "/about",
          color: "text-cyan-600",
        },
        {
          icon: FiFileText,
          label: t("settings.terms"),
          path: "/terms",
          color: "text-gray-600",
        },
        {
          icon: FiShield,
          label: t("settings.privacy"),
          path: "/privacy",
          color: "text-red-600",
        },
      ],
    },
  ];

  return (
    <div className="pb-4">
      {/* User Profile Card */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsEditModalOpen(true)}
          className="bg-gradient-to-br from-primary to-green-600 rounded-3xl p-6 text-white shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiUser className="w-10 h-10 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">
                {i18n.language === "ar" ? user?.nameAr : user?.name}
              </h2>
              <p className="text-white/80 text-sm">{user?.email}</p>
              <p className="text-white/80 text-sm">{user?.phone}</p>
            </div>
            <div className="text-white/60">
              <FiChevronRight className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Settings */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Quick Settings
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
          {/* Language Toggle */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={toggleLanguage}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FiGlobe className="w-6 h-6 text-primary" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {t("settings.language")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {i18n.language === "en" ? "English" : "العربية"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {i18n.language === "en" ? "العربية" : "English"}
              </span>
              <FiChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </motion.div>

          {/* Theme Toggle */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={toggleTheme}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              {theme === "light" ? (
                <FiMoon className="w-6 h-6 text-primary" />
              ) : (
                <FiSun className="w-6 h-6 text-primary" />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {t("settings.theme")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {theme === "light" ? t("settings.light") : t("settings.dark")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {theme === "light" ? t("settings.dark") : t("settings.light")}
              </span>
              <FiChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Menu Sections */}
      {menuItems.map((section, sectionIndex) => (
        <div key={section.section} className="px-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {section.section}
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
            {section.items.map((item, itemIndex) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => item.path && navigate(item.path)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </span>
                </div>
                <FiChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            ))}
          </div>
        </div>
      ))}

      {/* Logout Button */}
      <div className="px-4 mb-8">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-4 rounded-2xl font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2"
        >
          <FiLogOut className="w-5 h-5" />
          {t("auth.logout")}
        </motion.button>
      </div>

      {/* App Version */}
      <div className="px-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          SPAR Oman v1.0.0
        </p>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default Settings;
