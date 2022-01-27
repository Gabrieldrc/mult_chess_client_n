import style from './DashboardLink.module.sass'
import {Component}  from 'react'
import Link from 'next/link'
import {NextComponentType} from 'next'

const DashboardLink: NextComponentType = (props) => {
  return (
    <Link href={props.path}>
      <a className={style.link + " round-border"}>{props.children}</a>
    </Link>
  )
}

export default DashboardLink