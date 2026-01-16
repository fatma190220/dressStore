import React from 'react';
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useProductRatings } from "../../../hooks/useProductRatings";


export default function Card({ id, title, price, src, onClick }) {
   const navigate = useNavigate();
   const { currency } = useLanguage();
    const { t } = useTranslation("home");

  const { data: ratings = [], isLoading: ratingsLoading } = useProductRatings(id);
  console.log("⭐ Ratings for product", id, ratings);
 const averageRating =
    ratings.length > 0
      ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
      : 0;


   // تأكد من أن السعر رقم
   const numericPrice = typeof price === "number" ? price : parseFloat(price) || 0;

   // تحويل السعر حسب العملة
   const displayPrice = (() => {
     switch (currency) {
       case "USD":
         return (numericPrice * 0.27).toFixed(2) + " $"; // مثال تحويل
       case "EGP":
         return (numericPrice * 8).toFixed(2) + " ج.م";
       default: // SAR
         return numericPrice.toFixed(2) + " ر.س";
     }
   })();

   return (
     <div className='card p-4 mb-3' style={{ backgroundColor:"rgb(226,255,226)", border:"none", width:"290px", height:"320px" }}>
        <div className='me-auto d-flex gap-2' onClick={onClick}>
            <img src={src} style={{ width:"180px", height:"180px" }} className="mt-3" />

   <div>      
   <div className="d-flex align-items-center justify-content-center gap-2">
  <i className="bi bi-star-fill" style={{ color: "gold", fontSize: "20px" }}></i>
  <span className="fw-semibold" style={{ fontSize: "18px" }}>
    {averageRating.toFixed(1)}
  </span>
</div>
</div>   
            
        </div>
        
        <h5 className='mt-3'>{title}</h5>
        <div className='d-flex justify-content-between mt-2'>
            <span className='text-secondary fs-5'>{displayPrice}</span>
            
           <a
  href="#"
  className="p-1 text-decoration-none text-dark d-flex align-items-center more-link"
  onClick={() => navigate("/products")}
>
  <span className="link-highlight" style={{ fontSize: "18px" }}>
    {t("buttons.more")}
  </span>
  <span
    className="link-highlight-icon fw-bold"
    style={{
      marginInlineStart: "6px",
      display: "inline-block",
      transition: "transform 0.3s ease",
    }}
  >
    &gt;&gt;
  </span>
</a>

        </div>
     </div>
   );
}
