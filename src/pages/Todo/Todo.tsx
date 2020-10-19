import React from 'react';
import './Todo.scss';
import FormAddTodo from './FormAddTodo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';






export const Todo: React.FC = () => {

  const list = useSelector((state: RootState) => state.todo.list);



  return (
    <div className="todo">
      <FormAddTodo/>      
    </div>
  )

}