import { useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import toast from "react-hot-toast";
import { getSystemAccess } from "../Services/users";
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
    <div className="landingPage-container">
      <h4>Enter your email to login</h4>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Enter Email Address Here ..."
          aria-label="Email"
          aria-describedby="basic-addon1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="primary" onClick={handleGetAccess}>
          Get Access
        </Button>
      </InputGroup>
    </div>
  );
};

export default Landing;
