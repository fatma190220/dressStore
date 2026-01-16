import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavDropdown } from "react-bootstrap";

export default function MobileMenu() {
  const { t, i18n } = useTranslation("header");
  const dir = i18n.dir();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="shadow-sm bg-white px-3 py-2"
      style={{ direction: dir, position: "relative" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/">
          <img
            src="https://maximcenter.com/assets/Logo-guUSaGI8.svg"
            alt="Maxim Logo"
            style={{ width: "120px" }}
          />
        </Link>

        {/* Burger Icon */}
        <button
          className="btn border-0"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <i className={`bi ${isOpen ? "bi-x-lg" : "bi-list"} fs-3`}></i>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="bg-white shadow rounded mt-3 py-3"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <NavDropdown
            title={t("menu.about")}
            id="about-dropdown-mobile"
            className="px-3"
          >
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

          <Link
            to="/blog"
            className="d-block px-3 py-2 text-dark text-decoration-none fw-semibold"
            onClick={() => setIsOpen(false)}
          >
            {t("menu.blog")}
          </Link>

          <Link
            to="/contact"
            className="d-block px-3 py-2 text-dark text-decoration-none fw-semibold"
            onClick={() => setIsOpen(false)}
          >
            {t("menu.contact")}
          </Link>

          {/* Language Switch */}
          <button
            className="btn btn-outline-dark mx-3 mt-3 w-auto"
            onClick={() =>
              i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar")
            }
          >
            {i18n.language === "ar" ? "EN" : "AR"}
          </button>
        </div>
      )}
    </nav>
  );
}
