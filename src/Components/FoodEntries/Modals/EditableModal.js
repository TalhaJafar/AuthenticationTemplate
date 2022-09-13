import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import Table from "react-bootstrap/Table";
import { IoTrash } from "react-icons/io5";
import { addFoodEntry, updateFoodEntry } from "../../../Services/foodEntries";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const EditableModal = (props) => {
  const { action, selectedItem, onHide, meals, users, isAdmin } = props;

  const [selectedUser, setSelectedUser] = useState(users[0]?._id);
  const [startDate, setStartDate] = useState(new Date());
  const [enteredMeals, setEnteredMeals] = useState([]);
  const [targetedCalories, setTargetedCalories] = useState(2100);
  const [consumedCalories, setConsumedCalories] = useState(0);

  useEffect(() => {
    if (isAdmin && action === "edit") {
      const {
        userId: { _id },
      } = selectedItem;
      const userData = users.find((x) => x._id === _id);
      setTargetedCalories(userData.caloriesTarget);
    } else if (action === "add") {
      const userData = users.find((x) => x._id === selectedUser);
      setTargetedCalories(userData.caloriesTarget);
    }
  }, [selectedUser]);

  useEffect(() => {
    let calories = 0;
    enteredMeals &&
      enteredMeals.forEach((item) => {
        const { mealFoods } = item;
        mealFoods.forEach((item) => {
          calories = calories + parseFloat(item.calories);
        });
      });
    setConsumedCalories(calories);
  }, [enteredMeals]);

  const handleMeal = (id) => {
    const mealExists = enteredMeals.findIndex((x) => x.mealId === id);
    if (mealExists !== -1) {
      setEnteredMeals(enteredMeals.filter((x) => x.mealId !== id));
    } else {
      const meal = {
        mealId: id,
        mealFoods: [],
      };
      setEnteredMeals((enteredMeals) => [...enteredMeals, meal]);
    }
  };

  const handleEntry = (id) => {
    const mealExists = enteredMeals.findIndex((x) => x.mealId === id);
    if (mealExists !== -1) {
      const entry = {
        itemName: "",
        calories: 0,
      };
      let newEntries = enteredMeals;
      newEntries[mealExists].mealFoods.push(entry);
      setEnteredMeals([...newEntries]);
    }
  };

  const handleEntryChange = (id, index, e) => {
    const mealExists = enteredMeals.findIndex((x) => x.mealId === id);
    if (mealExists !== -1) {
      let newEntries = [...enteredMeals];
      newEntries[mealExists].mealFoods[index][e.target.name] = e.target.value;
      setEnteredMeals([...newEntries]);
    }
  };

  const handleSave = () => {
    const obj = {
      userId: selectedUser,
      date: startDate,
      caloriesTarget: targetedCalories,
      caloriesConsumed: consumedCalories,
      dayFoodEntries: enteredMeals,
    };
    if (action === "add") {
      addFoodEntry(obj)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (action === "edit") {
      updateFoodEntry(obj)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err, "eeee");
        });
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter Item Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {isAdmin && (
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <br />
              {isAdmin && action === "add" ? (
                <Form.Select
                  value={selectedUser}
                  onChange={(e) => {
                    setSelectedUser(e.target.value);
                  }}
                >
                  {users &&
                    users.map((user) => {
                      return (
                        <option key={user._id} value={user._id}>
                          {user?.name}
                        </option>
                      );
                    })}
                </Form.Select>
              ) : (
                <Form.Label>{selectedItem.userId.name}</Form.Label>
              )}
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>
              Calories Consumed : {consumedCalories.toFixed(2)}
            </Form.Label>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Targeted Calories Quota: </Form.Label>
            <Form.Control
              onChange={(e) => {
                setTargetedCalories(e.target.value);
              }}
              value={targetedCalories}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select Date</Form.Label>

            <DatePicker
              selected={startDate}
              className="form-control"
              onChange={(date) => setStartDate(date)}
            />
          </Form.Group>

          <div className="d-flex align-items-center justify-content-between">
            {meals &&
              meals.map((item) => {
                const mealCheck = enteredMeals?.findIndex(
                  (x) => x.mealId === item._id
                );
                return (
                  <Button
                    key={item._id}
                    variant={mealCheck !== -1 ? "warning" : "outline-secondary"}
                    onClick={() => {
                      handleMeal(item._id);
                    }}
                  >
                    {item.name}
                  </Button>
                );
              })}
          </div>

          {enteredMeals.map((mealItem) => {
            const { mealId, mealFoods } = mealItem;
            const meal = meals.find((x) => x._id === mealId);
            return (
              <>
                <hr />
                <span className="d-flex align-items-center justify-content-between">
                  <h4>{meal.name} Items</h4>
                  <h6>Meal Limit: {meal.limit}</h6>
                </span>

                {mealFoods.length < meal.limit && (
                  <Button
                    onClick={() => {
                      handleEntry(mealId);
                    }}
                  >
                    Add
                  </Button>
                )}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Calories</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mealFoods.map((food, index) => {
                      const { itemName, calories } = food;
                      return (
                        <tr key={index}>
                          <td>
                            <Form.Control
                              name="itemName"
                              onChange={(e) => {
                                handleEntryChange(mealId, index, e);
                              }}
                              value={itemName}
                            ></Form.Control>
                          </td>
                          <td>
                            <Form.Control
                              name="calories"
                              type="number"
                              min={0}
                              defaultValue={0}
                              onChange={(e) => {
                                handleEntryChange(mealId, index, e);
                              }}
                              value={calories}
                            ></Form.Control>
                          </td>
                          <td>
                            <IoTrash />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </>
            );
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-success"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditableModal;
