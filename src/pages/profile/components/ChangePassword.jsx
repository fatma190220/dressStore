import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../component/Button";
import { useChangePassword } from "../../../hooks/useChangePassword";
import { useTranslation } from "react-i18next";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { changePassword, loading } = useChangePassword();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation("profile");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // تحقق من طول كلمة المرور
    if (form.newPassword.length <= 6) {
      toast.error(t("profile.password.errorShort"));
      return;
    }

    // تحقق من تطابق كلمة المرور
    if (form.newPassword !== form.confirmPassword) {
      toast.error(t("profile.password.errorMismatch"));
      return;
    }

    // استخدام الهوك لتغيير كلمة المرور
    const result = await changePassword({
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    });

    if (result.success) {
      toast.success(t("profile.password.success"));
      navigate("/done-resetting");
    } else {
      toast.error(result.message);
    }
  };

  // دالة إعادة استخدام input لكلمة المرور مع أيقونات العين والقفل
  const renderPasswordInput = (label, value, setValue, show, setShow) => (
    <div className="mb-3" style={{ position: "relative" }}>
      <label className="mb-2 fw-bold">{label}</label>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="form-control ps-5"
        required
      />
      <i
        className="bi bi-lock-fill"
        style={{
          position: "absolute",
          top: "50%",
          left: "15px",
          transform: "translateY(-50%)",
          color: "#6c757d",
        }}
      ></i>
      <i
        className={show ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}
        style={{
          position: "absolute",
          top: "50%",
          right: "15px",
          transform: "translateY(-50%)",
          cursor: "pointer",
          color: "#6c757d",
        }}
        onClick={() => setShow(!show)}
      ></i>
    </div>
  );

  return (
    <div className="d-flex flex-column">
      <div
        className="shadow rounded p-4 container d-flex flex-column justify-content-center align-items-center bg-white mt-5"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h3 className="fs-5">{t("profile.password.title")}</h3>
        <form style={{ width: "100%" }} onSubmit={handleChangePassword}>
          {renderPasswordInput(
            t("profile.password.old"),
            form.oldPassword,
            (val) => setForm({ ...form, oldPassword: val }),
            showOld,
            setShowOld
          )}
          {renderPasswordInput(
            t("profile.password.new"),
            form.newPassword,
            (val) => setForm({ ...form, newPassword: val }),
            showNew,
            setShowNew
          )}
          {renderPasswordInput(
            t("profile.password.confirm"),
            form.confirmPassword,
            (val) => setForm({ ...form, confirmPassword: val }),
            showConfirm,
            setShowConfirm
          )}

          <Button
            type="submit"
            title={loading ? t("profile.password.saving") : t("profile.password.save")}
            style={{ width: "100%" }}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}
