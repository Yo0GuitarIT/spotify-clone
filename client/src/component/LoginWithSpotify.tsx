import { useAuth } from "../hooks/useAuth";

function LoginSpotify() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated ? (
        <div>
          <p>You are logged in</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please Log in</p>
          <button onClick={login}>Login with Spotify</button>
        </div>
      )}
    </>
  );
}

export default LoginSpotify;
