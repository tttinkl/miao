import React, { Component} from "react";
import { HomeWrapper, HomeLeft, HomeRight }from "./style.js";
import List from "./components/List.js";
import Recomand from "./components/Recomand.js";
import Writer from "./components/Writer";
import { connect } from "react-redux";
class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <List />
        </HomeLeft>
        <HomeRight>
          <Recomand />
          <Writer />
        </HomeRight>
      </HomeWrapper>
      )
  }
}
const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);