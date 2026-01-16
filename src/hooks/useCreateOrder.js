import { useState } from "react";

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);

  const createOrder = async (orderData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://maxim-test.courseszone-eg.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        setLoading(false);
        return { success: false, message: text || "خطأ غير متوقع من السيرفر" };
      }

      setLoading(false);

      if (response.ok && data.success) {
        return { success: true, message: data.message || "تم إنشاء الطلب بنجاح" };
      } else {
        return { success: false, message: data.message || "فشل إنشاء الطلب" };
      }
    } catch (error) {
      setLoading(false);
      return { success: false, message: error.message || "خطأ في الشبكة" };
    }
  };

  return { createOrder, loading };
};
