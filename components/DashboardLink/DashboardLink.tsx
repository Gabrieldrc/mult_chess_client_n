import style from './DashboardLink.module.sass'
import Link from 'next/link'
import {NextComponentType} from 'next'

const DashboardLink: NextComponentType = ({path, children}) => {
  return (
    <Link href={path}>
      <a className={style.link + " round-border"}>{children}</a>
    </Link>
  )
}

export default DashboardLink