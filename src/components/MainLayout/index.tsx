import { useAppSelector } from "@appRedux/hooks";
import UserFormComponent from "@components/UserFormComponent";
import { NextComponentType } from "next";

const MainLayout: NextComponentType = ({ children }) => {
  const user = useAppSelector((state) => state.user.username);

  return (
    <>
      <main>
        {user.length == 0 && <UserFormComponent />}
        {user.length > 0 && children}
      </main>
    </>
  );
};

export default MainLayout;
