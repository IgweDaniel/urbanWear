import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { TimelineLite } from "gsap";
const Modal = styled.div`
  position: fixed;
  top: 0;
  z-index: 1000;
  height: 100%;
  width: 100%;
  display: none;
  align-items: center;
  justify-content: ${({ position }) => {
    switch (position) {
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      default:
        return "center";
    }
  }};
  .modal__content {
    background: #fff;
    z-index: 10001;
    position: relative;
    box-shadow: 10px 3px 16px -6px rgba(0, 0, 0, 0.28);
  }
`;
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  background: #000;
  height: 100%;
  width: 100%;

  opacity: 0;
`;

export default ({ isOpen, close, position = "center", children }) => {
  const backdrop = useRef(null);
  const tl = useRef(new TimelineLite());
  const modal = useRef(null);
  const content = useRef(null);

  let settings = { to: { y: 0 }, from: { y: 100 } };

  if (position === "left") {
    settings.from = { x: -200 };
    settings.to = { x: 0 };
  } else if (position === "right") {
    settings.from = { x: 200 };
    settings.to = { x: 0 };
  }

  useEffect(() => {
    if (isOpen === true) {
      tl.current
        .to(modal.current, { display: "flex", duration: 0 })
        .to(backdrop.current, {
          opacity: 0.5,
          duration: 0.1,
        })
        .fromTo(
          content.current,
          {
            ...settings.from,
            opacity: 0,
          },
          { opacity: 1, ...settings.to, duration: 0.2 }
        );
    } else {
      tl.current.reverse().then(() => {
        tl.current = new TimelineLite();
      });
    }
  }, [isOpen]);

  return (
    <Modal ref={modal} position={position}>
      <Backdrop ref={backdrop} onClick={close} />
      <div className="modal__content" ref={content}>
        {children}
      </div>
    </Modal>
  );
};
