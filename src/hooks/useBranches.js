// src/hooks/useBranches.js
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext";

export function useBranches() {
  const { language } = useLanguage(); // قراءة اللغة الحالية

  return useQuery({
    queryKey: ["branches", language], // key حسب اللغة
    queryFn: async () => {
      const res = await fetch("https://maxim-test.courseszone-eg.com/api/branches", {
        headers: { "Accept-Language": language },
      });

      if (!res.ok) throw new Error("فشل تحميل الفروع");
      const data = await res.json();
      return data || [];
    },
  });
}
