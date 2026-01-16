import React, { useState } from "react";
import ProductsList from "../../component/ProductsList";
import MobileSidebar from "./components/MobileSidebar";
import DesktopSidebar from "./components/DesktopSidebar";
import { useProducts } from "../../hooks/useProducts";

export default function Products() {
  const [range, setRange] = useState([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ✅ جلب المنتجات باستخدام الهُوك
  const { data: products = [], isLoading, isError } = useProducts();

  if (isLoading) return <p>جارٍ تحميل المنتجات...</p>;
  if (isError) return <p>حدث خطأ في تحميل البيانات</p>;

  // فلترة المنتجات
  const filteredProducts = products.filter((product) => {
    const inCategory = selectedCategory ? product?.description === selectedCategory : true;
    const inPriceRange = product.price >= range[0] && product.price <= range[1];
    return inCategory && inPriceRange;
  });

  // حساب عدد المنتجات لكل كاتيجوري (آمن حتى لو products فاضي)
  const categoryCounts = (products || []).reduce((acc, product) => {
    const categoryName = product?.description || "غير مصنف";
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {});

  // جلب قائمة الكاتيجوريز من المنتجات نفسها
  const categories = [...new Set(products.map((p) => p?.description || "غير مصنف"))];

  return (
    <div className="my-5 container d-flex justify-content-between align-items-start gap-5">
      {/* موبايل */}
      <MobileSidebar
        products={products}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        range={range}
        setRange={setRange}
        categoryCounts={categoryCounts}
        categories={categories}
      />

      <DesktopSidebar
        products={products}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        range={range}
        setRange={setRange}
        categoryCounts={categoryCounts}
        categories={categories}
      />

      {/* المنتجات */}
      <div className="products-left" style={{ width: "75%" }}>
        <ProductsList products={filteredProducts} />
      </div>
    </div>
  );
}
