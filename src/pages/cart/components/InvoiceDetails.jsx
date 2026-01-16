import React, { useState } from "react";
import Button from "../../../component/Button";
import { useTranslation } from "react-i18next";

export default function InvoiceDetails({ totalProductsPrice, total, onCheckout }) {
  const { t } = useTranslation("order");

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");

  // دالة تطبيق الكوبون باستخدام fetch
  const applyCoupon = async () => {
  try {
    const response = await fetch("https://maxim-test.courseszone-eg.com/api/coupons/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        code: couponCode // الكود اللي المستخدم بيدخله
      }),
    });

    const resData = await response.json();
    console.log("API Response:", resData);

    if (response.ok && resData.status === "success") {
      const coupon = resData.data;

      let discountValue = 0;
      if (coupon.type === "fixed") {
        discountValue = coupon.value;
      } else if (coupon.type === "percent") {
        discountValue = (totalProductsPrice * coupon.value) / 100;
      }

      setDiscount(discountValue);
      setMessage(t("invoiceDetails.couponApplied"));
    } else {
      setDiscount(0);
      setMessage(resData.message || t("invoiceDetails.invalidCoupon"));
    }
  } catch (error) {
    console.error("⚠️ Error:", error);
    setDiscount(0);
    setMessage(t("invoiceDetails.invalidCoupon"));
  }
};


  // احسب الإجمالي النهائي بعد الخصم
  const finalTotal = totalProductsPrice - discount;

  return (
    <div className="invoice-box p-3 rounded mb-4">
      <h4 className="text-center mb-3">{t("invoiceDetails.title")}</h4>

      <div className="input-icon-wrapper shadow d-flex flex-wrap align-items-center gap-2">
        <input
          className="form-control"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder={t("invoiceDetails.discountCoupon")}
        />
        <button
          onClick={applyCoupon}
          className="main-bg text-white p-2 rounded border-0"
        >
          {t("invoiceDetails.apply")}
        </button>
      </div>

      {message && <p className="mt-2 text-center">{message}</p>}

      <div>
        <div className="d-flex justify-content-between align-items-center my-3">
          <h6>{t("invoiceDetails.productsPrice")}</h6>
          <span>{totalProductsPrice.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center my-3">
          <h6>{t("invoiceDetails.shipping")}</h6>
          <span>00</span>
        </div>

        <div className="d-flex justify-content-between align-items-center my-3">
          <h6>{t("invoiceDetails.vat")}</h6>
          <span>00</span>
        </div>

        <div className="d-flex justify-content-between align-items-center my-3">
          <h6>{t("invoiceDetails.discount")}</h6>
          <span>{discount.toFixed(2)}</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center my-3">
          <h6>{t("invoiceDetails.total")}</h6>
          <span>{finalTotal.toFixed(2)}</span>
        </div>

        <Button
          title={t("invoiceDetails.checkout")}
          style={{ width: "100%" }}
          onClick={onCheckout}
        />
      </div>
    </div>
  );
}
