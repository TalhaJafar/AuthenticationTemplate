import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ViewableModal = (props) => {
  const { action, selectedItem, handleDelete, onHide } = props;
  console.log(selectedItem, "Selected Item");
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
        <div></div>
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
