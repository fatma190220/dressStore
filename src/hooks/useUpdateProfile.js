// src/hooks/useUpdateProfile.js
import { useState } from "react";
import { toast } from "react-toastify";

export function useUpdateProfile() {
  const [loading, setLoading] = useState(false);

  const updateProfile = async (form) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token"); // لو السيرفر بيحتاج Authorization
      const res = await fetch("https://maxim-test.courseszone-eg.com/api/profile/update", {
        method: "POST", // أو PUT حسب الـ API
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}), // إرسال التوكن لو موجود
        },
        body: JSON.stringify(form),
        credentials: "include", // في حالة الكوكيز
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "فشل تحديث البيانات");
        return { success: false };
      }

      // ✅ نجاح: تحديث البيانات المحلية
      if (data.user) {
        localStorage.setItem("userData", JSON.stringify(data.user));
      }

      toast.success("تم تحديث البيانات بنجاح!");
      return { success: true, user: data.user };
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("حصل خطأ في الاتصال");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
}
