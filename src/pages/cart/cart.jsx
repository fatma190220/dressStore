import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import Nav from '../../component/Nav';
import Footer from '../../component/Footer';
import Button from '../../component/Button';
import { useNavigate } from 'react-router-dom';


import { useContext } from 'react';
import { CartContext } from '../../context/context';
import Buying from './components/Buying';
import Stepper from './components/Stepper';
import CartProducts from './components/CartProducts';
import { useTranslation } from 'react-i18next';


export default function Cart() {
  const navigate = useNavigate();
const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const { t } = useTranslation("cart"); 


 
  
 
  return (
    <div>
    
   <Stepper />
     <div className='container my-5'>
  {cart.length === 0 ? (
    <div className='d-flex flex-column align-items-center gap-4'>
      <h3> {t("emptyCartTitle")}</h3>
      <p>{t("emptyCartMessage")}</p>
      <Button
        title={t("shopNow")}
        className="main-bg text-white px-4 py-2 rounded border-0"
        icon={<i className="bi bi-cart-fill"></i>}
        onClick={() => navigate('/products')}
      />
    </div>
  ) : (
   <div className=' d-flex flex-column flex-lg-row gap-4'>
     
     <CartProducts />

      
      <div className='col-lg-5 left-card'>
       
        <div className="card p-3">
          <Buying />
        </div>
      </div>
      </div>
  )}
</div>


   
    </div>
  );
}

