// src/hooks/useCategories.js
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext";

export function useCategories() {
  const { language } = useLanguage();

  return useQuery({
    queryKey: ["categories", language],
    queryFn: async () => {
      const res = await fetch("https://maxim-test.courseszone-eg.com/api/categories", {
        headers: { "Accept-Language": language || "en" },
      });

      if (!res.ok) throw new Error("فشل تحميل الفئات");

      const data = await res.json();
      return data || []; // افتراضياً array فارغ إذا مفيش بيانات
    },
  });
}
