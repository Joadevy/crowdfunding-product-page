import * as React from "react";
import { createPortal } from "react-dom";

type props = {
  children: React.ReactNode;
};

const Modal: React.FC<props> = ({ children }) => {
  return createPortal(<div>{children}</div>, document.body);
};

export default Modal;
