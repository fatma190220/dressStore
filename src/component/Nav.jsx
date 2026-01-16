import { Link, useLocation, matchRoutes } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Nav() {
  const location = useLocation();
  const { t } = useTranslation("nav");

  // تعريف الروتات وعناوينها
  const routes = [
    { path: "/", title: t("home") },
    { path: "/aboutus", title: t("aboutUs") },
    { path: "/products", title: t("products") },
    { path: "/singleproduct/:id", title: t("productDetails"), parent: "/products" },
    { path: "/contact", title: t("contact") },
    { path: "/blog", title: t("blog") },
    { path: "/blogpage/:id", title: t("blogPage"), parent: "/blog" },
    { path: "/cart", title: t("cart") },
    { path: "/policies", title: t("policies") },
    { path: "/privacy", title: t("privacy") },
    { path: "/login", title: t("login") },
    { path: "/signup", title: t("signup") },
    { path: "/reset", title: t("reset") },
    { path: "/code", title: t("code") },
    { path: "/newpassword", title: t("newPassword") },
    { path: "/done", title: t("done") },
    { path: "/profile", title: t("profile") },
    { path: "/change-password", title: t("changePassword") },
    { path: "/saved-changes", title: t("savedChanges") },
    { path: "/done-resetting", title: t("doneResetting") },
    { path: "/rating", title: t("rating") },
    { path: "/shippingdetails", title: t("shippingDetails"), parent: "/cart" },
    { path: "/logintoship", title: t("loginToShip"), parent: "/cart" },
    { path: "/paymethod", title: t("payMethod"), parent: "/cart" },
    { path: "/myorders", title: t("myOrders") }
  ];

  const matched = matchRoutes(
    routes.map((r) => ({ path: r.path })),
    location
  );

  if (!matched) return null;

  let breadcrumbItems = [
    { path: "/", label: <><i className="bi bi-house-door-fill ms-1"></i>{t("home")}</> }
  ];

  matched.forEach((m) => {
    const route = routes.find((r) => r.path === m.route.path);
    if (route) {
      if (route.parent) {
        const parentRoute = routes.find((r) => r.path === route.parent);
        if (parentRoute && !breadcrumbItems.find((b) => b.path === parentRoute.path)) {
          breadcrumbItems.push({ path: parentRoute.path, label: parentRoute.title });
        }
      }
      if (!breadcrumbItems.find((b) => b.path === route.path)) {
        breadcrumbItems.push({ path: route.path, label: route.title });
      }
    }
  });

  return (
    <div className="d-flex align-items-center nav w-100">
      <nav aria-label="breadcrumb" className="nav-content">
        <ol className="breadcrumb p-2 d-flex align-items-center container">
          {breadcrumbItems.map((item, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${index === breadcrumbItems.length - 1 ? "active" : ""} text-dark fs-4 text-decoration-none p-1`}
              aria-current={index === breadcrumbItems.length - 1 ? "page" : undefined}
            >
              {index !== breadcrumbItems.length - 1 ? (
                <>
                  {index !== 0 && <span className="fs-3 fw-bold me-3 ms-3">&rsaquo;</span>}
                  <Link to={item.path} className="text-dark text-decoration-none fw-bold" style={{ fontSize: "19px" }}>
                    {item.label}
                  </Link>
                </>
              ) : (
                <Link className="text-dark text-decoration-none fw-bold" style={{ fontSize: "19px" }}>
                  <span className="fs-3 fw-bold me-3 ms-3">&rsaquo;</span>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
