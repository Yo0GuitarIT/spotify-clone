import { useAuth } from "../contexts/AuthContext";

function Login() {
  const { initateLogin } = useAuth();
  return (
    <>
      <h1>Please Login~~</h1>
      <button onClick={initateLogin}>Login</button>
    </>
  );
}

export default Login;
