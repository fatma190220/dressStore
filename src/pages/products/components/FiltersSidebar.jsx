import React from "react";
import ReactSlider from "react-slider";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../../hooks/useCategories"; // استدعاء الهوك

export default function FiltersSidebar({ 
  products, 
  selectedCategory, 
  setSelectedCategory, 
  range, 
  setRange, 
  categoryCounts
}) {
  const { t } = useTranslation("products");
  const { data: categories = [], isLoading } = useCategories(); // جلب الفئات

  if (isLoading) return <p>Loading categories...</p>;

  return (
    <div className="d-flex flex-column gap-3">
      {/* كل الفئات */}
      <div className="d-flex gap-2 mb-4">
        <h4
          className="fw-bold"
          onClick={() => setSelectedCategory(null)}
          style={{
            cursor: "pointer",
            color: selectedCategory === null ? "#000" : "#555"
          }}
        >
          {t("sidebar.allCategories")} 
        </h4>
        <span>({products.length})</span>
      </div>

      {/* الفئات */}
      <div>
        <h5>{t("sidebar.categories")}</h5>
        <ul className="list-unstyled m-0 p-0">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedCategory === category.id ? "bold" : "normal",
                  color: selectedCategory === category.id ? "#000" : "#555",
                  padding: "4px 0"
                }}
              >
                {category.name} <span>({categoryCounts[category.name] || 0})</span>
              </li>
            ))
          ) : (
            <li>{t("sidebar.noCategories")}</li>
          )}
        </ul>
        <hr />
      </div>

      {/* السعر */}
      <div>
        <h5>{t("sidebar.price")}</h5>
        <div style={{ width: "300px", margin: "0 auto" }}>
          <div className="d-flex gap-2">
            <input
              type="number"
              className="p-1 w-50"
              value={range[0]}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                if (newMin <= range[1]) setRange([newMin, range[1]]);
              }}
            />
            <input
              type="number"
              className="p-1 w-50"
              value={range[1]}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                if (newMax >= range[0]) setRange([range[0], newMax]);
              }}
            />
          </div>

          <div style={{ margin: "2rem 0", direction: "rtl" }}>
            <ReactSlider
              className="custom-slider"
              renderTrack={(props, state) => (
                <div {...props} className={`custom-track track-${state.index}`} />
              )}
              thumbClassName="custom-thumb"
              min={0}
              max={2000}
              value={range}
              onChange={setRange}
              pearling
              minDistance={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
