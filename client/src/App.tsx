import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";

import Login from "./component/Login";
import LoginWithSpotify from "./component/LoginWithSpotify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
    // <div>
    //   <h1>Jwt Auth Demo</h1>
    //   <Login />
    //   <LoginWithSpotify/>
    // </div>
  );
}

export default App;
