import { NextPage } from "next";

const UserMiddleware: NextPage = (props) => {
  // const router = useRouter();
  // const dispatch = useAppDispatch();
  // const username: string = useAppSelector((state) => state.user.username);
  // if (username.length == 0) {
  //   router.push("/username");
  // }
  console.log("primero (?)");

  return <>{props.children}</>;
};

export default UserMiddleware;
