import { Routes, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProtectedRoutes from "./ProtectedRoutes";
import { Landing, Home } from "../Pages";
import AdminDashbored from "../Pages/AdminDashbored";
import { useAuth } from "../Contexts/AuthContext";

const MainRoutes = () => {
  const { user, onLogout } = useAuth();
  return (
    <>
      {user && (
        <Button variant="danger" onClick={onLogout}>
          Logout
        </Button>
      )}
      <Routes>
        <Route index element={<Landing />} />
        <Route path="landing" element={<Landing />} />
        <Route
          element={
            <ProtectedRoutes
              redirectPath={user && user.isAdmin ? "admin/dashbored" : "/"}
              isAllow={!!user && !user.isAdmin}
            />
          }
        >
          <Route path="home" element={<Home />} />
        </Route>
        <Route
          path="admin/dashbored"
          element={
            <ProtectedRoutes redirectPath="/" isAllow={!!user && user.isAdmin}>
              <AdminDashbored />
            </ProtectedRoutes>
          }
        />

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export default MainRoutes;
