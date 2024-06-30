import { useAuth } from "../hooks/useAuth";
function HomePage() {
  const { logoutUser } = useAuth();

  return (
    <>
      <h1>Welcome to Spotify</h1>
      <button onClick={logoutUser}>Logout</button>
    </>
  );
}

export default HomePage;
