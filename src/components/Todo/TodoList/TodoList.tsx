import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import { RootState } from "../../../redux/reducers/rootReducer";
import { deleteTodoRequest, changeTodoRequest } from "../../../redux/actions/todo";
import TodoListItem from "./TodoListItem";
import { Todo } from '../../../types';

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
      {list.map((todo: Todo) => (
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
