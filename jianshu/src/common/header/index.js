import React, { Component }from "react";
import { HeaderWrapper, Logo, Nav, NavItem, NavSearch, Addition, Button, SearchWrapper, SearchInfo, SearchInfoTitle, SearchInfoSwitch, SearchInfoItem} from "./style.js"
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import  { actionCreators }from "./store/"


class Header extends Component {
  getListArea() {
    const { focused, list, page, mouseIn} = this.props;
    var nowlist = [];
    if (list.length) {
      for (let i = (page * 10); i < (page * 10 + 10);i++) {
        nowlist.push(list[i]);
      }
    }
    if (focused || mouseIn) {
      return (
            <SearchInfo 
            onMouseEnter={() => this.props.handleMouneIn()}
            onMouseLeave={() => this.props.handleMouseOut()}
            >
              <SearchInfoTitle>
                热门搜索
                <SearchInfoSwitch 
                onClick={() => this.props.handleChangePage(this.spinIcon)}
                >
                  <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                  换一批
                </SearchInfoSwitch>
              </SearchInfoTitle>
              {
                nowlist.map(it => {
                return (
                  <SearchInfoItem key={it}>
                    {it}
                  </SearchInfoItem>
                  )
                })
              }                                       
            </SearchInfo>    
            )
    }
    return;    
  }
  render() {
    return (
      <HeaderWrapper>
        <Logo />
        <Nav>
          <NavItem className="left">首页</NavItem>
          <NavItem className="left">下载App</NavItem>
          <NavItem className="right">登录</NavItem>
          <NavItem className="right"><i className="iconfont">&#xe636;</i></NavItem>
          <SearchWrapper>          
             <CSSTransition
              in={this.props.focused}
              timeout={200}
              classNames="slide"
             > 
             {
              /*
                slide-entter
                slide-enter-active

                slide-exit
                slide-exit-active
              */
             }
              <NavSearch 
              className={this.props.focused ? "focused" : "" }
              onFocus={this.props.handleInputFocus}
              onBlur={this.props.handleInputBlur}
              ></NavSearch>
            </CSSTransition>
            <i className={this.props.focused ? "focused iconfont zoom" : "iconfont zoom" }>&#xe62a;</i>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className="writing"><i className="iconfont">&#xe615;</i>写文章</Button>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper>
      )
  }
  
}


const mapStateToProps = (state) => {
  return {
    focused: state.header.focused,
    list: state.header.list,
    page: state.header.page,
    mouseIn: state.header.mouseIn
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus() {
      dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    handleMouneIn() {
      dispatch(actionCreators.mouseIn());
    },
    handleMouseOut() {
      dispatch(actionCreators.mouseOut());
    },
    handleChangePage(el) {
      const originAngle = el.style.transform.replace(/[^0-9]/g,"");
      if(originAngle !== "") {
        el.style.transform = `rotate(${+originAngle + 360}deg)`;
      }else {
        el.style.transform = `rotate(360deg)`;
      }
      dispatch(actionCreators.changePage());
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);