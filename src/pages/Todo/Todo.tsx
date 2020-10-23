import React from "react";
import FormAddTodo from "./FormAddTodo";
import TodoList from "./TodoList";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    todoStyles: {
      padding: "10px 5px",
      margin: "0 auto",
      maxWidth: "500px",
    },
  }),
);


export const Todo: React.FC = () => {

  const classes = useStyles();

  return (
    <div className={classes.todoStyles} data-testid={"todo-root-component"}>
      <FormAddTodo/>   
      <TodoList/>  
    </div>
  )
}