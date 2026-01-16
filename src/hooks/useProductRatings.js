// src/hooks/useProductRatings.js
import { useQuery } from "@tanstack/react-query";

export function useProductRatings(productId) {
  return useQuery({
    queryKey: ["productRatings", productId], // كل منتج له key خاص
    queryFn: async () => {
      if (!productId) return [];
      const res = await fetch(
        `https://maxim-test.courseszone-eg.com/api/products/${productId}/ratings`
      );
      if (!res.ok) throw new Error("فشل تحميل التقييمات");
      const data = await res.json();
      return data.data || []; // نرجع مصفوفة التقييمات
    },
    enabled: !!productId, // استعلام فقط إذا كان productId موجود
    staleTime: 1000 * 60 * 5, // 5 دقائق قبل إعادة الجلب
  });
}
