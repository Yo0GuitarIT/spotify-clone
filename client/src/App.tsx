import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Providers/AuthProvider";
import PlayerProvider from "./Providers/PlayerProvider";
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
