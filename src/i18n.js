import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import uk from "./locales/uk.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uk: { translation: uk },
  },
  lng: localStorage.getItem("i18nextLng") || "en", // використання мови з localStorage або за замовчуванням
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
