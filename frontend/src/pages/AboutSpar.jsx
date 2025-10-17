import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
  FiInstagram,
  FiTwitter,
  FiFacebook,
} from "react-icons/fi";
import logoImage from "../assets/logo.jpg";

const AboutSpar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aboutContent = {
    en: {
      intro:
        "SPAR is one of the world's largest food retail chains, operating in over 48 countries. In Oman, SPAR has become a trusted name for quality groceries and exceptional customer service.",
      mission:
        "Our mission is to provide fresh, high-quality products at competitive prices while delivering an outstanding shopping experience to every customer.",
      values: [
        "Quality Products - We source only the finest products",
        "Customer Service - Your satisfaction is our priority",
        "Community - Supporting local suppliers and communities",
        "Sustainability - Committed to environmental responsibility",
      ],
    },
    ar: {
      intro:
        "سبار هي واحدة من أكبر سلاسل بيع التجزئة للأغذية في العالم، وتعمل في أكثر من 48 دولة. في عمان، أصبح سبار اسماً موثوقاً للبقالة عالية الجودة وخدمة العملاء الاستثنائية.",
      mission:
        "مهمتنا هي توفير منتجات طازجة وعالية الجودة بأسعار تنافسية مع تقديم تجربة تسوق متميزة لكل عميل.",
      values: [
        "منتجات عالية الجودة - نحصل فقط على أفضل المنتجات",
        "خدمة العملاء - رضاكم هو أولويتنا",
        "المجتمع - دعم الموردين والمجتمعات المحلية",
        "الاستدامة - ملتزمون بالمسؤولية البيئية",
      ],
    },
  };

  const content = isArabic ? aboutContent.ar : aboutContent.en;

  return (
    <div className="pb-4">
      <div className="p-4">
        {/* Logo and Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-green-600 rounded-2xl p-6 text-white mb-4 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full overflow-hidden">
            <img
              src={logoImage}
              alt="SPAR Oman"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">SPAR Oman</h2>
          <p className="text-white/90 text-sm">{t("app.tagline")}</p>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-4"
        >
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
            {t("about.aboutUs")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {content.intro}
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-4"
        >
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
            {t("about.mission")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {content.mission}
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-4"
        >
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
            {t("about.values")}
          </h3>
          <div className="space-y-2">
            {content.values.map((value, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-5 h-5 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-4"
        >
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
            {t("about.contactInfo")}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <FiMapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("about.headquarters")}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {isArabic ? "مسقط، سلطنة عمان" : "Muscat, Sultanate of Oman"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <FiPhone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("about.phone")}
                </p>
                <a
                  href="tel:+96824123456"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  +968 2412 3456
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                <FiMail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("about.email")}
                </p>
                <a
                  href="mailto:info@spar.om"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  info@spar.om
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                <FiGlobe className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("about.website")}
                </p>
                <a
                  href="https://www.spar.om"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  www.spar.om
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
        >
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
            {t("about.followUs")}
          </h3>
          <div className="flex gap-3">
            <a
              href="https://instagram.com/sparoman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
            >
              <FiInstagram className="w-6 h-6 text-white" />
              <p className="text-xs font-semibold text-white">Instagram</p>
            </a>
            <a
              href="https://facebook.com/sparoman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-3 bg-blue-600 rounded-xl flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
            >
              <FiFacebook className="w-6 h-6 text-white" />
              <p className="text-xs font-semibold text-white">Facebook</p>
            </a>
            <a
              href="https://twitter.com/sparoman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-3 bg-blue-400 rounded-xl flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
            >
              <FiTwitter className="w-6 h-6 text-white" />
              <p className="text-xs font-semibold text-white">Twitter</p>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSpar;
