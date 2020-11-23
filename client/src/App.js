import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyle from "./global-styles";
import theme from "./theme";

import routes from "./views";

import {
  Header,
  Modal,
  QuickCart,
  Login,
  PrivateRoute,
  SideBar,
} from "./components";

const Body = styled.div`
  overflow-y: auto;
  height: 100vh;
  position: relative;
  width: 100%;
`;

function App() {
  const [openCart, setOpenCart] = useState(false),
    [logindisplay, setLogindisplay] = useState(false),
    [sideBarDisplay, setSideBarDisplay] = useState(false),
    toggleCartState = () => setOpenCart(!openCart),
    toggleLoginDisplay = () => setLogindisplay(!logindisplay),
    toggleSideBar = () => setSideBarDisplay(!sideBarDisplay);

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
        <Modal isOpen={openCart} position="right" close={toggleCartState}>
          <QuickCart closeQuickCart={toggleCartState} />
        </Modal>
        <Modal isOpen={sideBarDisplay} position="left" close={toggleSideBar}>
          <SideBar close={toggleSideBar} />
        </Modal>
        <Modal isOpen={logindisplay} close={toggleLoginDisplay}>
          <Login closeAuth={toggleLoginDisplay} />
        </Modal>

        <Body onScroll={updateNavBar}>
          <Header
            openCart={toggleCartState}
            showAuthForm={toggleLoginDisplay}
            toggleSideBar={toggleSideBar}
          />
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
        </Body>
      </ThemeProvider>
    </Router>
  );
}

export default App;
