export const saveTodoList = (todoList: string) => {
  localStorage.setItem("todoList", todoList);
};

export const getTodoList = (): string| null => (localStorage.getItem("todoList"));

export const setDateTimeToString = (): string => (new Date().toLocaleString("ru", {
  day: "numeric",
  month: 'numeric',
  year: 'numeric',
  hour: "numeric",
  minute: "numeric",
}));
