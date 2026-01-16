 // src/hooks/useSettings.js
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext";

export function useSettings() {
  const { language } = useLanguage(); // اللغة الحالية

  return useQuery({
    queryKey: ["settings", language], // لو اللغة اتغيرت، يعيد جلب البيانات
    queryFn: async () => {
      const res = await fetch("https://maxim-test.courseszone-eg.com/api/settings", {
        headers: { "Accept-Language": language },
      });
      if (!res.ok) throw new Error("فشل تحميل الإعدادات");
      return res.json();
    },
  });
}
