import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { cart } from "../data";
import CartItem from "./CartItem";

const FullCart = styled.div`
  width: 100%;
  height: 100%;
  /* background: red; */
  margin: 0 auto;
  padding: 10px;
  overflow-y: auto;
`;

let items = cart;
// items = [];

const EmptyCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  .content {
    width: 80%;
    margin: 0 auto;
  }
  .button {
    margin: 20px auto;
    width: 80%;
  }
`;

const QuickCart = styled.div`
  height: var(--vh);
  width: calc(var(--vw) * 0.8);
  max-width: 400px;
`;

export default ({ closeQuickCart }) => {
  const history = useHistory();
  return (
    <QuickCart height={window.innerHeight}>
      {items.length <= 0 ? (
        <EmptyCart>
          <div className="content">
            <h4>CART IS EMPTY</h4>
            <p>Check out all the available products and buy some in the shop</p>
            <Link to="/shop">
              <button
                className="button"
                onClick={() => {
                  closeQuickCart();
                  history.push("/shop");
                }}
              >
                Go shopping
              </button>
            </Link>
          </div>
        </EmptyCart>
      ) : (
        <FullCart>
          {items.map((item, i) => (
            <CartItem {...item} key={i} />
          ))}
        </FullCart>
      )}
    </QuickCart>
  );
};
