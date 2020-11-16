import React, { useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { getTodoListRequest } from "../../redux/actions/todo";
import FormAddTodo from "./FormAddTodo";
import TodoList from "./TodoList";

const useStyles = makeStyles(() => createStyles({
  todoStyles: {
    padding: "0.625rem 0.3125rem",
    margin: "0 auto",
    maxWidth: "31.25rem",
  },
}));

export const Todo: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoListRequest());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <div className={classes.todoStyles} data-testid={"todo-root-component"}>
      <FormAddTodo/>
      <TodoList/>
    </div>
  );
};

export default Todo;
