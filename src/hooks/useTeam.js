// src/hooks/useTeam.js
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext";

export function useTeam() {
  const { language } = useLanguage(); // قراءة اللغة الحالية

  return useQuery({
    queryKey: ["team", language], // key حسب اللغة
    queryFn: async () => {
      const res = await fetch("https://maxim-test.courseszone-eg.com/api/teams", {
        headers: { 
          "Accept-Language": language,
          "Accept": "application/json",
        },
      });

      if (!res.ok) throw new Error("فشل تحميل بيانات الفريق");
      const data = await res.json();

      // نتأكد إنه مصفوفة
      return Array.isArray(data) ? data : [];
    },
  });
}
