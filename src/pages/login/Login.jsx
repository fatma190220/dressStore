import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import { useTranslation } from "react-i18next";
import { useLogin } from "../../hooks/useLogin";

export default function Login({ classname }) {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");

  const [form, setForm] = useState({ email: "", password: "" });
  const { login, loading, errors } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(form, t);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className={classname}>
      <div
        className="bg-white my-5 shadow rounded p-4 container d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <img
          src="https://maximcenter.com/assets/Logo-guUSaGI8.svg"
          className="w-30 mb-3"
          alt="Logo"
        />
        <h3 className="fs-5">{t("login.title")}</h3>
        <p>{t("login.subtitle")}</p>

        <form style={{ width: "100%" }} onSubmit={handleLogin}>
          <label htmlFor="email" className="mb-2 fw-bold">{t("login.email")}</label>
          <div className="input-icon-wrapper shadow mb-4">
            <i className="bi bi-envelope-fill"></i>
            <input
              type="email"
              id="login-email"
              name="email"
              placeholder={t("login.emailPlaceholder")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          {errors.email && <div className="text-danger mt-1">{errors.email}</div>}

          <label htmlFor="password" className="mb-2 fw-bold">{t("login.password")}</label>
          <div className="input-icon-wrapper shadow mb-4">
            <i className="bi bi-lock-fill"></i>
            <input
              type="password"
              id="password"
              name="password"
              placeholder={t("login.passwordPlaceholder")}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          {errors.password && <div className="text-danger mt-1">{errors.password}</div>}

          <div className="d-flex justify-content-between mb-4">
            <label>
              <input type="checkbox" className="ms-2" /> {t("login.rememberMe")}
            </label>
            <Link to="/reset" className="text-secondary fw-bold">
              {t("login.forgotPassword")}
            </Link>
          </div>

          <Button
            title={loading ? t("login.loading") : t("login.submit")}
            style={{ width: "100%" }}
            type="submit"
            disabled={loading}
          />
        </form>

        <span className="mt-4">
          {t("login.noAccount")}{" "}
          <Link to="/signup" className="text-secondary fw-bold">
            {t("login.signupLink")}
          </Link>
        </span>
      </div>
    </div>
  );
}
