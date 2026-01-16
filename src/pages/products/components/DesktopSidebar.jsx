// src/components/DesktopSidebar.jsx
import React from "react";
import FiltersSidebar from "./FiltersSidebar";

export default function DesktopSidebar(props) {
  return (
    <div 
      className="products-right d-none d-lg-flex flex-lg-column"  
      style={{ width: '25%' }}  // 👈 نفس العرض اللي كان عندك
    >
      <FiltersSidebar {...props} />
    </div>
  );
}
