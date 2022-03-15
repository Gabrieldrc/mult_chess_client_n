import { setUserName } from "@appRedux/features/userSlice";
import { useAppDispatch } from "@appRedux/hooks";
import FormComponent from "@components/FormComponent";
import { useRef } from "react";

const UserFormComponent = () => {
  const dispatch = useAppDispatch();
  const username = useRef<HTMLInputElement>();

  const submitHandler = (e: Event) => {
    e.preventDefault();
    dispatch(setUserName(`${username?.current?.value}`));
  };

  return (
    <FormComponent submitHandler={submitHandler}>
      <label htmlFor="username_input">Username</label>
      <input
        type="text"
        name="username"
        id="username_input"
        required={true}
        placeholder={"username"}
        ref={username}
      />
      <button type="submit">Submit</button>
    </FormComponent>
  );
};

export default UserFormComponent;
