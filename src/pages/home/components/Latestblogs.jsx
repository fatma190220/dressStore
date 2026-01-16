import React from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../../../hooks/useBlogs";
import { useSettings } from "../../../hooks/useSettings";
import { useTranslation } from "react-i18next";
import BlogCard from "../../blog/components/BlogCard";

export default function Latestblogs() {
  const navigate = useNavigate();
  const { data: blogs, isLoading: blogsLoading } = useBlogs(6);
  const { data: settings, isLoading: settingsLoading } = useSettings();
  const { t, i18n } = useTranslation(["home", "blogs"]);
  const dir = i18n.dir();

  if (blogsLoading || settingsLoading) {
    return <p className="text-center my-5">{t("loading.data")}</p>;
  }

  return (
    <div className="mt-5">
      <div className="container d-flex justify-content-between mb-5 align-items-end mt-5 flex-wrap">
        <div>
          <h2>{settings?.blog_title || "أحدث التدوينات"}</h2>
          <p className="fw-bold text-secondary">
            {settings?.blog_description ||
              "أحدث التدوينات تلهمك بأفكار تنسيقات عصرية ونصائح لاختيار الفساتين المثالية لك."}
          </p>
        </div>

        {/* 🔗 Show More link */}
        <div className="d-flex justify-content-end me-auto">
          <a
            href="/blog"
            className="fw-bold text-secondary text-decoration-none d-flex align-items-center gap-1 more-link"
          >
            <span>{t("home:buttons.showMore")}</span>
            <span
              className="link-highlight-icon fw-bold"
              style={{ transition: "transform 0.3s ease" }}
            >
              &gt;&gt;
            </span>
          </a>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {blogs?.map((post, idx) => (
            <div
              key={post.id || idx}
              className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center"
            >
              {/* ✅ استخدم مكون الكارت بدل التكرار */}
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>

   
    </div>
  );
}
