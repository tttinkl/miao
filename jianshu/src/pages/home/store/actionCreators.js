import * as actionTypes from "./actionTypes";
import axios from "axios";
const getArtListAction = (data) => {
  return {
    type: actionTypes.GET_ART_LIST,
    data: data
  }
}
export const getArtList = () => {
  return (dispatch) => {
    axios.get("/api/home.json").then(data => {
      console.log(data.data.data.articleList);
      dispatch(getArtListAction(data.data.data.articleList))
    })
  }
}