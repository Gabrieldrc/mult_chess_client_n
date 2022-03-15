import style from "./DashboardLink.module.sass";
import Link from "next/link";
import { ReactNode } from "react";

type DashBoardProps = {
  children: ReactNode;
  path: string;
};
function DashboardLink({ path, children }: DashBoardProps) {
  return (
    <Link href={path}>
      <a className={style.link + " round-border"}>{children}</a>
    </Link>
  );
}

export default DashboardLink;
