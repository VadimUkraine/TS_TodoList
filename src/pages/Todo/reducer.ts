import { IItem } from './interfaces';
import { IActions } from './actions';


const initialState = {
  items: ['sads', 'sdsadsa',] as string[],
};

export type IReduxState = typeof initialState;

export function todoReducer(state = initialState, action: IActions): IReduxState {
  switch (action.type) {
    default:
      return state;
  }
}
