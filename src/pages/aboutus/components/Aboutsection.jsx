import React from 'react';
import { useAbout } from "../../../hooks/useAbout"; // الهوك المستقل للـ About section
import { useSettings } from "../../../hooks/useSettings"; // للـ settings فقط

export default function Aboutsection() {
  const BASE_URL = "https://maxim-test.courseszone-eg.com/uploads/";

  // استدعاء الهوكين
  const { data: settings, isLoading: loadingSettings } = useSettings();
  const { data: about, isLoading: loadingAbout } = useAbout();

  // لو البيانات لسه بتتحمّل
  if (loadingSettings || loadingAbout) {
    return <p className="text-center mt-5">جاري تحميل البيانات...</p>;
  }

  // تأكد من وجود الـ settings قبل استخدام الصور
  const images = [
    settings?.about_1_image ? `${BASE_URL}${settings.about_1_image}` : "/assets/aboutus1.jpg",
    settings?.about_2_image ? `${BASE_URL}${settings.about_2_image}` : "/assets/aboutus2.jpg",
    settings?.about_3_image ? `${BASE_URL}${settings.about_3_image}` : "/assets/aboutus3.jpg",
    settings?.about_4_image ? `${BASE_URL}${settings.about_4_image}` : "/assets/aboutus4.jpg",
  ];

  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5 container mb-5">
      {/* العنوان والديسكريبشن من الـ API */}
      <h2>{about?.title || "عنوان افتراضي"}</h2>
      <p className="w-50 mb-5 text-center text-sm-start">
        {about?.content || "محتوى افتراضي عن الشركة"}
      </p>

      {/* الصور */}
      <div className="d-flex flex-column flex-lg-row gap-4 justify-content-center mb-5 w-100">
        {images.map((img, index) => (
          <div
            key={index}
            className="about-img-wrapper"
            style={{
              transform: index % 2 !== 0 ? "translateY(30px)" : "translateY(0)",
            }}
          >
            <img
              src={img}
              alt={`about-${index + 1}`}
              className="rounded about-img"
              style={{ objectFit: "cover", height: "100%" }}
              onError={(e) => {
                e.target.src = `/assets/aboutus${index + 1}.jpg`; // fallback لو الصورة مش موجودة
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
