import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavDropdown } from "react-bootstrap";

export default function DesktopMenu() {
  const { t, i18n } = useTranslation("header");
  const dir = i18n.dir();

  return (
    <nav
      className="d-flex justify-content-between align-items-center px-5 py-3 shadow-sm bg-white"
      style={{ direction: dir }}
    >
      {/* Logo */}
      <Link to="/" className="text-decoration-none">
        <img
          src="https://maximcenter.com/assets/Logo-guUSaGI8.svg"
          alt="Maxim Logo"
          style={{ width: "150px" }}
        />
      </Link>

      {/* Links */}
      <div className="d-flex align-items-center gap-4">
        <NavDropdown title={t("menu.about")} id="about-dropdown">
          <NavDropdown.Item as={Link} to="/aboutus">
            {t("menu.aboutus")}
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/policies">
            {t("menu.policies")}
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/privacy">
            {t("menu.privacy")}
          </NavDropdown.Item>
        </NavDropdown>

        <Link to="/blog" className="text-dark text-decoration-none fw-semibold">
          {t("menu.blog")}
        </Link>

        <Link
          to="/contact"
          className="text-dark text-decoration-none fw-semibold"
        >
          {t("menu.contact")}
        </Link>
      </div>

      {/* Language Switch */}
      <button
        className="btn btn-outline-dark"
        onClick={() => i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar")}
      >
        {i18n.language === "ar" ? "EN" : "AR"}
      </button>
    </nav>
  );
}
