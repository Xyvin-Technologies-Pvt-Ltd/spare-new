import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import Header from "./Header";

const AppLayout = ({ showHeader = true, showNav = true, headerProps = {} }) => {
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {showHeader && <Header {...headerProps} />}

      <main className={`flex-1 overflow-y-auto ${showNav ? "pb-20" : ""}`}>
        <Outlet />
      </main>

      {showNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
