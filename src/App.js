import { Button } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './pages/app.css';


import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Aboutus from "./pages/aboutus/Aboutus";
import Blog from "./pages/blog/Blog";
import BLogpage from "./pages/blog/components/BLogpage";
import Header from "./component/Header";
import Policies from "./pages/policies/Policies";
import Reset from "./pages/login/components/Reset";
import Codesubmit from "./pages/login/components/Codesubmit";
import Newpss from "./pages/login/components/Newpass";
import Done from "./pages/login/components/Done";
import Products from "./pages/products/products";
import Contactus from "./pages/contactus/Contactus";
import Privacy from "./pages/privacy/privacy";
import ProductPage from "./pages/productPage/ProductPage";
import Cart from "./pages/cart/cart";
import { CartProvider } from "./context/context";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/profile/components/ChangePassword";
import SavedChanges from "./pages/profile/components/SavedChanges";
import PassReset from "./pages/profile/components/PassReset";
import { AuthProvider } from "./context/AuthContexts";
import MainLayout from "./layouts/MainLayout";
import ShippingDetails from "./pages/cart/components/ShippingDetails";
import ProductsLayout from "./layouts/buyingLayout";
import PayMethod from "./pages/cart/components/PayMethod";
import Rating from "./pages/cart/components/Rating";
import { useEffect } from "react";
import MyOrders from "./pages/profile/components/MyOrders";
import FailPayment from "./pages/cart/components/FailPayment";
import { useLanguage,  LanguageProvider } from "./context/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PaymentSuccess from "./pages/cart/components/PaymentSuccess";
import RatingSucces from "./pages/cart/components/RatingSucces";


const queryClient = new QueryClient();
function BodyClassHandler() {
  const location = useLocation();
  

  useEffect(() => {
    // الصفحات اللي مش عايزة فيها خلفية
    const noBgPages = ["/failpayment", "/myorders","/profile", "/logintoship", "/paymethod", "/shippingdetails", "/rating", "/done-resetting", "/saved-changes","/change-password", "/done", "/policies","/privacy","/login", "/signup", "/reset", "/code", "/newpassword","/cart"];

    if (noBgPages.includes(location.pathname)) {
      document.body.classList.add("layout-bg");
    } else {
      document.body.classList.remove("layout-bg");
    }
  }, [location.pathname]);

  return null;
}

function AppDirectionHandler() {
  const { language } = useLanguage(); // جلب اللغة من الـ context

  useEffect(() => {
    // تغيير اتجاه المستند حسب اللغة
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    // لو حابة تغيّري الخط حسب اللغة
    document.documentElement.lang = language;
  }, [language]);

  return null;
}



function App() {
  return (
    <div className="App">
       <QueryClientProvider client={queryClient}>
         <LanguageProvider>
      <CartProvider>
        <AuthProvider>   {/* 👈 لفي الأبلكيشن بالـ AuthProvider */}
          <BrowserRouter>
           <BodyClassHandler />
            <AppDirectionHandler />
            <Routes>
                <Route path="/" element={<Home />} />
               <Route element={<MainLayout />}>
            
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/products" element={<Products />} />
              <Route path="/singleproduct/:id" element={<ProductPage />} />
              <Route path="/contact" element={<Contactus />} />
              <Route path="/blogpage/:id" element={<BLogpage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/code" element={<Codesubmit />} />
              <Route path="/newpassword" element={<Newpss />} />
              <Route path="/done" element={<Done />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/saved-changes" element={<SavedChanges />} />
              <Route path="/done-resetting" element={<PassReset />} />
              <Route path="/rating" element={<Rating />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/failpayment" element={<FailPayment />} />
              <Route path="/rating-success" element={<RatingSucces />} />

              <Route element={<ProductsLayout />}>
            
              <Route path="/shippingdetails" element={<ShippingDetails />} />
               <Route path="/logintoship" element={<Login />} />
               <Route path="/paymethod" element={<PayMethod />} />
              </Route>
              </Route>
            </Routes>

            <ToastContainer position="top-right" autoClose={1000} />
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
      </LanguageProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
