import { Container, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/context';
import Button from './Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../pages/app.css';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from "react-i18next";
import { useLogout } from "../hooks/useLogout";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [user, setUser] = useState(null);
  const { language, setLanguage, currency, setCurrency } = useLanguage();
  const { t, i18n } = useTranslation("header");
  const { logout } = useLogout();

  const [settings, setSettings] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  useEffect(() => {
    fetch("https://maxim-test.courseszone-eg.com/api/settings", {
      headers: { "Accept-Language": "ar" },
    })
      .then(res => res.json())
      .then(data => setSettings(data.data))
      .catch(err => console.error("خطأ في تحميل الإعدادات:", err));
  }, []);

  return (
    <div
      className="header-wrapper"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1050,
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* Top Header */}
      <div className="main-bg" style={{ height: '60px' }}>
        <Container className="d-flex justify-content-between align-items-center" style={{ height: '60px' }}>
          <div className="fw-semibold d-flex align-items-center gap-3">
            <img src="https://maximcenter.com/assets/ar-CEUM5CgG.svg" alt="icon" />
            <span>{t("topHeader.offer")}</span>
          </div>

          <div className="d-flex gap-3">
            {[
              { icon: "youtube", url: `https://youtube.com/${settings?.youtube_url}` },
              { icon: "linkedin", url: `https://linkedin.com/in/${settings?.linkedin_url}` },
              { icon: "whatsapp", url: `https://wa.me/${settings?.whatsapp_number}` },
              { icon: "facebook", url: `https://facebook.com/${settings?.facebook_url}` },
            ]
              .filter(item => item.url)
              .map(({ icon, url }) => (
                <a key={icon} href={url} target="_blank" rel="noopener noreferrer">
                  <i className={`bi bi-${icon} fs-4 cursor-pointer text-dark`}></i>
                </a>
              ))}
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <nav className="container d-flex justify-content-between align-items-center py-3">
        {/* Logo */}
        <img
          src={
            settings?.site_logo
              ? `https://maxim-test.courseszone-eg.com/uploads/settings/${settings.site_logo}`
              : "/assets/logo.png"
          }
          alt="logo"
          style={{ height: "50px" }}
          className="flex-1"
        />

        {/* Desktop Menu */}
        <div className="d-none d-lg-flex align-items-center gap-4 flex-4">
          <Link to="/" className={`text-dark text-decoration-none ${location.pathname === '/' ? 'isactive' : ''}`}>{t("menu.home")}</Link>
          <Link to="/aboutus" className={`text-dark text-decoration-none ${location.pathname === '/aboutus' ? 'isactive' : ''}`}>{t("menu.about")}</Link>
          <Link to="/products" className={`text-dark text-decoration-none ${location.pathname === '/products' ? 'isactive' : ''}`}>{t("menu.products")}</Link>
          <Link to="/blog" className={`text-dark text-decoration-none ${location.pathname === '/blog' ? 'isactive' : ''}`}>{t("menu.blog")}</Link>
          <Link to="/contact" className={`text-dark text-decoration-none ${location.pathname === '/contact' ? 'isactive' : ''}`}>{t("menu.contact")}</Link>
        </div>

        {/* Actions */}
        <div className="d-none d-lg-flex align-items-center gap-4 actions-section">
          {/* Cart + Language */}
          <div className="d-flex align-items-center gap-3 cart-lang-group me-5">
            {/* Cart */}
            <div
              className="position-relative cursor-pointer cart-icon-wrapper"
              onClick={() => navigate('/cart')}
            >
              <i className="bi bi-cart-fill cart-icon"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-badge">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Language + Currency */}
            <NavDropdown
              title={
                <>
                  <img
                    src={language === "ar" ? "https://maximcenter.com/assets/ar-CEUM5CgG.svg" : "/assets/flag.svg"}
                    className="ms-2"
                    alt={language}
                  />
                  {language === "ar" ? "العربية" : "English"}
                </>
              }
              align="end"
            >
              <div className="px-3 py-2" style={{ minWidth: '250px' }}>
                <h5 className="text-end w-100" style={{ direction: "rtl" }}>{t("dropdown.language")}</h5>
                <div className="form-check d-flex align-items-center justify-content-between gap-2 mb-2">
                  <label className="form-check-label">
                    <img src="https://maximcenter.com/assets/ar-CEUM5CgG.svg" className="ms-2" alt="ar" /> العربية
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="lang"
                    checked={language === "ar"}
                    onChange={() => {
                      setLanguage("ar");
                      localStorage.setItem("language", "ar");
                      i18n.changeLanguage("ar");
                    }}
                  />
                </div>

                <div className="form-check d-flex align-items-center justify-content-between gap-2 mb-2">
                  <label className="form-check-label">
                    <img src="/assets/flag.svg" className="ms-2" alt="en" /> English
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="lang"
                    checked={language === "en"}
                    onChange={() => {
                      setLanguage("en");
                      localStorage.setItem("language", "en");
                      i18n.changeLanguage("en");
                    }}
                  />
                </div>

                <hr />

                <h5 className="text-end w-100" style={{ direction: "rtl" }}>{t("dropdown.currency")}</h5>
                {["SAR", "USD", "EGP"].map((cur) => (
                  <div key={cur} className="form-check d-flex align-items-center justify-content-between gap-2 mb-2">
                    <label className="form-check-label">{t(`dropdown.${cur.toLowerCase()}`)}</label>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="currency"
                      checked={currency === cur}
                      onChange={() => {
                        setCurrency(cur);
                        localStorage.setItem("currency", cur);
                      }}
                    />
                  </div>
                ))}
              </div>
            </NavDropdown>
          </div>

          {/* Auth Buttons */}
          {user ? (
            <NavDropdown
              title={<span className="fw-bold cursor-pointer">{user.name}</span>}
              align="end"
              className="user-dropdown"
            >
              <NavDropdown.Item onClick={() => navigate('/profile')}>
                <i className="bi bi-person-fill fs-5"></i> {t("user.profile")}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/myorders')}>
                <i className="bi bi-bag-fill"></i> {t("user.orders")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={async () => {
                  const result = await logout();
                  if (result.success) {
                    localStorage.removeItem("userData");
                    setUser(null);
                    navigate("/");
                  }
                }}
              >
                <i className="bi bi-box-arrow-right"></i> {t("user.logout")}
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Button icon={<i className="bi bi-person-fill"></i>} title={t("user.login")} onClick={() => navigate('/login')} />
              <Button icon={<i className="bi bi-person-add"></i>} title={t("user.signup")} onClick={() => navigate('/signup')} />
            </>
          )}
        </div>

        {/* Hamburger */}
        <div className="d-lg-none">
          <button className="btn p-0 border-0 shadow-none" onClick={() => setShowMenu(true)}>
            <i className="bi bi-list fs-1"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="end" backdrop="true" style={{ zIndex: 1060 }}>
        <Offcanvas.Header closeButton />
        <Offcanvas.Body className="d-flex flex-column gap-3">

          {/* نفس قائمة الديسكتوب */}
          <Link to="/" className={`text-dark text-decoration-none ${location.pathname === '/' ? 'isactive' : ''}`}>{t("menu.home")}</Link>
          <Link to="/aboutus" className={`text-dark text-decoration-none ${location.pathname === '/aboutus' ? 'isactive' : ''}`}>{t("menu.about")}</Link>
          <Link to="/products" className={`text-dark text-decoration-none ${location.pathname === '/products' ? 'isactive' : ''}`}>{t("menu.products")}</Link>
          <Link to="/blog" className={`text-dark text-decoration-none ${location.pathname === '/blog' ? 'isactive' : ''}`}>{t("menu.blog")}</Link>
          <Link to="/contact" className={`text-dark text-decoration-none ${location.pathname === '/contact' ? 'isactive' : ''}`}>{t("menu.contact")}</Link>

          <hr />

          {/* كارت */}
          <div className="cart-wrapper position-relative d-inline-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }} onClick={() => navigate('/cart')}>
            <i className="bi bi-cart-fill fs-3 text-secondary"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger cart-count">
                {cartCount}
              </span>
            )}
          </div>

          <hr />

          {/* اللغة + العملة */}
         <NavDropdown
              title={
                <>
                  <img
                    src={language === "ar" ? "https://maximcenter.com/assets/ar-CEUM5CgG.svg" : "/assets/flag.svg"}
                    className="ms-2"
                    alt={language}
                  />
                  {language === "ar" ? "العربية" : "English"}
                </>
              }
              align="end"
            >
              <div className="px-3 py-2" style={{ minWidth: '250px' }}>
                <h5 className="text-end w-100" style={{ direction: "rtl" }}>{t("dropdown.language")}</h5>
                <div className="form-check d-flex align-items-center justify-content-between gap-2 mb-2">
                  <label className="form-check-label">
                    <img src="https://maximcenter.com/assets/ar-CEUM5CgG.svg" className="ms-2" alt="ar" /> العربية
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="lang"
                    checked={language === "ar"}
                    onChange={() => {
                      setLanguage("ar");
                      localStorage.setItem("language", "ar");
                      i18n.changeLanguage("ar");
                    }}
                  />
                </div>

                <div className="form-check d-flex align-items-center justify-content-between gap-2 mb-2">
                  <label className="form-check-label">
                    <img src="/assets/flag.svg" className="ms-2" alt="en" /> English
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="lang"
                    checked={language === "en"}
                    onChange={() => {
                      setLanguage("en");
                      localStorage.setItem("language", "en");
                      i18n.changeLanguage("en");
                    }}
                  />
                </div>

                <hr />

                <h5 className="text-end w-100" style={{ direction: "rtl" }}>{t("dropdown.currency")}</h5>
                {["SAR", "USD", "EGP"].map((cur) => (
                  <div key={cur} className="form-check d-flex align-items-center justify-content-between gap-2 mb-2">
                    <label className="form-check-label">{t(`dropdown.${cur.toLowerCase()}`)}</label>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="currency"
                      checked={currency === cur}
                      onChange={() => {
                        setCurrency(cur);
                        localStorage.setItem("currency", cur);
                      }}
                    />
                  </div>
                ))}
              </div>
            </NavDropdown>

          <hr />

          {/* تسجيل الدخول / المستخدم */}
          {user ? (
            <NavDropdown
              title={<span className="fw-bold cursor-pointer">{user.name}</span>}
              align="end"
              className="user-dropdown"
            >
              <NavDropdown.Item onClick={() => navigate('/profile')}>
                <i className="bi bi-person-fill fs-5"></i> {t("user.profile")}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/myorders')}>
                <i className="bi bi-bag-fill"></i> {t("user.orders")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={async () => {
                  const result = await logout();
                  if (result.success) {
                    localStorage.removeItem("userData");
                    setUser(null);
                    navigate("/");
                  }
                }}
              >
                <i className="bi bi-box-arrow-right"></i> {t("user.logout")}
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Button icon={<i className="bi bi-person-fill"></i>} title={t("user.login")} onClick={() => navigate('/login')} />
              <Button icon={<i className="bi bi-person-add"></i>} title={t("user.signup")} onClick={() => navigate('/signup')} />
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Header;
