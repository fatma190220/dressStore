import React from "react";
import ProductList from "../../../component/ProductsList";
import { useProducts } from "../../../hooks/useProducts";
import { useSettings } from "../../../hooks/useSettings";
import { useTranslation } from "react-i18next";

export default function ProductsCards() {
  const { t } = useTranslation("home"); // ✅ استخدم ملف home.json
  const { data: products = [], isLoading, isError } = useProducts();
  const { data: settings } = useSettings();

  if (isLoading) return <p>{t("loadingData")}</p>;
  if (isError) return <p>{t("errorLoading")}</p>;

  return (
    <div className="container">
      <div className="mb-3 mt-5">
        {/* 🟢 العنوان من الترجمة لو مش موجود في settings */}
        <h2>{settings?.product_title ?? t("products.title")}</h2>

        {/* 🟢 الوصف من الترجمة لو مش موجود في settings */}
        <p className="fw-bold text-secondary">
          {settings?.product_description ?? t("products.description")}
        </p>

        <div className="d-flex justify-content-end me-auto">
          <a href="/products" className="fw-bold text-secondary">
            {t("buttons.showMore")}
          </a>
        </div>
      </div>

      <div >
        <ProductList products={products} />
      </div>
    </div>
  );
}
