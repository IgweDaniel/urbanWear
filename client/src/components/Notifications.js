import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { cleanNotification, deleteNotification } from "../ducks/global";

const Notifications = styled.div`
  max-height: var(--vh);
  overflow-y: auto;
  position: fixed;
  top: 0;
  z-index: 6000;
  /* left: 50%;
  transform: translateX(-50%); */

  right: 15px;

  .notification {
    min-height: 40px;
    text-align: center;
    padding: 20px;
    margin: 10px 0;
    margin-left: auto;
    position: relative;
    font-weight: 600;
    text-transform: uppercase;
    font-variant: small-caps;
    font-size: 0.9rem;
    color: #fff;

    /* width: calc(var(--vw) * 0.9);
    max-width: 500px; */
    width: fit-content;
    max-width: 300px;
  }
  .notification.error {
    background: red;
  }
  .notification.success {
    background: ${({ theme }) => theme.colors.primary};
  }
  /* @media (min-width: 768px) {
    right: 10px;
    transform: none;

    .notification {
      width: fit-content;
      max-width: 300px;
    }
  } */
`;

export default () => {
  const notifications = useSelector((state) => state.global.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(cleanNotification());
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  return (
    <Notifications>
      {notifications.map(({ message, id, type = "success" }) => (
        <div
          key={id}
          className={`notification ${type}`}
          onClick={() => dispatch(deleteNotification({ id }))}
        >
          <p>{message}</p>
        </div>
      ))}
    </Notifications>
  );
};
