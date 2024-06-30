import { useAuth } from "../hooks/useAuth";
function Login() {
  const { login } = useAuth();
  return (
    <>
      <h1>Please Login~~</h1>
      <button onClick={login}>Login</button>
    </>
  );
}

export default Login;
