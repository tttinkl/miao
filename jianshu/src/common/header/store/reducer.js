import * as actionTypes from "./actionTypes";
import produce from "immer"

let defaultState = {
  focused: false,
  list: [],
  mouseIn: false,
  page: 0,
  totalPage: 1
};

export default (state = defaultState, action) => {
  if (action.type === actionTypes.SEARCH_FOCUS) {
    return produce((draft) => {
      draft.focused = true;
    })(state)
  }
  if (action.type === actionTypes.SEARCH_BLUR) {
    return produce((draft) => {
      draft.focused = false;
    })(state);
  }
  if (action.type === actionTypes.CHANGE_LIST) {
    return produce( draft => {
      draft.list = action.data;
      draft.totalPage = action.totalPage
    })(state);
  }
  if (action.type === actionTypes.MOUSE_IN) {
    return produce( draft => {
      draft.mouseIn = true;
    })(state);
  }
  if (action.type === actionTypes.MOUSE_OUT) {
    return produce( draft => {
      draft.mouseIn = false;
    })(state);
  }  
  if (action.type === actionTypes.CHANGE_PAGE) {
    return produce( draft => {
      if (draft.page === draft.totalPage - 1) {
        draft.page = 0;
      } else {
        draft.page++;
      }
    })(state);
  }
  return state;
}