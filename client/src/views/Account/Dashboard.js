import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout } from "../../ducks/auth";

const Dashboard = styled.div`
  .name {
    font-weight: bold;
    /* margin: 0 5px 0 0; */
  }
  .logout {
    color: red;
    font-weight: bold;
  }
`;

export default () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  function handleLogoutRequest() {
    dispatch(logout());
  }
  return (
    <Dashboard>
      <p className="subText">
        Hello
        <span className="name"> {user.name} </span>
        (not <span className="name">{user.name}</span>?{" "}
        <button onClick={handleLogoutRequest} className="logout">
          Log out
        </button>
        )
      </p>
      <p>
        From your account dashboard you can view your recent orders, manage your
        shipping and billing addresses and edit your password and account
        details
      </p>
    </Dashboard>
  );
};
