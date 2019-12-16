import React, { Component } from "react";
import { ListItem, ListInfo, GetMoreList} from "../style.js";
import { connect } from "react-redux";
import { actionCreators }  from "../store";

class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {
          this.props.articalList.map( it => {
            return (
              <ListItem>
                <ListInfo>
                  <h3>{it.title}</h3>
                  <div className="detail">{it.detail}</div>

                </ListInfo>
                { it.img ? <img src={it.img} /> : null}
              </ListItem>
              )
          })
        }
        <GetMoreList>查看更多</GetMoreList>
      </div>
      )
  }

  componentDidMount() {
    this.props.getArtList();
  }
}

const mapState = (state) => {
  return {
    articalList: state.home.articalList
  }
}

const mapDispatch = (dispatch) => {
  return {
    getArtList() {
      dispatch(actionCreators.getArtList());
    }
  }
}
export default connect(mapState, mapDispatch)(List);