import "./Configs/axios";
import AuthProvider from "./Contexts/AuthContext";
import MainRoutes from "./Routes";
import { Toaster } from "react-hot-toast";
import { Container } from "react-bootstrap";
import "./Styles/global.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Container>
          <MainRoutes />
        </Container>
      </AuthProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
