import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "../../hooks/useBlogs";
import { useTranslation } from "react-i18next";
import BlogCard from "./components/BlogCard";

export default function Blog() {
  const { t, i18n } = useTranslation("blogs");
  const dir = i18n.dir();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: blogs = [], isLoading, isError } = useBlogs();

  if (isLoading) return <p className="text-center my-5">{t("loadingBlogs")}</p>;
  if (isError) return <p className="text-center my-5">{t("errorBlogs")}</p>;

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-5">
      {/* 🔍 Search Bar */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="d-flex justify-content-center mt-5 mb-5 px-3"
      >
        <div
          className="input-icon-wrapper d-flex flex-wrap shadow p-2 rounded"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <i className="bi bi-search me-2 align-self-center"></i>
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="form-control flex-grow-1 mb-2 mb-md-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="main-bg px-4 py-2 rounded border-0 text-white ms-2"
            onClick={(e) => e.preventDefault()}
          >
            {t("searchButton")}
          </button>
        </div>
      </form>

      {/* 📰 Blog Posts */}
      <div className="row justify-content-center">
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-muted">{t("noBlogs")}</p>
        ) : (
          filteredBlogs.map((post) => (
           <div key={post.id} className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
      <BlogCard post={post} />
    </div>
          ))
        )}
      </div>

      {/* 💅 Hover animation */}
      <style>
        {`
          .more-link:hover .link-highlight-icon {
            transform: translateX(${dir === "rtl" ? "-8px" : "8px"});
          }

          .blog-post:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
        `}
      </style>
    </div>
  );
}
