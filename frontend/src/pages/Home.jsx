import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import BannerCarousel from "../components/BannerCarousel";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { banners } from "../data/offers";
import { categories } from "../data/categories";
import { getFeaturedProducts } from "../data/products";
import { useCartStore } from "../store/cartStore";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const featuredProducts = getFeaturedProducts();
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <div className="pb-4">
      {/* Banner Carousel */}
      <div className="px-4 pt-4 mb-6">
        <BannerCarousel banners={banners} />
      </div>

      {/* Categories */}
      <div className="mb-4">
        <div className="px-3 mb-3">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {t("home.categories")}
          </h2>
        </div>
        <div className="px-3 overflow-x-auto custom-scrollbar">
          <div className="flex gap-3 pb-2">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => navigate(`/category/${category.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-6">
        <div className="px-3 mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {t("home.featuredProducts")}
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="text-primary text-sm font-semibold"
          >
            {t("home.viewAll")}
          </button>
        </div>
        <div className="px-3 grid grid-cols-2 gap-2">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showQuantitySelector={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
