import { useState } from "react";
import { toast } from "react-toastify";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const signup = async (form, t) => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ✅ Validation
    if (!form.name) newErrors.name = t("signup.errors.nameRequired");
    if (!form.email) newErrors.email = t("signup.errors.emailRequired");
    else if (!emailRegex.test(form.email)) newErrors.email = t("signup.errors.emailInvalid");
    if (!form.mobile) newErrors.mobile = t("signup.errors.mobileRequired");
    if (!form.password) newErrors.password = t("signup.errors.passwordRequired");
    else if (form.password.length <= 6) newErrors.password = t("signup.errors.passwordMin");
    if (!form.confirmPassword) newErrors.confirmPassword = t("signup.errors.confirmPasswordRequired");
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = t("signup.errors.confirmPasswordMatch");
    if (!form.agreed) newErrors.agreed = t("signup.errors.agreeRequired");

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return { success: false };

    try {
      setLoading(true);

      // لو محتاج CSRF cookie
      await fetch("https://maxim-test.courseszone-eg.com/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",
      });

      const res = await fetch("https://maxim-test.courseszone-eg.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          password: form.password,
          password_confirmation: form.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        else toast.error(data.message || t("signup.serverError"));
        return { success: false };
      }

      toast.success(t("signup.success"));
      if (data.token) localStorage.setItem("token", data.token);

      return { success: true };
    } catch (error) {
      toast.error(t("signup.connectionError"));
      console.error("Signup error:", error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, errors };
}
