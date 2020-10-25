import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import FormAddTodo from "./FormAddTodo";
import TodoList from "./TodoList";

const useStyles = makeStyles(() => createStyles({
  todoStyles: {
    padding: "10px 5px",
    margin: "0 auto",
    maxWidth: "500px",
  },
}));

export const Todo: React.FC = () => {

  const classes = useStyles();

  return (
    <div className={classes.todoStyles} data-testid={"todo-root-component"}>
      <FormAddTodo/>
      <TodoList/>
    </div>
  );
};

export default Todo;
