import React, { useContext } from 'react';
import { CartContext } from '../../../context/context';
import { AuthContext } from '../../../context/AuthContexts';
import { useNavigate } from 'react-router-dom';
import InvoiceDetails from './InvoiceDetails';

export default function Buying() {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalProductsPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = totalProductsPrice;

  // 👇 منطق الزرار بالنفيجيشن
  const handleCheckout = () => {
    if (!user) {
      navigate("/logintoship");       // يوديه على صفحة تسجيل الدخول
    } else {
      navigate("/shippingdetails");    // يوديه على صفحة الشحن
    }
  };

  return (
    <div>
      <InvoiceDetails 
        totalProductsPrice={totalProductsPrice} 
        total={total} 
        onCheckout={handleCheckout} 
      />
    </div>
  );
}
