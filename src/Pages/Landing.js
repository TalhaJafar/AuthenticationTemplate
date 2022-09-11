import { useState } from "react";
import { Navigate } from "react-router-dom";
import { getSystemAccess } from "../Services/users";
import toast from "react-hot-toast";
import { useAuth } from "../Contexts/AuthContext";
const Landing = () => {
  const [email, setEmail] = useState("");
  const { onLogin, user } = useAuth();
  const handleGetAccess = async () => {
    if (email) {
      const { user, token } = await getSystemAccess(email);
      onLogin({ user, token });
    } else {
      toast.error("Please provide proper email");
    }
  };

  if (user) {
    return <Navigate to={user.isAdmin ? "admin/dashbored" : "home"} replace />;
  }
  return (
    <div>
      <h1>Provide Email</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleGetAccess}>Get Access</button>
    </div>
  );
};

export default Landing;
