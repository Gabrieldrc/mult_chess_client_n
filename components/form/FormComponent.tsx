import styles from './FormComponent.module.sass'
import {NextComponentType} from 'next'
const FormComponent: NextComponentType = ({children }) => {
  return (
    <form className={styles.form + " round-border"}>
      {children}
    </form>
  )
}
export default FormComponent