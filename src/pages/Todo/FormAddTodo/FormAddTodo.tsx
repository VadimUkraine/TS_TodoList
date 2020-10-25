import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { addTodoRequest } from "../actions";

const useStyles = makeStyles(() => createStyles({
  formStyles: {
    display: "flex",
    alignItems: "flex-end",
  },
  textFieldStyles: {
    width: "80%",
    marginRight: "10px",
  },
}));

export const FormAddTodo: React.FC = () => {
  const dispatch = useDispatch();

  const [todo, setName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const handleAddTodo = () => {
    dispatch(addTodoRequest(todo));
    setName('');
  };

  const classes = useStyles();

  return (
    <form
      className={classes.formStyles}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      data-testid={"todo-form"}
     >
        <TextField
          className={classes.textFieldStyles}
          id="standard-name"
          label="Write todo here"
          value={todo}
          onChange={handleChange}
          inputProps={{ "aria-label": "todo-form-input" }}
        />
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          data-testid={"todo-form-add-button"}
        >
          Add Todo
        </Button>
    </form>
  );
};

export default FormAddTodo;
