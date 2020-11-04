import axios from "../../global/api";

class TodoService {

  getList = async () => {
    try {
      const url = "/";
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      throw new Error(`get todo list request: ${err}`);
    }
  };  

  addTodo = async (payload: { id: string, text: string, date: string }) => {
    try {
      const url = "/";
      const response = await axios.post(url,  payload);
      return response.data;
    } catch (err) {
      throw new Error(`add todo request: ${err}`);
    }
  }; 

  deleteTodo = async (id: string) => {
    try {
      const url = "/";
      const response = await axios.delete(url, {data: { id }});
      return response.data;
    } catch (err) {
      throw new Error(`delete todo request: ${err}`);
    }
  };

  changeTodo = async (payload: { id: string, text: string, date: string }) => {
    try {
      const url = "/";
      const response = await axios.put(url, payload);
      return response.data;
    } catch (err) {
      throw new Error(`change todo request: ${err}`);
    }
  };
  
}

export default new TodoService();
