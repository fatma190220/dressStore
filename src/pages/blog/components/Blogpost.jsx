// import React from 'react'
// import { useNavigate } from "react-router-dom";

// export default function Blogpost({ src, title, desc }) {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="rounded-2 p-2 sec-bg h-auto blog-post text-decoration-none text-dark"
//       style={{ maxWidth: "412px", flex: "1 1 300px", cursor: "pointer" }}
//       onClick={() => navigate("/blogpage")} // الكارت كله يوديك على البوست
//     >
//       <img
//         src={src}
//         className="w-100 rounded-2 mb-3 object-fit-cover"
//         style={{ height: "200px" }}
//         alt={title}
//       />
//       <h4>{title}</h4>
//       <p className="text-secondary">{desc}</p>

//       {/* رابط المزيد */}
//       <div className="d-flex justify-content-end">
//         <a
//           href="#"
//           className="p-1 text-decoration-none text-dark d-flex align-items-center"
//           onClick={(e) => {
//             e.stopPropagation(); // عشان يمنع الكليك من تفعيل الكارت
//             navigate("/blog");   // يروح لصفحة البلوغ
//           }}
//         >
//           <span className="link-highlight" style={{ fontSize: "18px" }}>المزيد</span>
//           <span className="me-1 link-highlight-icon fw-bold">&gt;&gt;</span>
//         </a>
//       </div>
//     </div>
//   );
// }
