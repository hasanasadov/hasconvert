import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/en.json";
import es from "./languages/es.json";
import de from "./languages/de.json";
import az from "./languages/az.json";
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    de: { translation: de },
    az: { translation: az },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
