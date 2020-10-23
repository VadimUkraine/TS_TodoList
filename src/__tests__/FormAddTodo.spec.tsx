import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { render, fireEvent, screen} from "@testing-library/react";

test('calls onChange to input new add todo', () => {
  const handleChange = jest.fn();
  render(
        <form>
          <TextField 
            id="standard-name" 
            label="Write todo here" 
            value={'todo'} 
            onChange={handleChange}
            inputProps={{ "aria-label": "todo-form-input" }}
          />
          <Button 
            size="small" 
            variant="contained" 
            color="primary" 
          >
            Add Todo
          </Button>
        </form>)
  fireEvent.change(screen.getByLabelText("todo-form-input"), { target: { value: "buy milk" } })
  expect(handleChange).toHaveBeenCalledTimes(1)
})



test('calls onClick to add todo', () => {
  const handleClick = jest.fn();
  render(
        <form >
          <TextField 
            id="standard-name" 
            label="Write todo here" 
            value={'todo'} 
                />
          <Button 
            size="small" 
            variant="contained" 
            color="primary" 
            onClick={handleClick} 
            data-testid={"todo-form-add-button"}
          >
            Add Todo
          </Button>
        </form>)
  fireEvent.click(screen.getByTestId("todo-form-add-button"))
  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('calls onSubmit on form add todo', () => {
  const handleSubmit = jest.fn();
  render(
      <form 
        onSubmit={handleSubmit }
        data-testid={"todo-form"}
      >
          <TextField 
            id="standard-name" 
            label="Write todo here" 
            value={'todo'} 
          />
          <Button 
            size="small" 
            variant="contained" 
            color="primary" 
          >
            Add Todo
          </Button>
      </form>)
  fireEvent.submit(screen.getByTestId("todo-form"))
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})