import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiShield, FiLock } from "react-icons/fi";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const privacyContent = {
    en: {
      sections: [
        {
          title: "1. Information We Collect",
          content:
            "We collect information you provide directly to us, including your name, email address, phone number, delivery addresses, and payment information. We also collect information about your orders, preferences, and app usage.",
        },
        {
          title: "2. How We Use Your Information",
          content:
            "We use the information we collect to process your orders, provide customer support, send you updates about your orders, improve our services, and personalize your shopping experience.",
        },
        {
          title: "3. Information Sharing",
          content:
            "We do not sell your personal information. We may share your information with service providers who assist us in operating our app and conducting our business, such as payment processors and delivery partners.",
        },
        {
          title: "4. Data Security",
          content:
            "We implement appropriate security measures to protect your personal information. All payment transactions are encrypted using SSL technology. However, no method of transmission over the internet is 100% secure.",
        },
        {
          title: "5. Your Rights",
          content:
            "You have the right to access, update, or delete your personal information. You can manage your account settings in the app or contact us directly for assistance.",
        },
        {
          title: "6. Cookies and Tracking",
          content:
            "We use cookies and similar tracking technologies to track activity on our app and hold certain information. You can control cookie preferences through your device settings.",
        },
        {
          title: "7. Children's Privacy",
          content:
            "Our service is not intended for children under 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal information, please contact us.",
        },
        {
          title: "8. Changes to Privacy Policy",
          content:
            "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date.",
        },
        {
          title: "9. Contact Us",
          content:
            "If you have any questions about this Privacy Policy, please contact us at privacy@spar.om or call +968 2412 3456.",
        },
      ],
    },
    ar: {
      sections: [
        {
          title: "1. المعلومات التي نجمعها",
          content:
            "نجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وعناوين التسليم ومعلومات الدفع. نجمع أيضاً معلومات حول طلباتك وتفضيلاتك واستخدامك للتطبيق.",
        },
        {
          title: "2. كيف نستخدم معلوماتك",
          content:
            "نستخدم المعلومات التي نجمعها لمعالجة طلباتك، وتقديم دعم العملاء، وإرسال تحديثات حول طلباتك، وتحسين خدماتنا، وتخصيص تجربة التسوق الخاصة بك.",
        },
        {
          title: "3. مشاركة المعلومات",
          content:
            "نحن لا نبيع معلوماتك الشخصية. قد نشارك معلوماتك مع مزودي الخدمات الذين يساعدوننا في تشغيل تطبيقنا وإدارة أعمالنا، مثل معالجي الدفع وشركاء التوصيل.",
        },
        {
          title: "4. أمن البيانات",
          content:
            "نطبق تدابير أمنية مناسبة لحماية معلوماتك الشخصية. جميع معاملات الدفع مشفرة باستخدام تقنية SSL. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100%.",
        },
        {
          title: "5. حقوقك",
          content:
            "لديك الحق في الوصول إلى معلوماتك الشخصية أو تحديثها أو حذفها. يمكنك إدارة إعدادات حسابك في التطبيق أو الاتصال بنا مباشرة للحصول على المساعدة.",
        },
        {
          title: "6. ملفات تعريف الارتباط والتتبع",
          content:
            "نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتتبع النشاط على تطبيقنا والاحتفاظ بمعلومات معينة. يمكنك التحكم في تفضيلات ملفات تعريف الارتباط من خلال إعدادات جهازك.",
        },
        {
          title: "7. خصوصية الأطفال",
          content:
            "خدمتنا غير مخصصة للأطفال دون سن 18 عاماً. نحن لا نجمع عن قصد معلومات شخصية من الأطفال دون سن 18 عاماً. إذا علمت أن طفلاً قدم لنا معلومات شخصية، يرجى الاتصال بنا.",
        },
        {
          title: "8. التغييرات على سياسة الخصوصية",
          content:
            "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنخطرك بأي تغييرات من خلال نشر سياسة الخصوصية الجديدة على هذه الصفحة وتحديث تاريخ 'آخر تحديث'.",
        },
        {
          title: "9. اتصل بنا",
          content:
            "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على privacy@spar.om أو الاتصال على +968 2412 3456.",
        },
      ],
    },
  };

  const sections = isArabic
    ? privacyContent.ar.sections
    : privacyContent.en.sections;

  return (
    <div className="pb-4">
      <div className="p-4">
        {/* Privacy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-4 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-3 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <FiShield className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold mb-2">{t("privacy.commitment")}</h2>
          <p className="text-white/90 text-xs">
            {isArabic
              ? "نحن ملتزمون بحماية خصوصيتك وأمان بياناتك"
              : "We are committed to protecting your privacy and data security"}
          </p>
        </motion.div>

        {/* Last Updated */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl flex items-center gap-2">
          <FiLock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <p className="text-xs text-blue-700 dark:text-blue-300">
            {t("privacy.lastUpdated")}:{" "}
            {isArabic ? "١ أكتوبر ٢٠٢٤" : "October 1, 2024"}
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
            >
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                {section.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
        >
          <p className="text-xs text-green-700 dark:text-green-300 mb-2">
            {t("privacy.questions")}
          </p>
          <a
            href="mailto:privacy@spar.om"
            className="text-sm font-semibold text-primary hover:underline"
          >
            privacy@spar.om
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
