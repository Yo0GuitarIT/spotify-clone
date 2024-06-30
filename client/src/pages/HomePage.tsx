import { useAuth } from "../hooks/useAuth";
function HomePage() {
  const { logout } = useAuth();

  return (
    <>
      <h1>Welcome to Spotify</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default HomePage;
