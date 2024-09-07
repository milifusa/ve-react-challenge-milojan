// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Recursos de traducción
const resources = {
  en: {
    translation: {
      title: "Rick and Morty Characters",
      search_placeholder: "Search characters",
      status_alive: "Alive",
      status_dead: "Dead",
      status_unknown: "Unknown",
      species_info: "{{species}} - {{gender}}",
      last_location: "Last known location:",
      first_seen: "First seen in:",
      try_again: "Try Again",
    },
  },
  es: {
    translation: {
      title: "Personajes de Rick y Morty",
      search_placeholder: "Buscar personajes",
      status: "Vivo",
      status_dead: "Muerto",
      status_unknown: "Desconocido",
      species_info: "{{species}} - {{gender}}",
      last_location: "Última ubicación conocida:",
      first_seen: "Visto por primera vez en:",
      try_again: "Intentar de nuevo",
    },
  },
};

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Inicializa react-i18next
  .init({
    resources,
    fallbackLng: "en", // Idioma por defecto
    interpolation: {
      escapeValue: false, // react ya se encarga de la seguridad contra XSS
    },
  });

export default i18n;
