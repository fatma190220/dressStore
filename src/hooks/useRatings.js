// src/hooks/useRatings.js
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext";

export function useRatings(productId) {
  const { language } = useLanguage();

  return useQuery({
    queryKey: ["ratings", productId, language],
    queryFn: async () => {
      if (!productId) return [];

      const res = await fetch(`https://maxim-test.courseszone-eg.com/api/products/${productId}/ratings`, {
        headers: { "Accept-Language": language || "en" },
      });

      if (!res.ok) throw new Error("فشل تحميل التقييمات");

      const json = await res.json();
      
      return json.data || []; // البيانات موجودة داخل data
    },
    enabled: !!productId,
  });
}
