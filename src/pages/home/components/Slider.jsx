import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Button from "../../../component/Button";
import { useSettings } from "../../../hooks/useSettings";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  const { data: settings, isLoading } = useSettings();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("home");
  const dir = i18n.dir(); // 'ltr' أو 'rtl'

  const slides = [
    settings?.home_slide_1,
    settings?.home_slide_2,
    settings?.home_slide_3,
  ].filter(Boolean);

  const BASE_URL = "https://maxim-test.courseszone-eg.com/uploads/";


  const getImageUrl = (imageName) => {
    if (!imageName) return "";
    return imageName.startsWith("http")
      ? imageName
      : `${BASE_URL}${imageName}`;
  };

  if (isLoading) {
    return <p className="text-center mt-5">{t("loading.data")}</p>;
  }

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide mb-5"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      style={{ width: "100%", maxHeight: "731px" }}
    >
      <div
  className="carousel-indicators custom-indicators"
  style={{
    display: "flex",
    justifyContent: dir === "rtl" ? "flex-start" : "flex-end",
    margin: 0,
    right: dir === "rtl" ? "auto" : "10%",
    left: dir === "rtl" ? "10%" : "auto",
   top: "50%",
    transform: "translateY(-50%)",
  }}
>
  {slides.map((_, index) => (
    <button
      key={index}
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide-to={index}
      aria-label={`${t("slider.slide")} ${index + 1}`}
      className={index === 0 ? "active" : ""}
      aria-current={index === 0 ? "true" : undefined}
    ></button>
  ))}
</div>

      <div className="carousel-inner" style={{ position: "relative", height: "700px" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, .5)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        ></div>

        {slides.length > 0 ? (
          slides.map((imageName, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""} d-block w-100`}
              style={{ height: "700px" }}
            >
              <img
                src={getImageUrl(imageName)}
                className="d-block w-100 h-100"
                style={{ objectFit: "cover" }}
                alt={`${t("slider.slide")} ${index + 1}`}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-white">{t("loading.images")}</p>
        )}
      </div>

      {/* النص + الزر */}
      <div
      className="slider-content"
  style={{
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: dir === "rtl" ? "10%" : "auto", // ابدأ من اليمين في العربية
    left: dir === "ltr" ? "10%" : "auto",  // ابدأ من اليسار في الإنجليزية
    textAlign: dir === "rtl" ? "right" : "left",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1rem",
    zIndex: 50,
    width: "40%",
  }}
>
  <h3 style={{ color: "white" }} className="fw-bold fs-1">
    {settings?.home_title ? (
      <>
        <span className="main-color">
          {settings.home_title.split(" ").slice(0, 2).join(" ")}
        </span>{" "}
        {settings.home_title.split(" ").slice(2).join(" ")}
      </>
    ) : (
      t("loading.text")
    )}
  </h3>

  <p style={{ color: "white" }} className="fw-normal fs-4">
    {settings?.home_description ?? t("loading.text")}
  </p>

  <Button title={t("buttons.ourProducts")} onClick={() => navigate("/products")} />
</div>

    </div>
  );
}
