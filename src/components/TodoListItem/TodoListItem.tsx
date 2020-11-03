import React, { useState, useEffect, useRef } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ITodo } from '../../pages/Todo/interfaces';

interface IProps {
  todo: ITodo;
  deleteTodo: (todo: string) => void;
  editID: string;
  setEditId: (id: string) => void;
}

const useStyles = makeStyles(() => createStyles({
  todoItemContent: {
    display: "flex",
    flexDirection: "column",
    minWidth: "95%",
    height: "45px",
  },
  todoButtonsWrap: {
    right: "0px",
  },
  btnDelete: {
    marginLeft: "5px",
  },
  todoItem: {
    paddingLeft: "0px",
    paddingRight: "150px",
    paddingTop: "15px",
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
    padding: "2px 0px 3px 0px",
  },
}));

export const TodoListItem: React.FC<IProps> = ({
  todo, deleteTodo, editID, setEditId,
}) => {

  const [text, setText] = useState('');
  const refEditInput = useRef(null);

  useEffect(() => {
    if (editID === todo.id) {
      if (refEditInput.current !== null) {
        refEditInput.current.focus();
      }
    }
  }, [editID]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleEdit = () => {
    if (editID !== todo.id) {
      setEditId(todo.id);
      setText(todo.text);
    } else {
      setEditId("");
    }
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
            id="todo-text"
            value={text}
            onChange={handleChange}
            inputProps={{
              "aria-label": "todo-item-edit-input",
              className: classes.editInputStyles,
              ref: refEditInput,
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
          {editID === todo.id ? "Confirm" : "Edit"}
          </Button>
          <Button className={classes.btnDelete} size="small" variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
  );
};

export default TodoListItem;
