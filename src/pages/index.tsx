import DashboardLink from "@components/DashboardLink/DashboardLink";

function Home() {
  return (
    <>
      <h1>Chess Multiplayer Game</h1>
      <DashboardLink path={"/chess"}>Chess</DashboardLink>
    </>
  );
}

export default Home;
