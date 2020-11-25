import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { CURRENCY } from "../constants";
import { ReactComponent as BagAlt } from "../assets/svg/bag-alt.svg";
import CartItem from "./CartItem";
import { TiTimes } from "react-icons/ti";

const FullCart = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 10px;
  overflow-y: auto;
  position: relative;

  button.close {
    position: absolute;
    top: 20px;
    right: 10px;
  }
  .meta {
    padding: 15px 0;
    text-transform: capitalize;
    font-weight: bold;
  }

  .items {
    width: 100%;
  }
  .actions {
    padding: 0px 0 20px;
  }
  .actions .button.checkout {
    width: 100%;
    background: ${({ theme }) => theme.colors.success};
  }
  .summary {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    text-transform: capitalize;
  }
`;

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
  }
`;

const QuickCart = styled.div`
  height: var(--vh);
  width: calc(var(--vw) * 0.9);
  max-width: 400px;
`;

export default ({ closeQuickCart }) => {
  const history = useHistory();
  const items = useSelector((state) => state.cart.items);
  const qty = useSelector((state) => state.cart.qty);
  const total = useSelector((state) => state.cart.total);

  return (
    <QuickCart height={window.innerHeight}>
      {items && items.length <= 0 ? (
        <EmptyCart>
          <div className="content">
            <BagAlt height={40} width={40} />
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
          <button className="close" onClick={closeQuickCart}>
            <TiTimes size={20} />
          </button>
          <div className="meta">my Bag({qty})</div>
          <div className="items">
            {items && items.map((item) => <CartItem {...item} key={item.id} />)}
          </div>
          <div className="actions">
            <div className="summary">
              <span className="total">total to pay:</span>
              <span className="total-value">
                {CURRENCY}
                {total}
              </span>
            </div>

            <button
              className="button checkout"
              onClick={() => {
                closeQuickCart();
                history.push("/checkout");
              }}
            >
              checkout
            </button>
          </div>
        </FullCart>
      )}
    </QuickCart>
  );
};
