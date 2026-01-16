import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Stepper() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("cart");

  const steps = [
    { step: 1, path: "/cart", label: t("steps.cart") },
    { step: 2, path: "/shippingdetails", label: t("steps.shipping") },
    { step: 3, path: "/paymethod", label: t("steps.payment") },
    { step: 4, path: "/rating", label: t("steps.review") },
  ];

  const currentStep =
    steps.find((s) =>
      location.pathname.toLowerCase().startsWith(s.path.toLowerCase())
    )?.step || 1;

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-center align-items-center w-50 mx-auto">
        {steps.map((s, index) => (
          <React.Fragment key={s.step}>
            {/* الدائرة + العنوان */}
            <div
              className="d-flex flex-column align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(s.path)}
            >
              <div
                className={`d-flex align-items-center justify-content-center rounded-circle border 
                  ${
                    s.step <= currentStep
                      ? "current-step text-white"
                      : "next-step text-white"
                  }`}
                style={{ width: "40px", height: "40px" }}
              >
                {s.step}
              </div>
              <small
                className="mt-2 fw-bold"
                style={{
                  color: s.step <= currentStep ? "#363744" : "#B3B3B3",
                }}
              >
                {s.label}
              </small>
            </div>

            {/* الخطوط */}
            {index < steps.length - 1 && (
              <div
                className="flex-grow-1"
                style={{
                  height: "2px",
                  margin: "0 10px",
                  backgroundImage:
                    "repeating-linear-gradient(to right, gray 0, gray 10px, transparent 10px, transparent 20px)",
                }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
