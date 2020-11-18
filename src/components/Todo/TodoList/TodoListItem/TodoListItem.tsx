import React, { useState, useEffect, useRef } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Todo } from '../../../../types';

type Props = {
  todo: Todo;
  deleteTodo: (todo: string) => void;
  editID: string;
  setEditId: (id: string) => void;
  changeTodo: (id: string, todo: string) => void;
}

const useStyles = makeStyles(() => createStyles({
  todoItemContent: {
    display: "flex",
    flexDirection: "column",
    minWidth: "100%",
    height: "2.8125rem",
  },
  todoButtonsWrap: {
    right: "0rem",
  },
  btnDelete: {
    marginLeft: "0.3125rem",
  },
  todoItem: {
    paddingLeft: "0rem",
    paddingRight: "9.375rem",
    paddingTop: "0.9375rem",
  },
  textStyles: {
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: "1rem",
  },
  dateStyles: {
    textAlign: "right",
    fontWeight: 600,
    opacity: 0.5,
  },
  editInputStyles: {
    padding: "0.125rem 0rem 0.1875rem 0rem",
  },
}));

export const TodoListItem: React.FC<Props> = ({
  todo, deleteTodo, editID, setEditId, changeTodo,
}) => {

  const [inputValue, setInputValue] = useState('');
  const refInput = useRef(null);

  useEffect(() => {
    if (editID === todo.id && refInput.current) {
      refInput.current.focus();
    }
  }, [editID, todo]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = () => {
    setEditId(todo.id);
    setInputValue(todo.text);
  };

  const handleBlur = () => {
    setEditId("");
  };

  const handleKeyPress = (event: any) => {
    if (event.key !== 'Enter') return;
    if (inputValue !== todo.text) {
      changeTodo(todo.id, inputValue);
    }
    handleBlur();
  };

  const classes = useStyles();

  return (
      <ListItem
      className={classes.todoItem}
      data-testid={"todo-list-item"}
      >
        <div className={classes.todoItemContent}>
          {editID !== todo.id && <ListItemText
            primary={todo.text}
            classes={{
              primary: classes.textStyles,
            }}
          />}
          {editID === todo.id && <TextField
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            inputProps={{
              "aria-label": "todo-item-edit-input",
              className: classes.editInputStyles,
              ref: refInput,
            }}
        />}
        <Typography className={classes.dateStyles} variant="caption" display="block" gutterBottom>
          {todo.date}
        </Typography>
        </div>
        <ListItemSecondaryAction
          className={classes.todoButtonsWrap}
        >
          <Button size="small" variant="contained" color="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button className={classes.btnDelete} size="small" variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
  );
};

export default TodoListItem;
