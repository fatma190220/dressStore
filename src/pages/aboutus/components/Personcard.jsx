import React from 'react';

export default function Personcard({ image, name, title }) {
  return (
    <div
      className="shadow rounded-2 p-3 d-flex flex-column justify-content-center align-items-center"
      style={{ maxWidth: "302px", height: "288px" }}
    >
      <img src={image} alt={name} className="w-100 mb-3 rounded " style={{ height: "200px",  objectFit: "cover" }}/>
      <h4>{name}</h4>
      <span className="text-secondary">{title}</span>
    </div>
  );
}
