import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAllow, redirectPath = "/", children }) => {
  if (!isAllow) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
