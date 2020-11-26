import React, { useReducer } from "react";

import Modal from "./Modal";
import QuickCart from "./QuickCart";
import Login from "./Login";
import SideBar from "./SideBar";

const init = {
  component: null,
  isOpen: false,
  position: "center",
};

export const ModalContext = React.createContext(init);

function reducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        component: action.component,
        isOpen: true,
        position: action.position,
      };
    case "CART":
      return {
        ...state,
        component: <QuickCart />,
        isOpen: true,
        position: "right",
      };
    case "LOGIN":
      return {
        ...state,
        component: <Login />,
        isOpen: true,
      };
    case "SIDEBAR":
      return {
        ...state,
        component: <SideBar />,
        isOpen: true,
        position: "left",
      };
    case "CLOSE":
      return init;
    default:
      return init;
  }
}

export default ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);

  return (
    <ModalContext.Provider value={{ dispatch }}>
      {state.isOpen && (
        <Modal
          position={state.position}
          isOpen={state.isOpen}
          close={() => {
            dispatch({
              type: "CLOSE",
            });
          }}
        >
          {state.component}
        </Modal>
      )}

      {children}
    </ModalContext.Provider>
  );
};
