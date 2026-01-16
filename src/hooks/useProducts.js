// src/hooks/useProducts.js
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext";

export function useProducts() {
  const { language, currency } = useLanguage(); // جلب اللغة والعملة

  return useQuery({
    queryKey: ["products", language, currency], // اللغة والعملة كجزء من key
    queryFn: async () => {
      const res = await fetch(
        "https://maxim-test.courseszone-eg.com/api/products",
        {
          headers: {
            "Accept-Language": language,
            "Accept-Currency": currency, // لو الـ API يدعم
          },
        }
      );

      if (!res.ok) throw new Error("فشل تحميل المنتجات");

      const data = await res.json();
      return data.data || []; // نرجع المنتجات مباشرة
    },
    keepPreviousData: true, // للاحتفاظ بالبيانات القديمة أثناء تغيير اللغة/العملة
  });
}
