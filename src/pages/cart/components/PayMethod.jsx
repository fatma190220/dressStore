import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "../../../component/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CartContext } from "../../../context/context";
import { toast } from "react-toastify";


export default function PayMethod() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation("order");
  const { cart } = useContext(CartContext);

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCompletePayment = async () => {
    if (!paymentMethod) {
      alert(t("payMethod.chooseMethodAlert"));
      return;
    }

    // 1️⃣ هات بيانات الشحن من localStorage
    const shippingData = JSON.parse(localStorage.getItem("shippingData"));
    if (!shippingData) {
      alert("مفيش بيانات شحن محفوظة!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user?.id || 1; 

     const orderData = {
    user_id: userId,
    name: shippingData.name,
    phone: shippingData.phone,
    address: shippingData.address,
    city: shippingData.city,
    house_number: shippingData.houseNumber,
    status: "pending",
    items: cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    color_id: item.selectedColor?.id ?? null, 
  size_id: item.selectedSize?.id ?? null,
    })),
  };
  console.log("🚀 Order Data:", orderData);
  const token = localStorage.getItem("token"); 

  console.log("🚀 Payload:", orderData);

    try {



      const response = await fetch("https://maxim-test.courseszone-eg.com/api/orders", {
        method: "POST",
         headers: {
    "Authorization": `Bearer ${token}`,   
    "Accept": "application/json",         
    "Content-Type": "application/json",   
  },
        body: JSON.stringify(orderData),
      });

      console.log("📡 Status:", response.status);
  const text = await response.text();
  console.log("📡 Raw Response:", text);

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    data = text;
  }


     if (response.ok) {
  console.log("✅ الأوردر اتبعت:", data);
  toast.success("تم إنشاء الأوردر بنجاح ✅"); 
 navigate(`/payment-success`); 

} else {
  console.error("❌ Server Error:", data);
  toast.error("حصل خطأ أثناء إنشاء الأوردر ❌"); 
}

    } catch (err) {
  console.error("⚠️ Error:", err);
  toast.error("فشل الاتصال بالسيرفر ⚠️");
}

  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h5
        className="mb-4 text-center fw-bold"
        style={{ color: "#646464", fontSize: "16px" }}
      >
        {t("payMethod.title")}
      </h5>

      <Form>
        <Form.Group className="mb-3 border p-3 rounded">
          <label className="custom-radio">
            <img
              src="/assets/visa.png"
              alt="Visa"
              style={{ height: "20px", marginLeft: "10px" }}
            />{" "}
            {t("payMethod.visa")}
            <input
              type="radio"
              name="payment"
              value="visa"
              checked={paymentMethod === "visa"}
              onChange={handleChange}
            />
            <span className="checkmark">
              <i className="bi bi-check-circle-fill"></i>
            </span>
          </label>
        </Form.Group>

        <Form.Group className="mb-3 border p-3 rounded">
          <label className="custom-radio">
            <img
              src="assets/cash.png"
              alt="cash"
              style={{ height: "20px", marginLeft: "10px" }}
            />{" "}
            {t("payMethod.cash")}
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={handleChange}
            />
            <span className="checkmark">
              <i className="bi bi-check-circle-fill"></i>
            </span>
          </label>
        </Form.Group>

        <div className="d-flex flex-column gap-2">
<Button 
  title={t("payMethod.completePayment")} 
  onClick={(e) => {
    e.preventDefault(); // 🛑 منع الـ reload
    handleCompletePayment();
  }} 
/>
          <button
            className="w-100 bg-white rounded border"
            style={{ borderColor: "#ccc", height: "50px" }}
            onClick={() => navigate("/cart")}
          >
            {t("payMethod.backToCart")}
          </button>
        </div>
      </Form>
    </div>
  );
}
