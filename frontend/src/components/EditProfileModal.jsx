import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiX,
  FiUser,
  FiPhone,
  FiMail,
  FiCamera,
  FiCheck,
} from "react-icons/fi";
import { useAuthStore } from "../store/authStore";

const EditProfileModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePhoto, setProfilePhoto] = useState(user?.photo || null);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = t("profile.nameRequired");
    }

    if (!phone.trim()) {
      newErrors.phone = t("profile.phoneRequired");
    } else if (!/^\+?[\d\s-]{8,}$/.test(phone)) {
      newErrors.phone = t("profile.invalidPhone");
    }

    if (!email.trim()) {
      newErrors.email = t("profile.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("profile.invalidEmail");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update user in store
    updateProfile({
      name,
      phone,
      email,
      photo: profilePhoto,
    });

    setIsSaving(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden w-full max-w-md max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-green-600 p-4 text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold">
                  {t("profile.editProfile")}
                </h2>
                <p className="text-white/80 text-xs mt-1">
                  {t("profile.updateInfo")}
                </p>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Profile Photo */}
                <div className="mb-4">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3">
                      <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
                        {profilePhoto ? (
                          <img
                            src={profilePhoto}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiUser className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
                      >
                        <FiCamera className="w-4 h-4" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {t("profile.tapToChange")}
                    </p>
                  </div>
                </div>

                {/* Name Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("profile.name")}
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors({ ...errors, name: "" });
                      }}
                      placeholder="John Doe"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-colors ${
                        errors.name
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-200 dark:border-gray-700"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("profile.phone")}
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setErrors({ ...errors, phone: "" });
                      }}
                      placeholder="+968 9123 4567"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-colors ${
                        errors.phone
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-200 dark:border-gray-700"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("profile.email")}
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({ ...errors, email: "" });
                      }}
                      placeholder="john.doe@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-colors ${
                        errors.email
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-200 dark:border-gray-700"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {t("common.cancel")}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        {t("common.saving")}
                      </>
                    ) : (
                      <>
                        <FiCheck className="w-5 h-5" />
                        {t("common.save")}
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
