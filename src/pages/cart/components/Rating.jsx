import React, { useState, useEffect } from "react";
import Stepper from "./Stepper";
import Button from "../../../component/Button";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom"; // 🔹 استيراد useNavigate

export default function Rating() {
  const { t } = useTranslation("order");
  const { language } = useLanguage();
  const [latestProduct, setLatestProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const navigate = useNavigate(); // 🔹 تهيئة useNavigate

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchOrders = async () => {
      try {
        const res = await fetch("https://maxim-test.courseszone-eg.com/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();
        const orders = Array.isArray(data) ? data : data.data;

        const latestOrderWithItems = orders
          ?.filter((order) => order.items && order.items.length > 0)
          ?.pop();

        if (latestOrderWithItems?.items?.length > 0) {
          const lastItem =
            latestOrderWithItems.items[latestOrderWithItems.items.length - 1];
          const lastProduct = lastItem?.product;
          if (lastProduct) setLatestProduct(lastProduct);
        }
      } catch (err) {
        console.error("⚠️ Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleSubmit = async () => {
    if (!latestProduct) {
      alert(t("rating.noProduct"));
      return;
    }
    if (!rating) {
      alert(t("rating.chooseStars"));
      return;
    }

    const token = localStorage.getItem("token");
    const payload = {
      product_id: latestProduct.id,
      rating,
      review,
    };

    try {
      const response = await fetch(
        `https://maxim-test.courseszone-eg.com/api/products/${latestProduct.id}/ratings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        // 🔹 بدل الـ toast، نروح للصفحة الجديدة
        navigate("/rating-success");
        setRating(0);
        setReview("");
      } else {
        const data = await response.json();
        alert(t("rating.fail") + (data.message || ""));
      }
    } catch (error) {
      console.error("⚠️ Error:", error);
      alert(t("rating.error"));
    }
  };

  const getImageUrl = (imgPath) =>
    imgPath
      ? `https://maxim-test.courseszone-eg.com/storage/${imgPath.replace(/^\/?/, "")}`
      : "/fallback.jpg";

  return (
    <div>
      <Stepper />
      <div className="container my-5 w-75 mx-auto">
        {!latestProduct ? (
          <p className="text-center">{t("rating.noProduct")}</p>
        ) : (
          <div className="d-flex flex-column flex-lg-row align-items-center align-items-lg-start gap-4">
            <div className="text-center">
              <img
                src={getImageUrl(latestProduct.image)}
                alt={latestProduct.name_ar}
                className="rounded sec-bg p-2"
                width="300"
                height="270"
                style={{ objectFit: "contain" }}
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
            </div>

            <div className="flex-grow-1">
              <h5 className="fw-bold mb-3">
                {language === "ar" ? latestProduct.name_ar : latestProduct.name_en}
              </h5>

              <div className="mb-3">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`bi me-2 ${index < rating ? "bi-star-fill text-warning" : "bi-star text-secondary"}`}
                    style={{ cursor: "pointer", fontSize: "28px" }}
                    onClick={() => setRating(index + 1)}
                  ></i>
                ))}
              </div>

              <textarea
                className="form-control mb-3"
                style={{ maxWidth: "500px", fontSize: "1.1rem", padding: "12px" }}
                rows="4"
                placeholder={t("rating.reviewPlaceholder")}
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>

              <Button
                title={t("rating.submit")}
                style={{ maxWidth: "180px", fontSize: "1.1rem", padding: "10px 20px" }}
                onClick={handleSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
