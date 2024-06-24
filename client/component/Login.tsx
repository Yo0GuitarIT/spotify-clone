import { useState } from "react";

function Login() {
  const [loginResult, setLoginResult] = useState("");
  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      console.log(data);
      setLoginResult(data.state.login);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  return (
    <>
      <button onClick={handleLogin}>Login</button>
      <p>result :{loginResult}</p>
    </>
  );
}

export default Login;
