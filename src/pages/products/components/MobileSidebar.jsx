// src/components/MobileSidebar.jsx
import React from "react";
import FiltersSidebar from "./FiltersSidebar";

export default function MobileSidebar(props) {
  return (
    <div className="d-lg-none">
      {/* زرار الفتح */}
      <button 
        className="btn btn-outline-secondary d-lg-none mb-3 p-0 border-0 shadow-none" 
        type="button"
        data-bs-toggle="offcanvas" 
        data-bs-target="#filtersOffcanvas" 
        aria-controls="filtersOffcanvas"
      >
        <i className="bi bi-list fs-1"></i>
      </button>

      {/* الـ Offcanvas */}
      <div 
        className="offcanvas offcanvas-end pe-3" 
        tabIndex="-1"   
        id="filtersOffcanvas"  
        aria-labelledby="mobileMenuLabel" 
        dir="rtl"
      >
        <div className="offcanvas-header">
          <button 
            type="button" 
            className="btn-close ms-auto" 
            data-bs-dismiss="offcanvas" 
            aria-label="إغلاق"
          ></button>
        </div> 
        <div className="offcanvas-body d-flex flex-column gap-3"> 
          <div className="products-right">
            <FiltersSidebar {...props} />
          </div>
        </div>
      </div>
    </div>
  );
}
