import produce from "immer";
import * as actionTypes from "./actionTypes";

let  defaultState = {
  articalList: [],
  recomand: []
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.GET_ART_LIST: 
      return produce(draft => {
        draft.articalList = action.data;
      })(state);
    default: 
      return state;
  }
}