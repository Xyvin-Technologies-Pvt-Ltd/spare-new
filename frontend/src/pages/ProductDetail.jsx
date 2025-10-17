import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiStar, FiShoppingCart } from "react-icons/fi";
import { products, getRelatedProducts } from "../data/products";
import { useCartStore } from "../store/cartStore";
import { formatCurrency } from "../utils/currency";
import ProductCard from "../components/ProductCard";
import QuantitySelector from "../components/QuantitySelector";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const product = products.find((p) => p.id === parseInt(id));
  const relatedProducts = getRelatedProducts(parseInt(id));
  const isArabic = i18n.language === "ar";

  if (!product) {
    return <div className="p-4 text-center">{t("common.error")}</div>;
  }

  const name = isArabic ? product.nameAr : product.name;
  const description = isArabic ? product.descriptionAr : product.description;
  const unit = isArabic ? product.unitAr : product.unit;

  const handleAddToCart = () => {
    addItem(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="pb-4">
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-white dark:bg-gray-800">
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {product.halal && (
          <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-full font-semibold text-sm">
            حلال
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="bg-white dark:bg-gray-800 rounded-t-3xl -mt-6 relative z-10 px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Name and Rating */}
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
            {name}
          </h1>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <div className="flex items-center gap-1">
              <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                {product.rating}
              </span>
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              ({product.reviews})
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                product.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.inStock ? t("product.inStock") : t("product.outOfStock")}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              /{unit}
            </span>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
              {t("product.description")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              {description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
              {t("product.quantity")}
            </h3>
            <QuantitySelector
              initialQuantity={quantity}
              onQuantityChange={setQuantity}
              size="default"
            />
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                {t("product.youMayLike")}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    showQuantitySelector={true}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add to Cart Button */}
      {product.inStock && (
        <div className="fixed bottom-20 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 z-40">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg text-sm"
          >
            <FiShoppingCart className="w-4 h-4" />
            {t("product.addToCart")} -{" "}
            {formatCurrency(product.price * quantity)}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
