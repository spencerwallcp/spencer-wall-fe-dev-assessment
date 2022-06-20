import {Modal, Button } from 'react-bootstrap'

const ErrorDialog = ({show, handleClose}) => {

    return (<Modal show={show}  onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
            </Modal.Header>
              <Modal.Body>Something went wrong..</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
            </Modal>
    )
}

 export default ErrorDialog;