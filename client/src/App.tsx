import { useState, useEffect } from "react";
import Login from "../component/Login";

const fetchResult = async () => {
  const response = await fetch("/api/user");

  if (!response.ok) {
    throw new Error("Network response was not ok " + response.statusText);
  }
  return response.json();
};

function App() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let ignoreResult: bool = false;

    const startFetching = async () => {
      try {
        const data = await fetchResult();
        if (!ignoreResult) {
          console.log(data);
          setUserData(data);
        }
      } catch (error) {
        console.error("Fetching data failed", error);
      }
    };
    startFetching();

    return () => {
      ignoreResult = true;
    };
  }, []);

  return (
    <div>
      <h1>Vite + React</h1>
      {userData ? (
        <>
          <p>name: {userData.user?.name}</p>
          <p>email: {userData.user?.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Login/>
    </div>
  );
}

export default App;
