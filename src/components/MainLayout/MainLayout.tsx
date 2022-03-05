import { NextComponentType } from "next";

const MainLayout: NextComponentType = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
