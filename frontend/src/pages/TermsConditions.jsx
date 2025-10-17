import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

const TermsConditions = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const termsContent = {
    en: {
      sections: [
        {
          title: "1. Acceptance of Terms",
          content:
            "By accessing and using the SPAR Oman mobile application, you accept and agree to be bound by the terms and provision of this agreement.",
        },
        {
          title: "2. Use License",
          content:
            "Permission is granted to temporarily download one copy of the materials on SPAR Oman's application for personal, non-commercial transitory viewing only.",
        },
        {
          title: "3. Orders and Payment",
          content:
            "All orders placed through the app are subject to acceptance and availability. We reserve the right to refuse or cancel orders. Payment must be made at the time of order placement or delivery as per the selected method.",
        },
        {
          title: "4. Delivery",
          content:
            "We strive to deliver within the specified time slots. However, delays may occur due to unforeseen circumstances. Delivery is available within specified areas in Muscat and surrounding regions.",
        },
        {
          title: "5. Returns and Refunds",
          content:
            "Fresh products can be returned within 24 hours of delivery if found unsatisfactory. Packaged goods can be returned within 7 days in unopened condition. Full refund will be processed within 5-7 business days.",
        },
        {
          title: "6. Privacy",
          content:
            "Your privacy is important to us. We collect and use personal information only as needed to deliver our services. Please refer to our Privacy Policy for detailed information.",
        },
        {
          title: "7. Loyalty Program",
          content:
            "The SPAR loyalty program allows you to earn points on purchases. Points can be redeemed for discounts and offers. Terms and conditions of the loyalty program may change with prior notice.",
        },
        {
          title: "8. Modifications",
          content:
            "SPAR Oman reserves the right to modify these terms at any time. We will notify users of any material changes through the app or email.",
        },
      ],
    },
    ar: {
      sections: [
        {
          title: "1. قبول الشروط",
          content:
            "من خلال الوصول إلى تطبيق سبار عمان واستخدامه، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية.",
        },
        {
          title: "2. ترخيص الاستخدام",
          content:
            "يُمنح الإذن بتنزيل نسخة واحدة مؤقتاً من المواد على تطبيق سبار عمان للمشاهدة الشخصية غير التجارية فقط.",
        },
        {
          title: "3. الطلبات والدفع",
          content:
            "جميع الطلبات المقدمة عبر التطبيق تخضع للقبول والتوافر. نحتفظ بالحق في رفض أو إلغاء الطلبات. يجب الدفع عند تقديم الطلب أو التسليم حسب الطريقة المختارة.",
        },
        {
          title: "4. التوصيل",
          content:
            "نسعى جاهدين للتسليم ضمن الفترات الزمنية المحددة. ومع ذلك، قد تحدث تأخيرات بسبب ظروف غير متوقعة. التوصيل متاح ضمن المناطق المحددة في مسقط والمناطق المحيطة.",
        },
        {
          title: "5. المرتجعات والاسترداد",
          content:
            "يمكن إرجاع المنتجات الطازجة خلال 24 ساعة من التسليم إذا وجدت غير مرضية. يمكن إرجاع السلع المعبأة خلال 7 أيام في حالة عدم الفتح. سيتم معالجة الاسترداد الكامل خلال 5-7 أيام عمل.",
        },
        {
          title: "6. الخصوصية",
          content:
            "خصوصيتك مهمة بالنسبة لنا. نقوم بجمع واستخدام المعلومات الشخصية فقط حسب الحاجة لتقديم خدماتنا. يرجى الرجوع إلى سياسة الخصوصية للحصول على معلومات مفصلة.",
        },
        {
          title: "7. برنامج الولاء",
          content:
            "يتيح لك برنامج ولاء سبار كسب نقاط على المشتريات. يمكن استبدال النقاط للحصول على خصومات وعروض. قد تتغير شروط وأحكام برنامج الولاء مع إشعار مسبق.",
        },
        {
          title: "8. التعديلات",
          content:
            "تحتفظ سبار عمان بالحق في تعديل هذه الشروط في أي وقت. سنخطر المستخدمين بأي تغييرات جوهرية من خلال التطبيق أو البريد الإلكتروني.",
        },
      ],
    },
  };

  const sections = isArabic
    ? termsContent.ar.sections
    : termsContent.en.sections;

  return (
    <div className="pb-4">
      <div className="p-4">
        {/* Last Updated */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl flex items-center gap-2">
          <FiFileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <p className="text-xs text-blue-700 dark:text-blue-300">
            {t("terms.lastUpdated")}:{" "}
            {isArabic ? "١ أكتوبر ٢٠٢٤" : "October 1, 2024"}
          </p>
        </div>

        {/* Terms Sections */}
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

        {/* Contact for Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
        >
          <p className="text-xs text-green-700 dark:text-green-300 mb-2">
            {t("terms.questions")}
          </p>
          <a
            href="mailto:legal@spar.om"
            className="text-sm font-semibold text-primary hover:underline"
          >
            legal@spar.om
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditions;
