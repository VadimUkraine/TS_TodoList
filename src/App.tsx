import React, { useEffect } from "react";
import Todo from "./pages/Todo";
import { useDispatch } from "react-redux";
import { getTodoListRequest } from "./pages/Todo/actions";



export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoListRequest());
  }, []);

  return (  
    <>
      <Todo />
    </> 
  );
};

export default App;
