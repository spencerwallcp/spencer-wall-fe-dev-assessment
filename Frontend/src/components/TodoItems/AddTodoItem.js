import '../../App.css'
import { Button, Container, Row, Col, Form, Stack } from 'react-bootstrap'
import React, { useState } from 'react'
import { createItem } from '../../services/ItemService';
import ErrorDialog from '../ErrorDialog'

const AddTodoItem = ({ getItems}) => {

  const [description, setDescription] = useState('')
  const [show, setShow] = useState(false)

  async function handleAdd() {

      if (description === ''){   
        alert('You must enter a description');
        return;
      }

      const item = {
        description: description,
        isComplete: false
      };

      try {
        await createItem(item);
        getItems();
      } catch (error) {
        setShow(true);
        console.error(error);
      }

      handleClear();
    }

    function handleClear() {
      setDescription('');
    }

    function handleDescriptionChange(event) {
      setDescription(event.target.value)
    }

return (
    <Container>
    <ErrorDialog handleClose={() => setShow(false)} show={show}></ErrorDialog>
    <h1>Add Item</h1>
    <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
      <Form.Label column sm="2">
        Description
      </Form.Label>
      <Col md="6">
        <Form.Control
          type="text"
          id="description"
          placeholder="Enter description..."
          value={description}
          onChange={handleDescriptionChange}
        />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
      <Stack direction="horizontal" gap={2}>
        <Button variant="primary" onClick={() => handleAdd()}>
          Add Item
        </Button>
        <Button variant="secondary" onClick={() => handleClear()}>
          Clear
        </Button>
      </Stack>
    </Form.Group>
  </Container>
  );

};

export default AddTodoItem