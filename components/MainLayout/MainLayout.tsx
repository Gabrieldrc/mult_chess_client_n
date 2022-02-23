import {NextPage} from "next";

const MainLayout: NextPage = ({ children}) => {
  return (
    <>
      <main>
        {children}
      </main>
    </>
  );
}

export default MainLayout