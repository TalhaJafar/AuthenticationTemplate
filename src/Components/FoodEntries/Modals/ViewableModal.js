import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";

const ViewableModal = (props) => {
  const { action, selectedItem, handleDelete, onHide } = props;
  const { dayFoodEntries, date, caloriesConsumed, userId } = selectedItem;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Item Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <h6 className="text-bold">User Name</h6>
              <span>{userId.name}</span>
            </div>
            <div className="d-flex flex-column">
              <h6 className="text-bold">Calories Consumed</h6>
              <span>{caloriesConsumed}</span>
            </div>
            <div className="d-flex flex-column">
              <h6 className="text-bold">Date</h6>
              <span>{new Date(date).toDateString()}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <Accordion className="w-100">
              {dayFoodEntries &&
                dayFoodEntries.map((item, index) => {
                  const { mealId, mealFoods } = item;
                  return (
                    <div className="d-flex flex-column w-100">
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>{mealId.name}</Accordion.Header>
                        <Accordion.Body>
                          <Table bordered hover>
                            <thead>
                              <tr>
                                <th>Item Name</th>
                                <th>Calories</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mealFoods.map((food) => {
                                const { itemName, calories } = food;
                                return (
                                  <tr key={food._id}>
                                    <td>{itemName}</td>
                                    <td>{calories}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  );
                })}
            </Accordion>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {action === "delete" && (
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewableModal;
