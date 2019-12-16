import styled from "styled-components";
import logoPic from "../../statics/jslogo.png"

export const HeaderWrapper = styled.div`
  position: relative;
  height: 58px;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
`
export const Logo = styled.a.attrs({
  href: "/"
})`
  height: 56px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  display: block;
  background: url(${logoPic});
  background-size: contain;
`

export const Nav = styled.div`
  width: 960px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 70px;

`

export const NavItem = styled.div`

  line-height: 56px;
  font-size: 17px;
  color: #333;
  &.left {
    float: left;
  }

  &.right {
    float: right;
    color: #969696;
  }
  
  &.active {
    color: #ea6f5a;
  }
`

export const NavSearch = styled.input.attrs({
  placeholder: "搜索"
})`
  &.slide-enter {
    transition: all 0.2s ease-out
  }
  &.slide-enter-active {
    width: 240px;
  }

  &.slide-exit {
    transition: all 0.2s ease-out
  }

  &.slide-exit-active {
    width: 160px;
  }

  width: 160px;
  height: 38px;
  margin-top: 9px;
  margin-left: 20px;
  padding: 0 35px 0 20px;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-radius: 19px;
  background: #eee;
  font-size: 14px;
  &::placeholder {
    color: #999;
  }
  &.focused {
    width: 240px;
  }
`

export const Addition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

export const Button = styled.div`
  float: right;
  line-height: 38px;
  margin-top: 9px;
  font-size: 15px;
  border: 1px solid rgba(236,97,73,.7);
  color: #ea6f5a;
  margin-right: 20px;
  padding: 0 20px;
  border-radius: 19px;
  &.reg {
    color: ##ea6f5a;
  }
  &.writing {
    color: #fff;
    background: #ea6f5a;
  }
`
export const SearchWrapper = styled.div`
  float: left;
  position: relative;

  .zoom {
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 30px;
    border-radius: 30px;
    line-height: 30px;
    text-align: center;
    &.focused {
      background: #777;
    }
  }
`

export const SearchInfo = styled.div`
  position: absolute;
  left: 0;
  background: #fff;
  top: 58px;
  width: 240px;
  padding: 0 20px;
  box-shadow: 0 0 8px rgba(0,0,0,.2);
`

export const SearchInfoTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  line-height: 20px;
  font-size: 14px;
  color: #969696;
`

export const SearchInfoSwitch = styled.span`
  float: right;
  font-size: 12px;
  .spin {
    display:inline-block;
    font-size: 12px;
    margin-right: 2px;
    transition: all .3s ease-out;
    transform: rotate(0deg);
    transform-origin: center;
  }`

export const SearchInfoItem = styled.a.attrs({
  href: "/"
})`
  line-height: 20px;
  padding: 0 5px;
  font-size: 12px;
  border: 1px solid #ddd;
  color: #969696;
  float: left;
  border-radius: 2px;
  margin-bottom: 15px;
  margin-left: 5px;


`
