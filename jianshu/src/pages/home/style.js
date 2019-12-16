import styled from "styled-components";

export const HomeWrapper = styled.div`
  overflow: hidden;
  width: 960px;
  margin: 0 auto;

`;
export const HomeLeft = styled.div`
  float: left;
  margin-left: 15px;
  padding-top: 30px;
  width: 625px;
  margin: 0 auto;
`;

export const HomeRight = styled.div`
  float: right;
  width: 280px;
  margin: 0 auto;
  height: 300px;
`;

export const ListItem = styled.div`
  width: 625px;
  border-bottom: 1px solid #f0f0f0;
  padding: 15px 2px 20px 0;
  margin: 0 0 15px;
  display: flex;
  justify-content: space-around;
  & img {
    width: 150px;
    height: 100px;
    flex-shrink: 0;
  }
`;

export const ListInfo = styled.div`
  width: 625px;
  flex-shrink: 1;
  & h3 {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
  }
  & .detail {
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
  }
`;

export const GetMoreList = styled.div`
  width: 100%;
  border-radius: 20px;
  background: #a5a5a5;
  text-align: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;

`

export const RecomandWrapper = styled.div`

`;

export const WriterWrapper = styled.div`

`;