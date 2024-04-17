import React from "react";
import LayoutDefault from "../../../Components/Common/LayoutDefault/LayoutDefault";
import Footer from "../../../Components/Common/Footer/Footer";
const DefaultLayout = ({ children }) => {
  return (
    <>
      <LayoutDefault />
      <div>{children}</div>
      <Footer />
    </>
  );
};
export default DefaultLayout;
