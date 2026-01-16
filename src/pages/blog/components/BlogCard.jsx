import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BlogCard({ post }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("blogs");
  const dir = i18n.dir();

  return (
    <div
      className="rounded-2 p-2 sec-bg blog-post text-decoration-none text-dark h-100 d-flex flex-column"
      style={{
        cursor: "pointer",
        minHeight: "340px",
        // ✅ شيلنا maxHeight لأنها السبب في قص الكلام
        overflow: "visible", // ✅ عشان ما يخفيش أي جزء من النص
      }}
      onClick={() => navigate(`/blogpage/${post.id}`)}
    >
      <img
        src={
          post.image
            ? `https://maxim-test.courseszone-eg.com/storage/${post.image}`
            : "/fallback-image.jpg"
        }
        className="w-100 rounded-2 mb-3 object-fit-cover"
        style={{ height: "165px", objectFit: "cover" }}
        alt={post.title}
      />

      {/* ✅ العنوان */}
      <h4
        style={{
          whiteSpace: "normal", // ✅ يخلي الكلام يلف لسطر تاني بدل القص
          overflow: "visible",
          textOverflow: "unset",
          lineHeight: "1.7",
          marginBottom: "8px",
        }}
      >
        {post.title}
      </h4>

      {/* ✅ التفاصيل */}
      <p
  className="text-secondary flex-grow-1 blog-preview"
>
  {post.content}
</p>



      <div className="d-flex justify-content-end mt-auto mb-3">
        <span
          className="p-1 text-decoration-none text-dark d-flex align-items-center more-link"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/blogpage/${post.id}`);
          }}
          style={{ cursor: "pointer", gap: "5px" }}
        >
          <span className="link-highlight" style={{ fontSize: "18px" }}>
            {t("readMore")}
          </span>
          <span
            className="link-highlight-icon fw-bold"
            style={{ transition: "transform 0.3s ease" }}
          >
            &gt;&gt;
          </span>
        </span>
      </div>

      <style>
        {`
          .more-link:hover .link-highlight-icon {
            transform: translateX(${dir === "rtl" ? "-8px" : "8px"});
          }
        `}
      </style>
    </div>
  );
}
