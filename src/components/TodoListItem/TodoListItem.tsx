import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

interface IProps {
  todo: string;
  deleteTodo: (todo: string)=> void;
}

export const TodoListItem: React.FC<IProps> = ({ todo, deleteTodo }) => {

  const handleDelete = () => {
    deleteTodo(todo);
  };

  return (
      <>
        <ListItem>
          <ListItemText
            primary={todo}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </>
  );
};

export default TodoListItem;
