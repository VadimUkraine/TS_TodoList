import React from "react";
import { Provider } from "react-redux";
import App from "../App";
import configureStore from "../store";
import { render, fireEvent} from "@testing-library/react";

const store = configureStore();

const renderComponent = () => render(
  <Provider store={store}>
    <App />
  </Provider>
)

describe("App", () =>{
  it("render Todo root component", () =>{
   const {getByTestId} = renderComponent();
   const todoRootComponent = getByTestId("todo-root-component")
   expect(todoRootComponent).toBeDefined();
  })

  it("render Todo List Form", () =>{
    const {getByTestId} = renderComponent();
    const todoForm = getByTestId("todo-form")
    expect(todoForm).toBeDefined(); 
  })

  it("render Todo List Input", () =>{
    const {getByLabelText} = renderComponent();
    const todoFormInput = getByLabelText("todo-form-input")
    expect(todoFormInput).toBeDefined();
  })

  it("render Todo Form Button", () =>{
    const {getByTestId} = renderComponent();
    const todoFormAddButton = getByTestId("todo-form-add-button")
    expect(todoFormAddButton).toBeDefined(); 
  })

  it("try to input add task", () =>{
    const {getByLabelText} = renderComponent();
    const todoFormInput = getByLabelText("todo-form-input") as HTMLInputElement;   
    fireEvent.change(todoFormInput, { target: { value: "buy milk" } });
    expect(todoFormInput.value).toBe("buy milk");
  })

  it("try to click add task button", () =>{
    const {getByTestId, getByLabelText} = renderComponent();
    const todoFormAddButton = getByTestId("todo-form-add-button")  
    const todoFormInput = getByLabelText("todo-form-input") as HTMLInputElement;  
    fireEvent.change(todoFormInput, { target: { value: "buy milk" } });
    fireEvent.click(todoFormAddButton);
    expect(todoFormInput.value).toBe("");
  })

  it("render Todo List component", () =>{
    const {getByTestId} = renderComponent();
    const todoListComponent = getByTestId("todo-list-component")  
    expect(todoListComponent).toBeDefined(); 
  })

  it("try to add new task in todo list component", () =>{
    const {getByTestId, getByLabelText} = renderComponent();
    const todoFormAddButton = getByTestId("todo-form-add-button")  
    const todoFormInput = getByLabelText("todo-form-input") as HTMLInputElement;  
    fireEvent.change(todoFormInput, { target: { value: "buy milk" } });
    fireEvent.click(todoFormAddButton);
    expect(todoFormInput.value).toBe("");
    const todoListComponent = getByTestId("todo-list-component") 
    const todoListItem = todoListComponent.querySelector('li') as HTMLLIElement;
    expect(todoListItem.textContent).toBe("buy milk");    
  })
})
