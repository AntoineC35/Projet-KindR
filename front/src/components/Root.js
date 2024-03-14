import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Root = () => {
  return (
    <>
      <Header />
      <main class="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
