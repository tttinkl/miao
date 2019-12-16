import React, { Component } from "react";
import { RecomandWrapper } from "../style.js";

class Recomand extends Component {
  render() {
    return (
        <RecomandWrapper>
          {
            this.props.recomand.map(it => {
              return (
                <RecomandItem >
                
                </RecomandItem>
                )
            })
          }
        </RecomandWrapper>
      )
  }
}

export default Recomand;