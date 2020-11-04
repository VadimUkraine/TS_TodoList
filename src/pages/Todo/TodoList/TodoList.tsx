import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import { RootState } from "../../../rootReducer";
import { deleteTodoRequest, changeTodoRequest } from "../actions";
import TodoListItem from "../../../components/TodoListItem";
import { ITodo } from '../interfaces';

export const TodoList: React.FC = () => {

  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.todo.list);

  const [editID, setEditId] = useState("");

  const handleDelete = (id: string) => {
    dispatch(deleteTodoRequest(id));
  };

  const handleSetEditId = (id: string) => {
    setEditId(id);
  };

  const handleChangeTodo = (id: string, text: string) => {
    dispatch(changeTodoRequest(id, text));
  };

  return (
    <List data-testid={"todo-list-component"}>
      {list.map((todo: ITodo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          deleteTodo={handleDelete}
          editID={editID}
          setEditId={handleSetEditId}
          changeTodo={handleChangeTodo}
        />
      ))}
    </List>
  );
};

export default TodoList;
