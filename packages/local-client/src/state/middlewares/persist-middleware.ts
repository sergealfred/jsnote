import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;

  return (next: (action: Action) => void) => (action: Action) => {
    next(action);

    if (
      [
        ActionType.MOVE_CELL,
        ActionType.UPDATE_CELL,
        ActionType.INSERT_CELL_AFTER,
        ActionType.DELETE_CELL,
      ].includes(action.type)
    ) {
      // wire up saveCell as action creator to be used with redux thunk
      // - call saveCells, return function that is immediately invoking that
      // function with dispatch and getState

      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        saveCells()(dispatch, getState);
      }, 250);
    }
  };
};
