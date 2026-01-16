import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext"; // لو عندك Context للغة

export function useTerms() {
  const { language } = useLanguage(); // قراءة اللغة الحالية

  return useQuery({
    queryKey: ["terms", language], // لو اللغة اتغيرت، يعيد الجلب
    queryFn: async () => {
      const res = await fetch(
        "https://maxim-test.courseszone-eg.com/api/pages/terms",
        {
          headers: {
            "Accept-Language": language, // إرسال اللغة للسيرفر
          },
        }
      );
      if (!res.ok) throw new Error("فشل تحميل الشروط والأحكام");
      const data = await res.json();
      return data; // الكائن اللي فيه title و content
    },
  });
}
