import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../../component/Header";
import Nav from "../../../component/Nav";
import Footer from "../../../component/Footer";
import Button from "../../../component/Button";

export default function NewPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.password) newErrors.password = t("newPassword.passwordPlaceholder");
    if (!form.confirmPassword) newErrors.confirmPassword = t("newPassword.confirmPasswordPlaceholder");
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = t("signup.errors.confirmPasswordMatch");

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // لو كل حاجة صح، روح لصفحة Done
    navigate("/done");
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

        <h3 className="fs-5">{t("newPassword.title")}</h3>
        <p>{t("newPassword.subtitle")}</p>

        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          {/* كلمة المرور */}
          <label htmlFor="password" className="mb-2 fw-bold">
            {t("newPassword.password")}
          </label>
          <div className="input-icon-wrapper shadow mb-4">
            <i className="bi bi-lock-fill"></i>
            <input
              type="password"
              id="password"
              placeholder={t("newPassword.passwordPlaceholder")}
              className="flex-1 border-0"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          {errors.password && <div className="text-danger mb-2">{errors.password}</div>}

          {/* تأكيد كلمة المرور */}
          <label htmlFor="confirmPassword" className="mb-2 fw-bold">
            {t("newPassword.confirmPassword")}
          </label>
          <div className="input-icon-wrapper shadow mb-4">
            <i className="bi bi-lock-fill"></i>
            <input
              type="password"
              id="confirmPassword"
              placeholder={t("newPassword.confirmPasswordPlaceholder")}
              className="flex-1 border-0"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>
          {errors.confirmPassword && (
            <div className="text-danger mb-2">{errors.confirmPassword}</div>
          )}

          <Button
            title="حفظ"
            style={{ width: "100%" }}
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}
