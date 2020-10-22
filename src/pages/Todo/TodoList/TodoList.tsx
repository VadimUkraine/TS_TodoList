
import React from "react";
import List from "@material-ui/core/List";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../rootReducer";
import { deleteTodoRequest } from "../actions";
import TodoListItem from "../../../components/TodoListItem";

export const TodoList: React.FC = () => {

  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.todo.list);

  const handleDelete = (todo: string) =>{
    dispatch(deleteTodoRequest(todo))
  }



  return(
    <List >
      {list.map((todo: string, index: number)=>(
        <TodoListItem key={index} todo={todo} deleteTodo={handleDelete}   />
      ))}
    </List>
  )
}