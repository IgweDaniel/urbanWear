import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyle from "./global-styles";
import theme from "./theme";
import { fetchUserCart } from "./ducks/cart";
import { setUserData } from "./ducks/auth";
import { fetchCategories } from "./ducks/global";
import { useDispatch, useSelector } from "react-redux";
import routes from "./views";

import {
  Header,
  // Modal,
  // QuickCart,
  // Login,
  PrivateRoute,
  ModalProvider,
  // SideBar,
} from "./components";

const Body = styled.div`
  overflow-y: auto;
  height: 100vh;
  position: relative;
  width: 100%;
`;

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  function updateBrowserDimensions() {
    let vh = window.innerHeight;
    let vw = window.innerWidth;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }
  function updateNavBar(e) {
    const page = e.currentTarget;
    if (page.scrollTop > 23) page.classList.add("hasScrolled");
    else page.classList.remove("hasScrolled");
  }

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchUserCart());
    if (token && !user) {
      dispatch(setUserData());
    }
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    updateBrowserDimensions();
    window.addEventListener("resize", updateBrowserDimensions);
    return () => {
      window.removeEventListener("resize", updateBrowserDimensions);
    };
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ModalProvider>
          <Body onScroll={updateNavBar}>
            <Header />
            <Switch>
              {routes.map(({ path, component, exact, authRequired }) =>
                authRequired ? (
                  <PrivateRoute
                    component={component}
                    path={path}
                    exact={exact}
                    key={path.replace("/", "")}
                  />
                ) : (
                  <Route
                    path={path}
                    exact={exact}
                    component={component}
                    key={path.replace("/", "")}
                  />
                )
              )}
            </Switch>
          </Body>
        </ModalProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
