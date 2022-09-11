import "./Configs/axios";
import AuthProvider from "./Contexts/AuthContext";
import MainRoutes from "./Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MainRoutes />
      </AuthProvider>
      <Toaster />
    </div>
  );
}

export default App;
