// src/hooks/useBlogs.js
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext"; // استيراد الـ hook

export function useBlogs(limit = 6) {
  const { language } = useLanguage(); // قراءة اللغة الحالية

  return useQuery({
    queryKey: ["blogs", limit, language], // لما اللغة تتغير، يعيد جلب البيانات
    queryFn: async () => {
      const res = await fetch("https://maxim-test.courseszone-eg.com/api/blogs", {
        headers: { "Accept-Language": language }, // استخدام اللغة الحالية
      });
      if (!res.ok) throw new Error("فشل تحميل التدوينات");
      const data = await res.json();
      return (data.data || data || []).slice(0, limit);
    },
  });
}
