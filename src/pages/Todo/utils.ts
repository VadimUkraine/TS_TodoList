export const saveTodoList = (todoList: string) => {
  localStorage.setItem("todoList", todoList);
}

export const getTodoList = (): string| null => {
  return localStorage.getItem("todoList");
} 



