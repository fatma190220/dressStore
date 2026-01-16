import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("ar");
  const [currency, setCurrency] = useState("SAR");

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) setLanguage(savedLang);

    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, setCurrency }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
