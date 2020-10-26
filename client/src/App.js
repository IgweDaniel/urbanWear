import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyle from "./global-styles";
import theme from "./theme";

import routes from "./views";

import { Header, Modal, QuickCart } from "./components";
import styled from "styled-components";

const Body = styled.div`
  overflow-y: auto;
  height: 100vh;
  position: relative;
  width: 100%;
`;

const Page = styled.div`
  margin-top: 60px;
  @media (min-width: 969px) {
    margin-top: 70px;
  }
`;
function App() {
  const [openCart, setOpenCart] = useState(false);

  const toggleCartState = () => setOpenCart(!openCart);
  function updateBrowserHeight() {
    let vh = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  function updateNavBar(e) {
    const page = e.currentTarget;
    if (page.scrollTop > 23) page.classList.add("hasScrolled");
    else page.classList.remove("hasScrolled");
  }
  useEffect(() => {
    updateBrowserHeight();
    window.addEventListener("resize", updateBrowserHeight);
    return () => {
      window.removeEventListener("resize", updateBrowserHeight);
    };
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Modal isOpen={openCart} position="right" close={toggleCartState}>
          <QuickCart closeQuickCart={toggleCartState} />
        </Modal>

        <Body onScroll={updateNavBar}>
          <Header openCart={toggleCartState} />
          {routes.map(({ path, component }) => (
            <Route
              path={path}
              exact
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
