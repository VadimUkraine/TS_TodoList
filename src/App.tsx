import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Todo from "./pages/Todo";
import { getTodoListRequest } from "./pages/Todo/actions";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoListRequest());
  }, []);

  return (<Todo />);
};

export default App;
