import * as actionTypes from "./actionTypes";
import axios from "axios"
export const searchFocus = () => ({
  type: actionTypes.SEARCH_FOCUS
})

export const searchBlur = () => ({
  type: actionTypes.SEARCH_BLUR
})

const changeList = (data) => ({
  type: actionTypes.CHANGE_LIST,
  data: data,
  totalPage: Math.ceil(data.length / 10)
});

export const getList = () => {
  return (dispatch) => {
    axios.get('/api/headerList.json').then(data => {
      dispatch(changeList(data.data));
    })
  }
}

export const mouseIn = () => {
  return {
    type: actionTypes.MOUSE_IN
  }
};

export const mouseOut = () => {
  return {
    type: actionTypes.MOUSE_OUT
  }
};

export const changePage = () => {
  return {
    type: actionTypes.CHANGE_PAGE
  }
}