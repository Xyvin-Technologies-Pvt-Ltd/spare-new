import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BottomNav from "../components/BottomNav";
import Header from "./Header";

const AppLayout = ({ showHeader = true, showNav = true, headerProps = {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Determine page title and back button based on current route
  const getPageConfig = () => {
    const path = location.pathname;

    const pageConfigs = {
      "/addresses": { title: t("address.title"), showBack: true },
      "/payment-methods": {
        title: t("payment.paymentMethods"),
        showBack: true,
      },
      "/help": { title: t("support.title"), showBack: true },
      "/about": { title: t("about.title"), showBack: true },
      "/terms": { title: t("terms.title"), showBack: true },
      "/privacy": { title: t("privacy.title"), showBack: true },
      "/payment": { title: t("payment.title"), showBack: true },
    };

    // Check if it's a product detail page
    if (path.startsWith("/product/")) {
      return { title: null, showBack: true };
    }

    return pageConfigs[path] || { title: null, showBack: false };
  };

  const pageConfig = getPageConfig();
  const dynamicHeaderProps = pageConfig.showBack
    ? { title: pageConfig.title, onBack: () => navigate(-1) }
    : headerProps;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {showHeader && <Header {...dynamicHeaderProps} />}

      <main className={`flex-1 overflow-y-auto ${showNav ? "pb-20" : ""}`}>
        <Outlet />
      </main>

      {showNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
