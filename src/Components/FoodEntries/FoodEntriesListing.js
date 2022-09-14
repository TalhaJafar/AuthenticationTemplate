import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
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
  const [fetchData, setFetch] = useState(true);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (fetchData) {
      listMeals().then((res) => {
        setMeals(res);
      });
      const filters = {
        startDate: startDate.toDateString(),
        endDate: endDate.toDateString(),
      };

      if (isAdmin) {
        getAllUsers().then((res) => {
          setUsers(res);
        });
        getAdminFoodEntries(filters).then((res) => {
          setfoodEntries(res);
        });
      } else {
        getUserFoodEntries(filters).then((res) => {
          setfoodEntries(res);
        });
      }
    }

    setFetch(false);
  }, [fetchData]);

  const handleActionIcons = ({ id, action }) => {
    const entry = foodEntries.find((x) => x._id === id);

    setSelectedItem(entry);
    setAction(action);
  };

  const handleEditableModal = (record) => {
    setFetch(true);
    setAction(null);
    setSelectedItem(null);
  };

  const handleDelete = () => {
    deleteFoodEntry({ foodEntryId: selectedItem._id })
      .then((res) => {
        setfoodEntries(
          foodEntries.filter((item) => item._id !== selectedItem._id)
        );
        setAction(null);
        setSelectedItem(null);
      })
      .catch((err) => toast.error("Error in Deleting"));
  };

  const handleFilter = () => {
    const filters = {
      startDate: startDate.toDateString(),
      endDate: endDate.toDateString(),
    };
    if (isAdmin) {
      getAdminFoodEntries(filters).then((res) => {
        setfoodEntries(res);
      });
    } else {
      getUserFoodEntries(filters).then((res) => {
        setfoodEntries(res);
      });
    }
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

      <div className="d-flex align-items-center">
        <div>
          Start Date:{" "}
          <DatePicker
            selected={startDate}
            className="form-control"
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div>
          End Date
          <DatePicker
            selected={endDate}
            className="form-control"
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <Button onClick={handleFilter}>Apply Filter</Button>
      </div>

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
            const { _id, caloriesConsumed, caloriesTarget, date, userId } =
              item;
            return (
              <tr key={_id}>
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
            meals={meals}
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
