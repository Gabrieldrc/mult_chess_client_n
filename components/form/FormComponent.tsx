import styles from './FormComponent.module.sass'
import {NextComponentType} from 'next'
const FormComponent: NextComponentType = ({children }) => {
  return (
    <div className={styles.form + " round-border"}>
      {children}
    </div>
  )
}
export default FormComponent