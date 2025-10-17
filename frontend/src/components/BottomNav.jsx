import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiHome, FiGift, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

const BottomNav = () => {
  const { t } = useTranslation();

  const navItems = [
    { path: "/home", icon: FiHome, label: t("nav.home") },
    { path: "/rewards", icon: FiGift, label: t("nav.rewards") },
    { path: "/settings", icon: FiUser, label: t("nav.profile") },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `tap-target flex-1 flex flex-col items-center justify-center gap-1 py-2 relative ${
                isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-t-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
