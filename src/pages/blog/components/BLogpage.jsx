import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogs } from "../../../hooks/useBlogs";
import { useTranslation } from "react-i18next";
import BlogCard from "./BlogCard";

export default function BlogPage() {
  const { t } = useTranslation("blogs");
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: blogs = [], isLoading } = useBlogs(10);

  if (isLoading) {
    return <p className="text-center my-5">{t("loadingSingleBlog")}</p>;
  }

  const post = blogs.find((b) => String(b.id) === String(id));

  if (!post) {
    return (
      <div className="container my-5 text-center">
        <p>{t("notFound")}</p>
        <button className="btn btn-primary" onClick={() => navigate("/blog")}>
          {t("backToBlogs")}
        </button>
      </div>
    );
  }

  const relatedBlogs = blogs
    .filter((b) => String(b.id) !== String(id))
    .slice(0, 3);

  return (
    <div className="container my-5">
      {/* البوست الرئيسي */}
      <img
        src={
          post.image
            ? `https://maxim-test.courseszone-eg.com/storage/${post.image}`
            : "/fallback-image.jpg"
        }
        alt={post.title}
        className="w-100 rounded-2 mb-4 object-fit-cover"
        style={{ maxHeight: "570px" }}
      />

      <div className="mb-4">
        <h2 className="mb-3">{post.title}</h2>
        <div className="d-flex align-items-center mb-3 text-muted" style={{ gap: "1rem" }}>
          <div className="d-flex align-items-center">
            <img
              src="/assets/date.jpg"
              alt={t("date")}
              className="me-1"
              style={{ width: "20px" }}
            />
            {new Date(post.created_at).toLocaleDateString("ar-EG")}
          </div>
          <div>
            <i className="bi bi-clock-fill me-1"></i>
            {new Date(post.created_at).toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        <p className="text-secondary">{post.content}</p>
      </div>

      {/* العنوان الخاص بالـ related blogs */}
      <h3 className="mt-5 mb-4">{t("relatedBlogs")}</h3>

      {/* الريليتد بلوجز بنفس تصميم صفحة البلوجات */}
      <div className="row">
        {relatedBlogs.map((blog) => (
    <div key={blog.id} className="col-12 col-md-6 col-lg-4 mb-4">
      <BlogCard post={blog} />
    </div>
  ))}
      </div>
    </div>
  );
}
