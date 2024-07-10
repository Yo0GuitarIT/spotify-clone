import { useAuth } from "../hooks/useAuth"; 

function Login() {
  const { initiateLogin } = useAuth();
  return (
    <>
      <h1>Please Login~~</h1>
      <button onClick={initiateLogin}>Login</button>
    </>
  );
}

export default Login;
