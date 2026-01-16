import { useState } from "react";

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const changePassword = async ({ oldPassword, newPassword }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://maxim-test.courseszone-eg.com/api/profile/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            current_password: oldPassword, // مطابق للـ API
            password: newPassword,
          }),
        }
      );

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        setLoading(false);
        return { success: false, message: text || "حدث خطأ من السيرفر" };
      }

      setLoading(false);

      if (response.ok && data.success) {
        return { success: true, message: data.message || "تم تغيير كلمة المرور" };
      } else {
        return { success: false, message: data.message || "حدث خطأ أثناء تغيير كلمة المرور" };
      }
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: error.message || "حدث خطأ أثناء تغيير كلمة المرور",
      };
    }
  };

  return { changePassword, loading };
};
