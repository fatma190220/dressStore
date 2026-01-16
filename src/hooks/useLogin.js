// src/hooks/useLogin.js
import { useState } from "react";
import { toast } from "react-toastify";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const login = async (form, t) => {
    let newErrors = {};
    if (!form.email) newErrors.email = t("login.errors.emailRequired");
    if (!form.password) newErrors.password = t("login.errors.passwordRequired");

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return { success: false };

    try {
      setLoading(true);

      const res = await fetch("https://maxim-test.courseszone-eg.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "include", // لو السيرفر يحتاج إرسال الكوكيز أو تعامل مع الجلسات
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // لو الـ API رجّع خطأ
        toast.error(data.message || t("login.errors.invalidCredentials"));
        return { success: false };
      }

      toast.success(t("login.success"));

      // خزّن التوكن أو بيانات المستخدم
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("userData", JSON.stringify(data.user));
      }

      return { success: true };
    } catch (error) {
      toast.error(t("login.errors.connectionError"));
      console.error("Login error:", error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, errors };
}
