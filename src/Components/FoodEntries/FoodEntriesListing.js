import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { IoEye, IoPencil, IoTrash } from "react-icons/io5";
import toast from "react-hot-toast";
import {
  getUserFoodEntries,
  getAdminFoodEntries,
  deleteFoodEntry,
} from "../../Services/foodEntries";
import { listMeals } from "../../Services/meals";
import { getAllUsers } from "../../Services/users";
import ViewableModal from "./Modals/ViewableModal";
import EditableModal from "./Modals/EditableModal";
import { useAuth } from "../../Contexts/AuthContext";

import "./styles.css";

const FoodEntriesListing = () => {
  const { user } = useAuth();
  const { isAdmin } = user;

  const [users, setUsers] = useState([]);
  const [meals, setMeals] = useState([]);
  const [foodEntries, setfoodEntries] = useState([]);
  const [action, setAction] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    listMeals().then((res) => {
      setMeals(res);
    });

    if (isAdmin) {
      getAllUsers().then((res) => {
        setUsers(res);
      });
      getAdminFoodEntries().then((res) => {
        setfoodEntries(res);
      });
    } else {
      getUserFoodEntries().then((res) => {
        setfoodEntries(res);
      });
    }
  }, []);

  const handleActionIcons = ({ id, action }) => {
    const entry = foodEntries.find((x) => x._id === id);
    setSelectedItem(entry);
    setAction(action);
  };

  const handleEditableModal = (record) => {
    if (action === "add") {
    } else if (action === "edit") {
    }
  };

  const handleDelete = () => {
    deleteFoodEntry({ foodEntryId: selectedItem._id })
      .then((res) => {
        setfoodEntries(
          foodEntries.filter((item) => item._id !== selectedItem._id)
        );
        setAction(null);
        setSelectedItem(null);
        toast.success("Successfully Deleted");
      })
      .catch((err) => toast.error("Error in Deleting"));
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setAction("add")}
        className="mt-2 mb-2"
      >
        Add Entry
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Targeted Calories</th>
            <th>Consumed Calories</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodEntries.map((item) => {
            const {
              _id,
              caloriesConsumed,
              caloriesTarget,
              date,
              dayFoodEntries,
              userId,
            } = item;
            return (
              <tr>
                <td>{userId.name}</td>
                <td>{caloriesTarget && caloriesTarget}</td>
                <td>{caloriesConsumed}</td>
                <td>{new Date(date).toDateString()}</td>
                <td className="actions-row">
                  <span
                    className="action-icon"
                    onClick={() =>
                      handleActionIcons({ id: _id, action: "view" })
                    }
                  >
                    <IoEye />
                  </span>

                  <span
                    className="action-icon"
                    onClick={() =>
                      handleActionIcons({ id: _id, action: "edit" })
                    }
                  >
                    <IoPencil />
                  </span>

                  <span
                    className="action-icon"
                    onClick={() =>
                      handleActionIcons({ id: _id, action: "delete" })
                    }
                  >
                    <IoTrash />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
        {(action === "view" || action === "delete") && (
          <ViewableModal
            action={action}
            selectedItem={selectedItem}
            handleDelete={handleDelete}
            show={action === "view" || action === "delete" ? true : false}
            onHide={() => {
              setAction(null);
              setSelectedItem(null);
            }}
          />
        )}
        {(action === "edit" || action === "add") && (
          <EditableModal
            action={action}
            selectedItem={selectedItem}
            meals={meals}
            isAdmin={isAdmin}
            users={users}
            show={action === "edit" || action === "add" ? true : false}
            handleAction={handleEditableModal}
            onHide={() => {
              setAction(null);
              setSelectedItem(null);
            }}
          />
        )}
      </Table>
    </>
  );
};

export default FoodEntriesListing;
