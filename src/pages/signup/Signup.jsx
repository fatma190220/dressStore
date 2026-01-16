import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import Button from "../../component/Button";
import { useTranslation } from "react-i18next";
import { useSignup } from "../../hooks/useSignup"; // ✅ استدعاء الهوك

export default function Signup() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const { signup, loading, errors } = useSignup();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(form, t);
    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <div className="d-flex flex-column my-5" style={{ minHeight: "100vh", gap: "120px" }}>
      <div className="bg-white shadow rounded p-4 container d-flex flex-column justify-content-center align-items-center" style={{ width: "100%", maxWidth: "600px" }}>
        <img src="https://maximcenter.com/assets/Logo-guUSaGI8.svg" className="w-30 mb-3" />
        <h3 className="fs-5">{t("signup.title")}</h3>
        <p>{t("signup.subtitle")}</p>

        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          {/* name */}
          <label htmlFor="name" className="mb-2">{t("signup.name")}</label>
          <div className="input-icon-wrapper shadow mb-1">
            <i className="bi bi-person-fill"></i>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              id="name"
              placeholder={t("signup.namePlaceholder")}
              className="flex-1 border-0"
            />
          </div>
          {errors.name && <div className="text-danger mt-1">{errors.name}</div>}

          {/* email */}
          <label htmlFor="email" className="mb-2 mt-3">{t("signup.email")}</label>
          <div className="input-icon-wrapper shadow mb-1">
            <i className="bi bi-envelope-fill"></i>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              id="signup-email"
              placeholder={t("signup.emailPlaceholder")}
              className="flex-1 border-0"
            />
          </div>
          {errors.email && <div className="text-danger mt-1">{errors.email}</div>}

          {/* mobile */}
          <label htmlFor="mobile" className="mb-2 mt-3">{t("signup.mobile")}</label>
          <div className="input-icon-wrapper shadow mb-1">
            <i className="bi bi-mobile-fill"></i>
            <input
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              id="mobile"
              placeholder={t("signup.mobilePlaceholder")}
              className="flex-1 border-0"
            />
          </div>
          {errors.mobile && <div className="text-danger mt-1">{errors.mobile}</div>}

          {/* password */}
          <label htmlFor="password" className="mb-2 mt-3">{t("signup.password")}</label>
          <div className="input-icon-wrapper shadow mb-1">
            <i className="bi bi-lock-fill"></i>
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              id="password"
              placeholder={t("signup.passwordPlaceholder")}
              className="flex-1 border-0"
            />
          </div>
          {errors.password && <div className="text-danger mt-1">{errors.password}</div>}

          {/* confirm password */}
          <label htmlFor="confirmPassword" className="mb-2 mt-3">{t("signup.confirmPassword")}</label>
          <div className="input-icon-wrapper shadow mb-1">
            <i className="bi bi-lock-fill"></i>
            <input
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              type="password"
              id="confirmPassword"
              placeholder={t("signup.confirmPasswordPlaceholder")}
              className="flex-1 border-0"
            />
          </div>
          {errors.confirmPassword && <div className="text-danger mt-1">{errors.confirmPassword}</div>}

          {/* agree */}
          <label className="mt-4 fw-bold d-flex align-items-center">
            <input
              type="checkbox"
              className="ms-2"
              checked={form.agreed}
              onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
            />
            {t("signup.agree")}
          </label>
          {errors.agreed && <div className="text-danger mt-1 mb-3">{errors.agreed}</div>}

          <Button
            type="submit"
            title={loading ? t("signup.submitLoading") : t("signup.submit")}
            style={{ width: "100%", marginTop: "1rem" }}
            disabled={loading}
           
          />
        </form>

        <span className="mt-4">
          {t("signup.alreadyAccount")} 
          <Link to="/login" className="text-secondary fw-bold">{t("signup.loginLink")}</Link>
        </span>
      </div>
    </div>
  );
}
