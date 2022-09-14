import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { getReports } from "../../Services/adminReports";

const AdminReports = () => {
  const [currentTotalEntries, setCurrentTotalEntries] = useState(0);
  const [previousTotalEntries, setPreviousTotalEntries] = useState(0);
  const [usersAverageCalories, setUsersAverageCalories] = useState([]);

  useEffect(() => {
    getReports()
      .then((res) => {
        const {
          usersAverageCalories,
          currentTotalEntries,
          previousTotalEntries,
        } = res;
        setCurrentTotalEntries(currentTotalEntries);
        setPreviousTotalEntries(previousTotalEntries);
        setUsersAverageCalories(usersAverageCalories);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="row">
      <div className="col-6">
        <h5>Current Week Report</h5>
        <br />
        <div>
          Total Entries made in last 7 days : <h4>{currentTotalEntries}</h4>
        </div>

        <br />
        <h6>List of Consumed Calories by users:</h6>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Consumed Calories</th>
              <th>Average Calories</th>
            </tr>
          </thead>
          <tbody>
            {usersAverageCalories.map((item) => {
              const { id, userName, totalCalories } = item;
              return (
                <tr key={id}>
                  <td>{userName}</td>
                  <td>{totalCalories}</td>
                  <td>{(totalCalories / 7).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="col-6 px-5">
        <h5>Previous Week Report</h5>
        <br />
        <div>
          Total Entries made in the week before :{" "}
          <h4>{previousTotalEntries}</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
