import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../../component/Header";
import Nav from "../../../component/Nav";
import Footer from "../../../component/Footer";
import Button from "../../../component/Button";

export default function Reset() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError(t("reset.emailPlaceholder"));
      return;
    }

    setError("");
    // هنا ممكن تبعت request للـ API لو محتاج
    navigate("/code");
  };

  return (
    <div>
      <div
        className="bg-white shadow rounded p-4 container d-flex flex-column justify-content-center align-items-center my-5"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <img
          src="https://maximcenter.com/assets/Logo-guUSaGI8.svg"
          className="w-30 mb-3"
          alt="logo"
        />

        <h3 className="fs-5">{t("reset.title")}</h3>
        <p>{t("reset.subtitle")}</p>

        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <label htmlFor="email" className="mb-2 fw-bold">
            {t("reset.email")}
          </label>
          <div className="input-icon-wrapper shadow mb-4">
            <i className="bi bi-envelope-fill"></i>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t("reset.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-0"
            />
          </div>
          {error && <div className="text-danger mb-2">{error}</div>}

          <Button
            title={t("reset.submit")}
            style={{ width: "100%" }}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
