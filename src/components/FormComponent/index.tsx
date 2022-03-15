import styles from "./FormComponent.module.sass";
import { ReactNode } from "react";

type FormComponent = {
  children: ReactNode;
  submitHandler: undefined | ((e) => void);
};
const FormComponent = ({ children, submitHandler }: FormComponent) => {
  return (
    <form className={styles.form + " round-border"} onSubmit={submitHandler}>
      {children}
    </form>
  );
};
export default FormComponent;
