import React from 'react';
import GlobalStyle from "./style"
import Header from "./common/header";
import Detail from "./pages/detail";
import Home from "./pages/home";
import GlobalIcon from "./statics/iconfont/iconfont.js"
import store from "./store"
import { Provider } from "react-redux";
import { BrowserRouter, Route} from "react-router-dom"

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle /> 
      <GlobalIcon />
      <Header />
      <BrowserRouter>
        <Route path="/" exact component={Home}></Route>
        <Route path="/detail" exact component={Detail}></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
