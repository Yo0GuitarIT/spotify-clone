import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import PlayerProvider from "./contexts/PlayerContext";
import AppRoutes from "./component/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;
