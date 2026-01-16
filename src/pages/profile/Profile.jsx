import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../component/Button';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../../hooks/useProfile'; // هوك جديد لجلب بيانات البروفايل

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation("profile");
  const { profile, loading: loadingProfile, error } = useProfile();
  const { updateProfile, loading: updating } = useUpdateProfile();

  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (profile) setForm(profile);
    if (error) toast.error(t("profile.loadError"));
  }, [profile, error, t]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const payload = { ...form };
    if (!form.password) delete payload.password; // إرسال بدون باسورد لو فاضي

    const result = await updateProfile(payload);
    if (result.success) {
      toast.success(t("profile.updated"));
      navigate('/saved-changes');
    } else {
      toast.error(result.message || t("profile.updateFailed"));
    }
  };

  if (loadingProfile) return <p className="text-center mt-5">جاري تحميل البيانات...</p>;

  return (
    <div className='d-flex flex-column' style={{ minHeight: '100vh', gap: '120px' }}>
      <div className="shadow rounded p-4 container d-flex flex-column justify-content-center align-items-center bg-white mt-5" style={{ width: '100%', maxWidth: '500px' }}>
        <img src='https://maximcenter.com/assets/Logo-guUSaGI8.svg' className='w-30 mb-3' alt="Logo"/>
        <h3 className='fs-5'>{t("profile.title")}</h3>
        <p>{t("profile.description")}</p>

        <form style={{ width: "100%" }} onSubmit={handleSaveChanges}>
          {/* الاسم */}
          <label htmlFor="name" className='mb-2 fw-bold'>{t("profile.name")}</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={t("profile.name")}
            value={form.name}
            className='form-control mb-3'
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          {/* الايميل */}
          <label htmlFor="email" className='mb-2 fw-bold'>{t("profile.email")}</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t("profile.email")}
            value={form.email}
            className='form-control mb-3'
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          {/* الموبايل */}
          <label htmlFor="mobile" className='mb-2 fw-bold'>{t("profile.mobile")}</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            placeholder={t("profile.mobile")}
            value={form.mobile}
            className='form-control mb-3'
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            required
          />

          {/* كلمة المرور */}
          <label htmlFor="password" className='mb-2 fw-bold'>{t("profile.passwordd")}</label>
          <div style={{ position: "relative" }} className="mb-3">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder={t("profile.passwordd")}
              value={form.password}
              className='form-control ps-5'
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {/* أيقونة القفل */}
            <i
              className="bi bi-lock-fill"
              style={{
                position: "absolute",
                top: "50%",
                left: "15px",
                transform: "translateY(-50%)",
                color: "#6c757d"
              }}
            ></i>
            {/* أيقونة العين */}
            <i
              className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}
              style={{
                position: "absolute",
                top: "50%",
                right: "15px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#6c757d"
              }}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <div className="d-flex gap-2 mt-3">
            <Button type="submit" title={updating ? t("profile.saving") : t("profile.save")} style={{ flex: 1 }} disabled={updating} />
            <Button type="button" title={t("profile.changePassword")} style={{ flex: 1 }} onClick={() => navigate('/change-password')} />
          </div>
        </form>
      </div>
    </div>
  );
}
