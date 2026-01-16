import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// استيراد ملفات الترجمة
import headerEn from "./locales/en/header.json";
import headerAr from "./locales/ar/header.json";

import navEn from "./locales/en/nav.json";
import navAr from "./locales/ar/nav.json";

import footerEn from "./locales/en/footer.json";
import footerAr from "./locales/ar/footer.json";

import homeEn from "./locales/en/home.json";
import homeAr from "./locales/ar/home.json";

import teamEn from "./locales/en/team.json";
import teamAr from "./locales/ar/team.json";

import productsEn from "./locales/en/products.json";
import productsAr from "./locales/ar/products.json";

import cartEn from "./locales/en/cart.json";
import cartAr from "./locales/ar/cart.json";

import contactEn from "./locales/en/contact.json";
import contactAr from "./locales/ar/contact.json";

import blogsEn from "./locales/en/blogs.json";
import blogsAr from "./locales/ar/blogs.json";

import authEn from "./locales/en/auth.json";
import authAr from "./locales/ar/auth.json";

import profileEn from "./locales/en/profile.json";
import profileAr from "./locales/ar/profile.json";

import resultEN from "./locales/en/result.json";
import resultAR from "./locales/ar/result.json";

import orderEn from "./locales/en/order.json";
import orderAr from "./locales/ar/order.json";

i18n
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem("language") || "ar", // اللغة الحالية من localStorage
    fallbackLng: "en", // لو مفيش ترجمة يرجع للإنجليزي
    resources: {
      en: {
        header: headerEn,
        nav: navEn,
        footer: footerEn,
        home: homeEn,
        team: teamEn,
        products: productsEn,
        cart: cartEn,
        contact: contactEn,
        blogs: blogsEn,
        auth: authEn,
        profile: profileEn,
        result: resultEN,
        order: orderEn,
      },
      ar: {
        header: headerAr,
        nav: navAr,
        footer: footerAr,
        home: homeAr,
        team: teamAr,
        products: productsAr,
        cart: cartAr,
        contact: contactAr,
        blogs: blogsAr,
        auth: authAr,
        profile: profileAr,
        result: resultAR,
        order: orderAr,
      }
    },
    interpolation: { escapeValue: false }
  });

export default i18n;
