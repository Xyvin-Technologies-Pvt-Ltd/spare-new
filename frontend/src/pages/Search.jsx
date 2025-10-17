import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiSearch, FiX, FiArrowLeft } from "react-icons/fi";
import { products } from "../data/products";
import { categories } from "../data/categories";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    "Fresh Milk",
    "Bread",
    "Chicken",
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const results = products.filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const nameAr = product.nameAr || "";
        const description = product.description?.toLowerCase() || "";

        return (
          name.includes(query) ||
          nameAr.includes(query) ||
          description.includes(query)
        );
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>

          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
              >
                <FiX className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-3">
        {/* Search Results */}
        {searchQuery ? (
          <>
            {searchResults.length > 0 ? (
              <>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t("search.results")} ({searchResults.length})
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {searchResults.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showQuantitySelector={true}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <FiSearch className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("search.noResults")}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                  {t("search.tryDifferent")}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  {t("search.recent")}
                </h2>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSearch(search)}
                      className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow flex items-center gap-3"
                    >
                      <FiSearch className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {search}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Categories */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                {t("search.categories")}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map((category) => (
                  <motion.button
                    key={category.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      handleSearch(isArabic ? category.nameAr : category.name)
                    }
                    className="p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow flex items-center gap-3"
                    style={{
                      backgroundColor: `${category.color}10`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      {category.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {isArabic ? category.nameAr : category.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
