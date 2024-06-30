// import LoginSpotify from "../component/LoginWithSpotify";
import { useAuth } from "../hooks/useAuth";
function HomePage() {
  // return <LoginSpotify />;

  const { logout } = useAuth();

  return (
    <>
      <h1>Welcome to Spotify</h1>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default HomePage;
