// src/hooks/useAbout.js
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext";

export function useAbout() {
  const { language } = useLanguage();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["aboutData", language],
    queryFn: async () => {
      const res = await fetch(
        "https://maxim-test.courseszone-eg.com/api/pages/about",
        { headers: { "Accept-Language": language } }
      );
      if (!res.ok) throw new Error("فشل تحميل بيانات About");
      return res.json();
    },
  });

  return { data, isLoading, isError };
}
