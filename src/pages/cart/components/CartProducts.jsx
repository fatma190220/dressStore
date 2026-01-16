import { useContext } from "react";
import { CartContext } from "../../../context/context";
import { useTranslation } from "react-i18next";

export default function CartProducts() {
  const { t } = useTranslation("cart");
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  return (
    <div className="col-lg-7">
      {cart.map((item) => {
        // 👇 مفتاح فريد بناءً على المنتج والمقاس واللون
        const uniqueKey = `${item.id}-${
          item.selectedSize?.id ?? item.selectedSize ?? "nosize"
        }-${item.selectedColor?.id ?? item.selectedColor ?? "nocolor"}`;

        return (
          <div className="mb-4 flex-grow-1" key={uniqueKey}>
            <div className="card d-flex flex-row align-items-start gap-4">
              <img
                src={`https://maxim-test.courseszone-eg.com/storage/${item.image}`}
                alt={item.name}
                style={{
                  width: "180px",
                  height: "190px",
                  objectFit: "contain",
                }}
                className="sec-bg rounded"
              />
              <div className="flex-grow-1 p-3">
                <h5>{item.name}</h5>
                <p className="my-3 text-secondary">
                  {t("price")}: {item.price * item.quantity} {item.currency}
                  <small className="d-block text-muted">
                    ({t("unit")}: {item.price})
                  </small>
                </p>

                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  {/* ✅ اللون المختار */}
                  <div>
                    <span>{t("color")}</span>
                    <div className="d-flex gap-2 mt-2">
                      {item.selectedColor ? (
                        <div
                          className="circle"
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: item.selectedColor.color_code,
                            border: "1px solid #aaa",
                          }}
                          title={item.selectedColor.color}
                        ></div>
                      ) : (
                        <span className="text-muted">{t("noColors")}</span>
                      )}
                    </div>
                  </div>

                  {/* ✅ المقاس المختار */}
                  <div>
                    <h6>{t("size")}</h6>
                    <div className="d-flex gap-2">
                      {item.selectedSize ? (
                        <span
                          className="d-inline-flex align-items-center justify-content-center rounded-circle border border-secondary"
                          style={{ width: "27px", height: "27px" }}
                        >
                          {item.selectedSize.size ?? item.selectedSize}
                        </span>
                      ) : (
                        <span className="text-muted">{t("noSizes")}</span>
                      )}
                    </div>
                  </div>

                  {/* ✅ الكمية */}
                  <div>
                    <span>{t("quantity")}</span>
                    <div className="d-flex align-items-center">
                      <i
                        className="bi bi-plus-circle-fill cursor-pointer fs-5"
                        onClick={() => increaseQuantity(item)}
                      ></i>
                      <span className="mx-2">{item.quantity}</span>
                      <i
                        className="bi bi-dash-circle-fill cursor-pointer text-secondary fs-5"
                        onClick={() => decreaseQuantity(item)}
                      ></i>
                    </div>
                  </div>

                  {/* ✅ حذف المنتج */}
                  <div>
                    <i
                      className="bi bi-trash text-danger fs-4"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeFromCart(item)}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
