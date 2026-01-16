import Footer from "../component/Footer";
import Header from "../component/Header";
import Nav from "../component/Nav";
import { Outlet } from "react-router-dom";


export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <Nav />
      <div style={{ minHeight: "80vh" }}>     <Outlet /> {children}</div>
      <Footer />
    </>
  );
}
