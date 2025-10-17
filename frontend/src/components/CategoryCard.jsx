import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CategoryCard = ({ category, onClick }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const name = isArabic ? category.nameAr : category.name;

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 cursor-pointer min-w-[60px]"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm"
        style={{ backgroundColor: `${category.color}20` }}
      >
        {category.icon}
      </div>
      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center line-clamp-2 w-16 leading-tight">
        {name}
      </p>
    </motion.div>
  );
};

export default CategoryCard;
