import { useAppSelector } from "@appRedux/hooks";
import { NextComponentType } from "next";

const MainLayout: NextComponentType = ({ children }) => {
  const user = useAppSelector((state) => state.user.username);

  return (
    <>
      <main>
        {user && (<UserNameForm></UserNameForm>)}
        {children}
      </main>
    </>
  );
};

export default MainLayout;
