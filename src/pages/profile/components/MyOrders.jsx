import { useEffect, useState } from "react";
import { useProducts } from "../../../hooks/useProducts";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { data: allProducts = [] } = useProducts(); // جلب كل المنتجات

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://maxim-test.courseszone-eg.com/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const getImageUrl = (productId) => {
    // نبحث عن المنتج في allProducts عشان نجيب صورته
    const product = allProducts.find((p) => p.id === productId);
    if (!product?.image) return "/assets/no-image.png";
    return `https://maxim-test.courseszone-eg.com/storage/${product.image.replace(/^\/?/, "")}`;
  };

  // تجميع كل المنتجات من كل الطلبات مع تحديث بيانات المنتج من الـ API
  const allItems = orders.flatMap((order) =>
    (order.items || []).map((item) => {
      const productDetails = allProducts.find((p) => p.id === item.product_id);
      return {
        ...item,
        product: productDetails || item.product, // استخدم بيانات المنتج من API لو موجودة
      };
    })
  );

  const firstOrder = orders[0];

  return (
    <div className="container my-5 d-flex flex-column flex-lg-row gap-4">
      {/* كروت المنتجات */}
      <div className="col-lg-7">
        {allItems.length === 0 ? (
          <p className="text-center text-secondary">لا توجد طلبات حتى الآن.</p>
        ) : (
          allItems.map((item) => (
            <div
              key={item.id}
              className="card mb-4 shadow-sm border-0 p-3 position-relative d-flex flex-row"
            >
              <div
                style={{
                  width: "3px",
                  backgroundColor: "#eee",
                  marginInlineEnd: "15px",
                  borderRadius: "4px",
                }}
              ></div>

              <div className="d-flex flex-row align-items-start gap-4 flex-grow-1">
                <img
                  src={getImageUrl(item.product_id)} // استخدم صورة المنتج من الـ API
                  alt={item.product?.name_ar || "product"}
                  style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "contain",
                    backgroundColor: "#f9f9f9",
                  }}
                  className="rounded"
                  onError={(e) => (e.target.src = "/assets/no-image.png")}
                />

                <div className="flex-grow-1 p-2">
                  <h5 className="fw-bold">{item.product?.name_ar}</h5>
                  <p className="text-secondary fw-semibold mt-2">
                    السعر: {item.price} ج.م
                  </p>

                  <div
                    className="d-flex flex-wrap align-items-center gap-3 mt-2 text-secondary"
                    style={{ fontWeight: "500" }}
                  >
                    {item.color && (
                      <span>
                        اللون:{" "}
                        <span
                          style={{
                            display: "inline-block",
                            width: "16px",
                            height: "16px",
                            backgroundColor: item.color,
                            borderRadius: "50%",
                            border: "1px solid #ccc",
                            marginInlineStart: "6px",
                            verticalAlign: "middle",
                          }}
                        ></span>
                      </span>
                    )}
                    {item.size && <span>المقاس: {item.size}</span>}
                    <span>الكمية: {item.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* الفاصل العمودي */}
      <div className="mx-4" style={{ width: "1px", backgroundColor: "#ddd" }}></div>

      {/* بيانات المستخدم */}
      <div className="col-lg-4">
        <div className="bg-white p-4 rounded shadow-sm mb-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <img src="/assets/visa.png" alt="visa" style={{ width: "28px", height: "28px" }} />
            <span className="fw-semibold text-secondary">*** **** **** 2354</span>
          </div>

          <div className="d-flex align-items-start gap-3 mb-3">
            <img src="/assets/location.png" alt="location" style={{ width: "24px", height: "24px", marginTop: "3px" }} />
            <h6 className="mb-0 text-dark" style={{ lineHeight: "1.5" }}>
              {firstOrder?.address || "لم يتم تحديد عنوان بعد"}
            </h6>
          </div>

          <div className="d-flex align-items-center gap-3">
            <img src="/assets/phone.png" alt="phone" style={{ width: "22px", height: "22px" }} />
            <span className="fw-semibold text-secondary">
              {firstOrder?.phone || "لم يتم تسجيل رقم الهاتف"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}  