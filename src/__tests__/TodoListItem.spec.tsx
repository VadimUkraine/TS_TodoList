import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { render, fireEvent, screen} from "@testing-library/react";


test('calls onClick to delete todo list item', () => {
  const handleClick = jest.fn();
  render(
    <ListItem>
      <ListItemText
        primary={"todo"}
      />
      <ListItemSecondaryAction >
        <IconButton edge="end" aria-label="delete" onClick={handleClick} data-testid={"todo-list-delete-btn"}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem> 
  )
  fireEvent.click(screen.getByTestId("todo-list-delete-btn"))
  expect(handleClick).toHaveBeenCalledTimes(1)
})


