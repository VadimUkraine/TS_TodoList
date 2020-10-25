export const saveTodoList = (todoList: string) => {
  localStorage.setItem("todoList", todoList);
};

export const getTodoList = (): string| null => (localStorage.getItem("todoList"));
