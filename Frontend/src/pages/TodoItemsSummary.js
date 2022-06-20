import '../App.css'
import { Image, Alert, Container, Row, Col } from 'react-bootstrap'
import AddTodoItem from '../components/TodoItems/AddTodoItem'
import TodoItemList from '../components/TodoItems/TodoItemList'
import ErrorDialog from '../components/ErrorDialog'
import React, {useState, useEffect} from 'react'
import { getAllItems } from '../services/ItemService';

const TodoItemsSummary = () => {

  const [items, setItems] = useState([])
  const [show, setShow] = useState(false);

  useEffect(() => {
    getItems();
  }, [])

  async function getItems() {
  
    try {
      const response = await getAllItems();
      formatItems(response.data);
    } catch (error) {
      setShow(true);
      console.error(error);
    }
  }
  
  function formatItems(items){
    items = items.filter(item => item.isComplete !== true);
    items = items.sort((a,b) => a.description.localeCompare(b.description));
    setItems(items);
  }
  
  const renderAddTodoItemContent = () => {
    return (
      <AddTodoItem getItems={getItems}>
      </AddTodoItem>
    )
  }
  
    const renderTodoItemsContent = () => {
      return (
        <TodoItemList items={items} getItems={getItems}>
        </TodoItemList>
      )
    }  
    
    return (

      <div className="App">
        <Container>
        <ErrorDialog handleClose={() => setShow(false)} show={show}></ErrorDialog>
          <Row>
            <Col>
              <Image src="clearPointLogo.png" fluid rounded />
            </Col>
          </Row>
          <Row>
            <Col>
              <Alert variant="success">
                <Alert.Heading>Todo List App</Alert.Heading>
                Welcome to the ClearPoint frontend technical test. We like to keep things simple, yet clean so your
                task(s) are as follows:
                <br />
                <br />
                <ol className="list-left">
                  <li>Add the ability to add (POST) a Todo Item by calling the backend API</li>
                  <li>
                    Display (GET) all the current Todo Items in the below grid and display them in any order you wish
                  </li>
                  <li>
                    Bonus points for completing the 'Mark as completed' button code for allowing users to update and mark
                    a specific Todo Item as completed and for displaying any relevant validation errors/ messages from the
                    API in the UI
                  </li>
                  <li>Feel free to add unit tests and refactor the component(s) as best you see fit</li>
                </ol>
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>{renderAddTodoItemContent()}</Col>
          </Row>
          <br />
          <Row>
            <Col>{renderTodoItemsContent()}</Col>
          </Row>
        </Container>
        <footer className="page-footer font-small teal pt-4">
          <div className="footer-copyright text-center py-3">
            © 2021 Copyright:
            <a href="https://clearpoint.digital" target="_blank" rel="noreferrer">
              clearpoint.digital
            </a>
          </div>
        </footer>
      </div>
    )
  }
  
  export default TodoItemsSummary