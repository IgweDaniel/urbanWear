import React from "react";
import { ModalContext } from "../components/ModalProvider";
const useModal = () => {
  const { dispatch } = React.useContext(ModalContext);
  return dispatch;
};

export default useModal;
