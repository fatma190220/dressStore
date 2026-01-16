import { toast } from "react-toastify";

export const useLogout = () => {
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      // ننده على API لو محتاجينه
      await fetch("https://maxim-test.courseszone-eg.com/api/logout", {
        method: "GET", // زي ما انتِ قولتي الـ endpoint عندك GET
        headers: {
          Authorization: `Bearer ${token}`, // لو API محتاج التوكن
        },
      });

      // نمسح التوكن وبيانات اليوزر
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.info("تم تسجيل الخروج.");
      return { success: true };
    } catch (error) {
      toast.error("فشل تسجيل الخروج، حاول مرة تانية.");
      return { success: false };
    }
  };

  return { logout };
};
