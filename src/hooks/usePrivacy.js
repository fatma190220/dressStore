// src/hooks/usePrivacy.js
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext"; // لو عندك Context للغة

export function usePrivacy() {
  const { language } = useLanguage(); // قراءة اللغة الحالية

  return useQuery({
    queryKey: ["privacy", language], // لو اللغة اتغيرت، يعيد الجلب
    queryFn: async () => {
      const res = await fetch(
        "https://maxim-test.courseszone-eg.com/api/pages/privacy",
        {
          headers: {
            "Accept-Language": language, // إرسال اللغة للسيرفر
          },
        }
      );
      if (!res.ok) throw new Error("فشل تحميل سياسة الخصوصية");
      const data = await res.json();
      return data; // data هي الكائن اللي فيه title و content
    },
  });
}
