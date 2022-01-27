import type {NextPage} from 'next'
import DashboardLink from '../components/dashboardLink/DashboardLink'

const Home: NextPage = () => {
  return (
    <>
      <h1>Chess Multiplayer Game</h1>
      <DashboardLink path={"/chess"}>Chess</DashboardLink>
    </>
  )
}

export default Home
