import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { updateCaloriesTarget } from "../../Services/users";
import { useAuth } from "../../Contexts/AuthContext";

const UsersListing = () => {
  const { user, handleCalorieChange } = useAuth();

  const [CaloriesTarget, setCaloriesTarget] = useState(user.caloriesTarget);
  console.log(user, "lop");

  const handleUpdate = () => {
    updateCaloriesTarget({ caloriesTarget: CaloriesTarget })
      .then((res) => {
        const calorieObj = {
          ...user,
          caloriesTarget: res.caloriesTarget,
        };
        handleCalorieChange(calorieObj);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="landingPage-container">
      <h4>Enter your calories target</h4>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Enter Calories Target ..."
          value={CaloriesTarget}
          type="number"
          onChange={(e) => setCaloriesTarget(e.target.value)}
        />
        <Button variant="primary" onClick={handleUpdate}>
          Update Target
        </Button>
      </InputGroup>
    </div>
  );
};

export default UsersListing;
