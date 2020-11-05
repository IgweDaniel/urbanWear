import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyle from "./global-styles";
import theme from "./theme";

import routes from "./views";

import { Header, Modal, QuickCart, Login } from "./components";
import styled from "styled-components";

const Body = styled.div`
  overflow-y: auto;
  height: 100vh;
  position: relative;
  width: 100%;
`;

function App() {
  const [openCart, setOpenCart] = useState(false);
  const [logindisplay, setLogindisplay] = useState(false);

  const toggleCartState = () => setOpenCart(!openCart);
  const toggleLoginDisplay = () => setLogindisplay(!logindisplay);
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
  function handleAccountNavigation(e) {
    // check if authenticated
    toggleLoginDisplay();
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
        <Modal isOpen={logindisplay} close={toggleLoginDisplay}>
          <Login closeAuth={toggleLoginDisplay} />
        </Modal>

        <Body onScroll={updateNavBar}>
          <Header
            openCart={toggleCartState}
            goToAccount={handleAccountNavigation}
          />
          {routes.map(({ path, component, exact }) => (
            <Route
              path={path}
              exact={exact}
              component={component}
              key={path.replace("/", "")}
            />
          ))}
        </Body>
      </ThemeProvider>
    </Router>
  );
}

export default App;
