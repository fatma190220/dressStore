import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../pages/home/components/card';

export default function ProductList({ products = [] }) {
  const navigate = useNavigate();

  return (
    <div
      className="my-5"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1.5rem",
        justifyItems: products.length === 1 ? "center" : "stretch", // ✅ لو كارت واحد يتوسّط
      }}
    >
      {products.map((item, index) => (
        <div
          key={item.id || index}
          style={{
            width: "100%",
            maxWidth: "320px",
            margin: "0 auto",
          }}
        >
          <Card
            id={item.id}
            rate={item.rating}
            src={`https://maxim-test.courseszone-eg.com/storage/${item.image}`}
            title={item.name}
            price={`${item.price} ${item.currency}`}
            onClick={() => navigate(`/singleproduct/${item.id}`)}
          />
        </div>
      ))}

      {/* 💅 Media Query لضبط في الشاشات الصغيرة */}
      <style>
        {`
          @media (max-width: 768px) {
            div[style*="display: grid"] {
              justify-content: center;
            }
          }
        `}
      </style>
    </div>
  );
}
