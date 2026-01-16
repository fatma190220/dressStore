import React from 'react';
import { useTranslation } from "react-i18next";

export default function Tools({ src, title, text }) {
  const { i18n } = useTranslation();
  const dir = i18n.dir(); // 'rtl' أو 'ltr'

  return (
    <div className='mt-5 mb-5' style={{ width: "411px" }}>
      <div className="d-flex flex-column flex-md-row gap-3 align-items-center align-md-start toolitem">
        {/* الصورة */}
        <img src={src} className='mb-3 mb-md-0' alt="" />

        {/* النصوص */}
        <div
          className="d-flex flex-column text-center"
          style={{ alignItems:  "center" }} 
        >
          <h4
            className="mb-2"
            style={{
             textAlign: dir === "rtl" ? "right" : "left" ,
              width: "100%",
            }}
          >
            {title}
          </h4>
          <p className='fw-light' style={{ textAlign: dir === "rtl" ? "right" : "left" }}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
