import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyle from "./global-styles";
import theme from "./theme";

import routes from "./views";

import { Header } from "./components";
import styled from "styled-components";

const Page = styled.div`
  margin-top: 60px;
  @media (min-width: 969px) {
    margin-top: 70px;
  }
`;

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header openCart={toggleCartState} />
        <Modal isOpen={openCart} position="right" close={toggleCartState}>
          <QuickCart closeQuickCart={toggleCartState} />
        </Modal>

        {routes.map(({ path, component }) => (
          <Route
            path={path}
            exact
            component={component}
            key={path.replace("/", "")}
          />
        ))}
      </ThemeProvider>
    </Router>
  );
}

export default App;
