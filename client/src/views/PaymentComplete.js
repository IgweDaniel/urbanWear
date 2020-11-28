import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchUserCart } from "../ducks/cart";
import Page from "./Page";
import { ReactComponent as LikeIcon } from "../assets/svg/like.svg";
import { setUserData } from "../ducks/auth";
const PaymentComplete = styled.div`
  text-align: center;
  .content {
    margin-top: 40px;
  }
  .sub-text {
    font-size: 1.1rem;
  }
`;

export default () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchUserCart());
    if (user) {
      dispatch(setUserData());
    }
    console.log(location.state);
    // eslint-disable-next-line
  }, []);
  return (
    <Page>
      {!location.state && <Redirect to="/" />}
      <PaymentComplete>
        <div className="content">
          <LikeIcon width={40} height={40} fill="#b39964" />
          {/* <LikeIcon width={40} height={40} fill="#5B8C5A" /> */}
          <h1>Thank You! Payment Acknowledged</h1>
          <p className="sub-text">Your package is on its way</p>
        </div>
      </PaymentComplete>
    </Page>
  );
};
