import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t, i18n } = useTranslation("footer");
  const dir = i18n.dir(); // 👈 RTL or LTR

  return (
    <div className='sec-bg d-flex flex-column justify-content-between mt-1' style={{ minHeight: '400px'}}>
      <Container className="py-5 d-flex flex-column justify-content-between">
        <Row className="gy-4">

          {/* Logo and Description */}
          <Col
            md={12}
            lg={4}
            className={`text-center ${dir === "rtl" ? "text-lg-end" : "text-lg-start"}`}
            style={{ direction: dir }}
          >
            <img
              src="https://maximcenter.com/assets/Logo-guUSaGI8.svg"
              className="mb-3"
              style={{ maxWidth: "150px" }}
              alt="Maxim Logo"
            />
            <p>{t("description")}</p>
          </Col>

          {/* Quick Links */}
          <Col md={12} lg={4} className="text-center">
            <h4
              className="d-flex justify-content-center mb-3"
              style={{ fontSize: "20px", fontWeight: "600" }}
            >
              {t("quickLinks")}
            </h4>
            <div className="d-flex flex-column align-items-center">
              <Link to="/aboutus" className="text-dark text-decoration-none p-1" style={{fontSize:"16px", fontWeight:"600"}}>
                <span className="fs-4">&rsaquo;</span> {t("links.about")}
              </Link>
              <Link to="/blog" className="text-dark text-decoration-none p-1" style={{fontSize:"16px", fontWeight:"600"}}>
                <span className="fs-4">&rsaquo;</span> {t("links.blog")}
              </Link>
              <Link to="/privacy" className="text-dark text-decoration-none p-1" style={{fontSize:"16px", fontWeight:"600"}}>
                <span className="fs-4">&rsaquo;</span> {t("links.privacy")}
              </Link>
              <Link to="/policies" className="text-dark text-decoration-none p-1" style={{fontSize:"16px", fontWeight:"600"}}>
                <span className="fs-4">&rsaquo;</span> {t("links.policies")}
              </Link>
              <Link to="/contact" className="text-dark text-decoration-none p-1" style={{fontSize:"16px", fontWeight:"600"}}>
                <span className="fs-4">&rsaquo;</span> {t("links.contact")}
              </Link>
            </div>
          </Col>

          {/* Newsletter */}
          <Col
            md={12}
            lg={4}
            
className={`d-flex flex-column align-items-center
            
                align-items-lg-start text-lg-end
                
             text-center`}
            style={{ direction: dir }}>

            <label htmlFor="email" className="fs-5 fw-bold mb-3 d-block">
              {t("newsletter.label")}
            </label>

            <div
              className="d-flex flex-wrap shadow mb-4 p-2 align-items-center gap-2"
              style={{
                background: "#fff",
                borderRadius: "5px",
                width: "100%",
                maxWidth: "350px",
                direction: dir,
              }}
            >
              <i className="bi bi-envelope-fill"></i>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder={t("newsletter.placeholder")}
                className="form-control border-0"
                style={{ minWidth: "150px", flex: 1 }}
              />
              <button className="main-bg p-2 rounded border-0 text-white">
                {t("newsletter.button")}
              </button>
            </div>

            <div className="d-flex gap-3 justify-content-end">
              <i className="bi bi-youtube fs-4 cursor-pointer"></i>
              <i className="bi bi-linkedin fs-4 cursor-pointer"></i>
              <i className="bi bi-whatsapp fs-4 cursor-pointer"></i>
              <i className="bi bi-facebook fs-4 cursor-pointer"></i>
            </div>
          </Col>

        </Row>
      </Container>

      {/* Footer Bottom */}
      <div className='main-bg w-100 text-center text-white py-3 mt-3'>
        {t("copyright")}
      </div>
    </div>
  )
}
