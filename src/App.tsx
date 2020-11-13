import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Todo from "./components/Todo";
import { getTodoListRequest } from "./redux/actions/todo";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoListRequest());
  }, [dispatch]);

  return (<Todo />);
};

export default App;
