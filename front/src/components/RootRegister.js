import { Outlet } from "react-router-dom";
import HeaderRegister from "./HeaderRegister";
import Footer from "./Footer";

const RootRegister = () => {
  return (
    <>
      <HeaderRegister />
      <main class="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootRegister;
