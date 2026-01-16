import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../../component/Header";
import Nav from "../../../component/Nav";
import Footer from "../../../component/Footer";
import Button from "../../../component/Button";

export default function Codesubmit() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const length = 4; // عدد خانات الكود
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
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

        <h3 className="fs-5">{t("codeSubmit.title")}</h3>
        <p>{t("codeSubmit.subtitle")}</p>

        <form style={{ width: "100%" }} onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex gap-4 mb-4 justify-content-center">
            {[...Array(length)].map((_, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                className="form-control text-center fs-4"
                style={{ width: "40px" }}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputRefs.current[idx] = el)}
              />
            ))}
          </div>

          <Button
            title={t("codeSubmit.submit")}
            style={{ width: "100%" }}
            onClick={() => navigate("/newpassword")}
          />
        </form>
      </div>
    </div>
  );
}
