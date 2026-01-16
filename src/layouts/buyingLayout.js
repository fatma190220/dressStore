import { Outlet } from "react-router-dom";
import CartProducts from "../pages/cart/components/CartProducts";
import Stepper from "../pages/cart/components/Stepper";

export default function ProductsLayout() {
  return (
    <div className="  my-5">
     
      <Stepper />

      <div className='container d-flex flex-column flex-lg-row gap-4 mt-5'>
        {/* العمود الأول: منتجات الكارت */}
        
            <CartProducts />
        


        {/* العمود الثاني */}
        <div className="col-lg-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
