import { combineReducers } from 'redux';
import { todoReducer } from './pages/Todo/reducer';


const rootReducer = combineReducers({
  todoList: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
