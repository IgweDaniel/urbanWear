import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { TimelineLite } from "gsap";
const Modal = styled.div`
  position: fixed;
  top: 0;
  z-index: 10000;
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
  const tl = useRef(new TimelineLite({ paused: true }));
  const modal = useRef(null);
  const content = useRef(null);
  const coords = useRef([{ y: 100 }, { y: 0 }]);

  if (position === "left") {
    coords.current = [{ x: -200 }, { x: 0 }];
  } else if (position === "right") {
    coords.current = [{ x: 200 }, { x: 0 }];
  }

  useEffect(() => {
    tl.current
      .to(modal.current, { display: "flex", duration: 0 })
      .to(backdrop.current, { opacity: 0.5, duration: 0.1 })
      .fromTo(
        content.current,
        { ...coords.current[0], opacity: 0 },
        { opacity: 1, ...coords.current[1], duration: 0.2 }
      )
      .reverse();
  }, []);

  useEffect(() => {
    tl.current.reversed(!isOpen);
  }, [isOpen]);

  return (
    <Modal ref={modal} position={position}>
      <Backdrop ref={backdrop} onClick={close} />
      <div className="modal__content" ref={content}>
        {isOpen && children}
      </div>
    </Modal>
  );
};
