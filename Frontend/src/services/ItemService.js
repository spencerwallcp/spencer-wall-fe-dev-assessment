const axios = require('axios')

export async function getAllItems() {

  const getResponse = await axios.get(`http://localhost:7000/api/todoItems`);
  return (getResponse);   
}

export async function createItem(item) {

  const postResponse = await axios.post(`http://localhost:7000/api/todoItems`, item);
  return (postResponse);

}

export async function updateItem(item) {

  const putResponse = await axios.put(`http://localhost:7000/api/todoItems/${item.id}`, item);
  return (putResponse);

}
