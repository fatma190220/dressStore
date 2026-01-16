import { useState, useContext } from "react";
import Button from "../../component/Button";
import { useParams } from "react-router-dom";
import Comments from "../products/components/comments";
import ProductList from "../../component/ProductsList";
import { CartContext } from "../../context/context";
import { toast } from "react-toastify";
import { useProducts } from "../../hooks/useProducts";
import { useProductRatings } from "../../hooks/useProductRatings";
import { useTranslation } from "react-i18next";

export default function ProductPage() {
  const { t } = useTranslation("products");
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("comments");
  const { addToCart } = useContext(CartContext);

  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: ratings = [], isLoading: ratingsLoading } = useProductRatings(id);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const product = products.find((p) => String(p.id) === String(id));

 const handleAddToCart = () => {
  if (!selectedSize) {
    toast.error("من فضلك اختر المقاس أولاً");
    return;
  }

  if (!selectedColor) {
    toast.error("من فضلك اختر اللون أولاً");
    return;
  }

  const productToAdd = {
    ...product,
    selectedSize,
    selectedColor,
  };

  addToCart(productToAdd);
  toast.success(t("page.addedToCart"));
};



  const getImageUrl = (path) =>
    path ? (path.startsWith("http") ? path : `https://maxim-test.courseszone-eg.com/${path}`) : "";

  if (productsLoading) return <div className="text-center my-5">{t("page.loadingProduct")}</div>;
  if (!product) return <div className="text-center my-5">{t("page.notFound")}</div>;

  const similarProducts = product.category
    ? products.filter((item) => item.category === product.category && String(item.id) !== id)
    : products.filter((item) => String(item.id) !== id);

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
      : 0;

  return (
    <div className="container">
      {/* الجزء العلوي: صورة وتفاصيل */}
      <div className="upper-part my-5 d-flex gap-4 flex-column flex-md-row align-items-center align-items-md-start">
        <div className="d-flex flex-column align-items-lg-start" style={{ maxWidth: "520px" }}>
          <div
            className="sec-bg mb-3"
            style={{
              width: "520px",
              height: "411px",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <img
              src={getImageUrl(`storage/${product.image}`)}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div className="d-flex gap-3 justify-content-center">
            {[1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className="sec-bg"
                style={{ width: "122px", borderRadius: "8px", height: "122px" }}
              >
                <img
                  src={getImageUrl(`storage/${product.image}`)}
                  alt={`thumbnail-${idx}`}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className="d-flex flex-column text-center text-md-end gap-3 align-items-md-start"
          style={{ flex: 1 }}
        >
          <h2>{product.name}</h2>
          <p>{product.description || t("page.noDescription")}</p>

          {/* ألوان ومقاسات */}
          <div className="d-flex align-items-center justify-content-between w-75">
            <div>
  <span style={{ fontSize: "18px" }}>{t("page.color")}</span>
  <div className="circles-grid mt-2 d-flex gap-2">
    {product.colors?.length > 0 ? (
      product.colors.map((c) => (
        <div
          key={c.id}
          onClick={() => setSelectedColor(c)}
          className="circle"
          style={{
            backgroundColor: c.color_code,
            border: selectedColor?.id === c.id ? "2px solid black" : "1px solid #ccc",
            width: 32,
            height: 32,
            borderRadius: "50%",
            cursor: "pointer",
          }}
          title={c.color}
        />
      ))
    ) : (
      <span className="text-muted">{t("page.noColors")}</span>
    )}
  </div>
            </div>

            <div>
              <h4 className="mt-3" style={{ fontSize: "18px" }}>
                {t("page.size")}
              </h4>
              <div className="d-flex gap-2">
              {product.sizes?.length > 0 ? (
  product.sizes.map((s) => (
    <span
      key={s.id}
      onClick={() => setSelectedSize(s)}
      className="d-inline-flex align-items-center justify-content-center rounded-circle border"
      style={{
        width: 32,
        height: 32,
        fontSize: 12,
        cursor: "pointer",
        backgroundColor: selectedSize?.id === s.id ? "#000" : "transparent",
        color: selectedSize?.id === s.id ? "#fff" : "#000",
      }}
    >
      {s.size}
    </span>
  ))
) : (
  <span className="text-muted">{t("page.noSizes")}</span>
)}


              </div>
            </div>
          </div>

          {/* التقييم */}
          <div className="my-3">
            <span>
              {t("page.rating")} ({averageRating.toFixed(1)})
            </span>
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`bi me-1 ${
                  index < Math.round(averageRating)
                    ? "bi-star-fill text-warning"
                    : "bi-star text-secondary"
                }`}
              />
            ))}
          </div>

          {/* زر الإضافة والسعر */}
          <div className="d-flex align-items-center gap-3">
            <Button
              title={t("page.addToCart")}
              className="main-bg text-white px-4 py-2 rounded border-0"
              icon={<i className="bi bi-cart-fill" />}
              onClick={handleAddToCart}
            />
            <span className="px-4 py-2 rounded border-0">
              {product.price} {product.currency || "ج.م"}
            </span>
          </div>
        </div>
      </div>

      {/* التابات */}
      <div className="lower-part my-5">
        <div className="d-flex justify-content-center gap-4 mb-3">
          <span
            onClick={() => setActiveTab("products")}
            style={{
              cursor: "pointer",
              borderBottom:
                activeTab === "products" ? "2px solid #000" : "none",
              fontWeight: activeTab === "products" ? "bold" : "normal",
            }}
          >
            {t("page.similarProducts")}
          </span>
          <span
            onClick={() => setActiveTab("comments")}
            style={{
              cursor: "pointer",
              borderBottom:
                activeTab === "comments" ? "2px solid #000" : "none",
              fontWeight: activeTab === "comments" ? "bold" : "normal",
            }}
          >
            {t("page.comments")}
          </span>
        </div>

        <div className="tab-content mt-4">
          {activeTab === "products" && <ProductList products={similarProducts} />}
          {activeTab === "comments" && <Comments productId={product.id} />}
        </div>
      </div>
    </div>
  );
}
